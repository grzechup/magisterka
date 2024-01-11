// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAe_JjadvdzlEjIaT5YqZb2-hH8X5J4fvU",
    authDomain: "crypto-blog-ee670.firebaseapp.com",
    projectId: "crypto-blog-ee670",
    storageBucket: "crypto-blog-ee670.appspot.com",
    messagingSenderId: "83677265676",
    appId: "1:83677265676:web:ab52e3a0a7160a03075329",
    measurementId: "G-PMZBSRHS78"

  },

  ipfsConfig: {
    HOST: '127.0.0.1',
    PORT: 5001,
    PROTOCOL: 'http'
  },

  contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  abi:  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "articleOwners",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "articleId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publishTime",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "previewContentIpfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "articlesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "articleId",
          "type": "uint256"
        }
      ],
      "name": "buyArticle",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "buyers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "articleId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publishTime",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "previewContentIpfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "articleIpfsHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "previewArticleIpfsHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        }
      ],
      "name": "createNewArticle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "articleId",
          "type": "uint256"
        }
      ],
      "name": "getArticle",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "ipfsHash",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "articleId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "title",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "publishTime",
                  "type": "uint256"
                },
                {
                  "internalType": "address payable",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "previewContentIpfsHash",
                  "type": "string"
                }
              ],
              "internalType": "struct CryptoBlog.Article",
              "name": "article",
              "type": "tuple"
            }
          ],
          "internalType": "struct CryptoBlog.ArticleWithIpfsHash",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getArticles",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "articleId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "publishTime",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "previewContentIpfsHash",
              "type": "string"
            }
          ],
          "internalType": "struct CryptoBlog.Article[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBoughtArticles",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "articleId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "publishTime",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "previewContentIpfsHash",
              "type": "string"
            }
          ],
          "internalType": "struct CryptoBlog.Article[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getOwnedArticles",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "articleId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "publishTime",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "previewContentIpfsHash",
              "type": "string"
            }
          ],
          "internalType": "struct CryptoBlog.Article[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "idSequence",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
