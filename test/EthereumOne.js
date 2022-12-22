// NOTE:- mocha is a testing framework and chai is a assertion library

const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("EthereumOne", () => {
  let eth_one ;
  let deployer,owner1 ;

  const NAME = "EthereumOne";
  const SYMBOL = "ETHON";

  beforeEach(async()=>{
    //set accounts
    [deployer,owner1] = await ethers.getSigners() ;

    // deploy of contracts
    const EthereumOne = await ethers.getContractFactory("EthereumOne") ;
    eth_one = await EthereumOne.deploy("EthereumOne","ETHON") ;

    // list a domain
    const transaction = await eth_one.connect(deployer).list_domains("surajkumar.eth",tokens(30)) ;
    await transaction.wait() ;
  })

  describe("Deployment",()=>{
    it("has a name", async()=>{
      const result =await eth_one.name() ;
      await expect(result).to.equal(NAME) ;
    });

    it("has a symbol", async()=>{
      const result =await eth_one.symbol() ;
      await expect(result).to.equal(SYMBOL) ;
    });

    it("sets accounts", async()=>{
      const result = await eth_one.owner() ;
      await expect(result).to.equal(deployer.address) ;
    }) ;
    
    it("returns max supply",async()=>{
      let result = await eth_one.maxSupply() ;
      await expect(result).to.equal(1) ;
    })
    
    it("returns total supply",async()=>{
      let result = await eth_one.totalSupply() ;
      await expect(result).to.equal(0) ;
    })
  }) ;

  describe("Domain",()=>{
    it("returns domain attribute", async()=>{
      let domain = await eth_one.getDomain(1) ;
      expect(domain.name).to.equal("surajkumar.eth") ;
      expect(domain.cost).to.equal(tokens(30)) ;
      expect(domain.isOwned).to.equal(false) ;
    })
  });

  describe("minting",()=>{
    const Id = 1 ;
    const Amount = ethers.utils.parseUnits("30", 'ether') ;

    beforeEach(async ()=>{
      const transaction = await eth_one.connect(owner1).mint(Id,{value: Amount}) ;
      await transaction.wait() ;
    })

    it("updates the owner", async()=>{
      const owner = await eth_one.ownerOf(Id) ; // ownerOf here comes fro ERC721 library
      await expect(owner).to.be.equal(owner1.address) ;
    })

    it("updates the domain status", async()=>{
      const result = await eth_one.getDomain(Id) ;
      await expect(result.isOwned).to.be.equal(true) ;
    })

    it("updates the contract balance", async()=>{
      const result = await eth_one.getBalance() ;
      await expect(result).to.be.equal(Amount) ;
    })

    it("returns total supply",async()=>{
      let result = await eth_one.totalSupply() ;
      await expect(result).to.equal(1) ;
    })
  })

  describe("withdraw",()=>{
    const Id = 1 ;
    const Amount = ethers.utils.parseUnits("30", 'ether') ;

    beforeEach(async()=>{
      let transaction = await eth_one.connect(owner1).mint(Id,{value: Amount}) ;
      await transaction.wait() ;

      transaction = await eth_one.connect(deployer).withdraw() ;
      await transaction.wait() ;
    })

    it("transfers contract balance to the owner", async()=>{
      const result = await eth_one.getBalance() ;
      await expect(result).to.be.equal(0) ;
    })
  })
  
})

