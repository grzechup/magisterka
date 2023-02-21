pragma solidity ^0.8.9;

contract CryptoBlog {

  uint256 public articlesCount = 0;
  uint256 public idSequence = 0;

  struct Article {
    uint256 articleId;
    string title;
    string teaser;
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


  function createNewArticle(string memory articleIpfsHash, uint256 price, string memory title, string memory teaser) public {
    require(bytes(articleIpfsHash).length > 0);
    require(price > 0);
    require(msg.sender != address(0));

    Article memory article = Article(idSequence, title, teaser, price, block.timestamp, msg.sender);
    ArticleWithIpfsHash memory articleWithIpfsHash = ArticleWithIpfsHash(articleIpfsHash, article);
    articlesMap[articlesCount] = articleWithIpfsHash;

    articles.push(article);

    articleOwners[msg.sender].push(article);

    articlesCount++;
    idSequence++;
  }

  function getOwnedArticles() public view returns (Article[] memory){
    Article[] memory ret;
    for (uint i = 0; i < articleOwners[msg.sender].length; i++) {
      ret[i] = articleOwners[msg.sender][i];
    }
    return ret;
  }

  function getArticleTeasers() public view returns (Article[] memory) {
    return articles;
  }

  function buyArticle(uint256 articleId) public payable {
    if (articleBuyers[articleId][msg.sender]) {
      revert("Article is already bought by this customer.");
    }

    require(articlesMap[articleId].article.price > msg.value, 'Less sufficient amount.');
    require(articlesMap[articleId].article.price < msg.value, 'More sufficient amount.');

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




  /*  function storeFile(string memory fileContent) public {
      bytes32 hash = ipfs.store(bytes(fileContent));
      //Można zapisać hash na blockchainie, aby łatwiej było odnaleźć plik
    }

    function getFile(bytes32 hash) public view returns (string memory) {
      return string(ipfs.retrieve(hash));
    }*/
}
