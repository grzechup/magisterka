pragma solidity ^0.8.9;

import "hardhat/console.sol";


contract CryptoBlog {

  uint256 public articlesCount = 0;
  uint256 public idSequence = 0;

  struct Article {
    uint256 articleId;
    string title;
    uint256 price;
    uint publishTime;
    address owner;
  }

  struct ArticleWithIpfsHash {
    string ipfsHash;
    Article article;
  }

  Article[] articles;

  //articleId -> Article
  mapping(uint256 => ArticleWithIpfsHash) private articlesMap;

  mapping(address => Article[]) public articleOwners;

  //articleId -> (address -> hasBought)
  mapping(uint256 => mapping(address => bool)) public articleBuyers;

  constructor() public {
  }


  function createNewArticle(string memory articleIpfsHash, uint256 price, string memory title) public {
    console.log("Create new article with title", title, "from address", msg.sender);
    console.log("price", price, "hash", articleIpfsHash);

    require(bytes(articleIpfsHash).length > 0);
    require(price > 0);
    require(msg.sender != address(0));

    Article memory article = Article(idSequence, title, price, block.timestamp, msg.sender);
    ArticleWithIpfsHash memory articleWithIpfsHash = ArticleWithIpfsHash(articleIpfsHash, article);
    articlesMap[articlesCount] = articleWithIpfsHash;

    articles.push(article);

    articleOwners[msg.sender].push(article);
    console.log("article Owners", articleOwners[msg.sender].length);

    articlesCount++;
    idSequence++;
    console.log("Created new article with id = ", idSequence);
  }

  function getOwnedArticles() public view returns (Article[] memory){
    uint256 ownedArticlesLength = articleOwners[msg.sender].length;
    console.log("Get owned articles for = ", msg.sender, "length", ownedArticlesLength);
    Article[] memory ret = new Article[](ownedArticlesLength);
    for (uint i = 0; i < ownedArticlesLength; i++) {
      ret[i] = articleOwners[msg.sender][i];
    }
    return ret;
  }

  function getBoughtArticles() public view returns (Article[] memory){
    uint256 ownedArticlesLength = articleOwners[msg.sender].length;
    console.log("Get owned articles for = ", msg.sender, "length", ownedArticlesLength);
    Article[] memory ret = new Article[](ownedArticlesLength);
    for (uint i = 0; i < ownedArticlesLength; i++) {
      ret[i] = articleOwners[msg.sender][i];
    }
    return ret;
  }

  function getArticles() public view returns (Article[] memory) {
    return articles;
  }

  function buyArticle(uint256 articleId) public payable {
    uint256 articlePrice = articlesMap[articleId].article.price;

    console.log("Buy article id", articleId, " from = ", msg.sender);
    console.log("msg.value = ", msg.value, "article price = ", articlePrice);

    if (articleBuyers[articleId][msg.sender]) {
      revert("Article is already bought by this customer.");
    }

    require(articlePrice <= msg.value, 'Insufficient funds sent.');

    //address payable ownerAddress = articlesMap[articleId].article.owner;
    //ownerAddress.send(msg.value);
    //pay the owner, might change it later to accountBalance and withdraw system
    articleBuyers[articleId][msg.sender] = true;

  }

  function getArticle(uint256 articleId) public view returns (ArticleWithIpfsHash memory) {
    ArticleWithIpfsHash memory toReturn  = articlesMap[articleId];
    if (articleBuyers[articleId][msg.sender]) {
      return toReturn;
    } else {
      toReturn.ipfsHash = "";
      return toReturn;
    }
  }
}
