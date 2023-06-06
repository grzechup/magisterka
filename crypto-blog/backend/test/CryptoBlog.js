const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");

describe("CryptoBlog", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners();

    const CryptoBlog = await ethers.getContractFactory("CryptoBlog");
    const cryptoBlogDeploy = await CryptoBlog.deploy();
    await cryptoBlogDeploy.deployed();

    console.log('deployed contract');
    console.log('owner', owner.address);
    console.log('otherAccount', otherAccount.address);
    console.log('otherAccount2', otherAccount2.address);

    return {cryptoBlogDeploy, owner, otherAccount, otherAccount2};
  }

  describe("Deployment", function () {
    it("Create new articles and check ownership", async function () {
      const {cryptoBlogDeploy, owner, otherAccount, otherAccount2} = await loadFixture(deployContract);
      let price = ethers.utils.parseUnits("0.01", "ether");

      await cryptoBlogDeploy.connect(otherAccount).createNewArticle("hash123", price, "title123");
      await cryptoBlogDeploy.connect(otherAccount).createNewArticle("hash1234", price, "title1234");

      const ownedArticles = await cryptoBlogDeploy.connect(otherAccount).getOwnedArticles();
      const articles = await cryptoBlogDeploy.getArticles();

      console.log('ownedArticles', ownedArticles);
      console.log('articles', articles);
      console.log('articles.length', articles.length);

      expect(ownedArticles.length).to.equal(2)
      expect(ownedArticles[0].title).to.equal("title123")
      expect(ownedArticles[1].title).to.equal("title1234")
      expect(articles.length).to.equal(2)
      expect(articles[0].title).to.equal("title123")
      expect(articles[1].title).to.equal("title1234")
    });

    it("Buy articles", async function () {
      const {cryptoBlogDeploy, owner, otherAccount, otherAccount2} = await loadFixture(deployContract);
      let price = ethers.utils.parseUnits("0.01", "ether");

      await cryptoBlogDeploy.connect(otherAccount).createNewArticle("hash123", price, "title123");
      await cryptoBlogDeploy.connect(otherAccount).createNewArticle("hash1234", price, "title1234");
      await cryptoBlogDeploy.connect(otherAccount).createNewArticle("hash1235", price, "title1235");

      await cryptoBlogDeploy.connect(otherAccount2).buyArticle(1, {value: price});
      await cryptoBlogDeploy.connect(otherAccount2).buyArticle(2, {value: price});

      const boughtArticles = await cryptoBlogDeploy.connect(otherAccount2).getBoughtArticles();
      console.log("bought articles", boughtArticles);

      expect(boughtArticles.length).to.equal(2)
      expect(boughtArticles[0].articleId).to.equal(1)

    });


  });
});
