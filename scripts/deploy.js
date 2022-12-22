// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
    //setup accounts & variables
    const[deployer] = await ethers.getSigners() ;
    const Name = "EthereumOne" ;
    const Symbol = "ETHON" ;

    // deploy contract
    const EthereumOne = await ethers.getContractFactory("EthereumOne") ;
    const eth_on = await EthereumOne.deploy(Name,Symbol) ;
    await eth_on.deployed() ;

    console.log(`deployed domain contract at: ${eth_on.address}\n`);

    // list 6 domains
    const names = ["suraj.eth","deepak.eth","radha.eth","bikash.eth","ganesh.eth","chintu.eth"] ;
    const costs = [tokens(30),tokens(10),tokens(15),tokens(5),tokens(7.5),tokens(20)] ;

    for(var i=0 ; i<6 ; i++){
      const transaction = await eth_on.connect(deployer).list_domains(names[i],costs[i]) ;
      await transaction.wait() ;

      console.log(`listed Domain ${i+1}: ${names[i]}`);
    }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
