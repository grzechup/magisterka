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
    address payable owner;
    string previewContentIpfsHash;
  }

  struct ArticleWithIpfsHash {
    string ipfsHash;
    Article article;
  }

  Article[] articles;

  //articleId -> Article
  mapping(uint256 => ArticleWithIpfsHash) private articlesMap;
  mapping(address => Article[]) public articleOwners;
  mapping(address => Article[]) public buyers;

  constructor() {}

  function createNewArticle(string memory articleIpfsHash, string memory previewArticleIpfsHash, uint256 price, string memory title) public {
    console.log("[Contract] Create new article with title", title, "from address", msg.sender);
    console.log("[Contract] price", price, "hash", articleIpfsHash);

    require(bytes(articleIpfsHash).length > 0);
    require(bytes(previewArticleIpfsHash).length > 0);
    require(price > 0);
    require(msg.sender != address(0));

    Article memory article = Article(idSequence, title, price, block.timestamp, payable(msg.sender), previewArticleIpfsHash);
    ArticleWithIpfsHash memory articleWithIpfsHash = ArticleWithIpfsHash(articleIpfsHash, article);
    articlesMap[idSequence] = articleWithIpfsHash;
    articles.push(article);
    articleOwners[msg.sender].push(article);

    console.log("[Contract] article Owners", articleOwners[msg.sender].length);

    articlesCount++;
    idSequence++;
    console.log("[Contract] Created new article with id = ", idSequence);
  }

  function getOwnedArticles() public view returns (Article[] memory){
    return articleOwners[msg.sender];
  }

  function getBoughtArticles() public view returns (Article[] memory){
    return buyers[msg.sender];
  }

  function getArticles() public view returns (Article[] memory) {
    return articles;
  }

  function buyArticle(uint256 articleId) public payable {
    uint256 articlePrice = articlesMap[articleId].article.price;

    console.log("[Contract] Buy article id", articleId, " from = ", msg.sender);
    console.log("[Contract] msg.value = ", msg.value, "article price = ", articlePrice);

    require(articlePrice <= msg.value, 'Insufficient funds sent.');

    buyers[msg.sender].push(articlesMap[articleId].article);

    articlesMap[articleId].article.owner.transfer(msg.value);
  }

  function getArticle(uint256 articleId) public view returns (ArticleWithIpfsHash memory) {
    ArticleWithIpfsHash memory toReturn  = articlesMap[articleId];
    for(uint i=0; i<buyers[msg.sender].length; i++){
      if(buyers[msg.sender][i].articleId == articleId){
        return toReturn;
      }
    }
    toReturn.ipfsHash = "";
    return toReturn;
  }
}
