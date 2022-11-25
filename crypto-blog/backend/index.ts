const admin = require("firebase-admin");
const recoverPersonalSignature = require ('@metamask/eth-sig-util');

const serviceAccount = require("./crypto-blog-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const express = require('express')
const app = express()
const port = 3000

app.get('/test', async (request, response) => {
  return response.send('test');
})

app.get('/api/getNonceToSign/:address', async(request, response) => {
    try {
      console.log("body:", request.params.address);
      if (!request.params.address) {
        return response.sendStatus(400);
      }

      console.log('Get the user document for that address', request.params.address);
      const userDoc = await admin
        .firestore()
        .collection('users')
        .doc(request.params.address)
        .get();

      if (userDoc.exists) {
        const existingNonce = userDoc.data()?.nonce;
        console.log('The user document exists already, so just return the nonce', existingNonce);
        return response.status(200).json({nonce: existingNonce});
      } else {
        console.log("The user document does not exist, create it first");
        const generatedNonce = Math.floor(Math.random() * 1000000).toString();

        const createdUser = await admin.auth().createUser({
          uid: request.params.address,
        });

        console.log('Created user: ', createdUser.uid);
        await admin.firestore().collection('users').doc(createdUser.uid).set({
          nonce: generatedNonce,
        });
        console.log('User saved to firebase` ');

        return response.status(200).json({nonce: generatedNonce});
      }
    } catch (err) {
      console.log(err);
      return response.sendStatus(500);
    }
})

app.post('/verifySignedMessage', async(request, response) => {
    try {

      if (!request.params.address || !request.body.signature) {
        return response.sendStatus(400);
      }

      const address = request.params.address;
      const sig = request.body.signature;

      // Get the nonce for this address
      const userDocRef = admin.firestore().collection('users').doc(address);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const existingNonce = userDoc.data()?.nonce;

        // Recover the address of the account used to create the given Ethereum signature.
        const recoveredAddress = recoverPersonalSignature({
          data: `0x${toHex(existingNonce)}`,
          signature: sig,
        });

        // See if that matches the address the user is claiming the signature is from
        if (recoveredAddress === address) {
          // The signature was verified - update the nonce to prevent replay attacks
          // update nonce
          await userDocRef.update({
            nonce: Math.floor(Math.random() * 1000000).toString(),
          });

          // Create a custom token for the specified address
          const firebaseToken = await admin.auth().createCustomToken(address);

          // Return the token
          return response.status(200).json({token: firebaseToken});
        } else {
          // The signature could not be verified
          return response.sendStatus(401);
        }
      } else {
        console.log('user doc does not exist');
        return response.sendStatus(500);
      }
    } catch (err) {
      console.log(err);
      return response.sendStatus(500);
    }
});


const toHex = (stringToConvert) =>
  stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
