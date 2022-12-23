import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import "./App.css" ;
import Navbar from "./components/Navbar";
import Search from './components/Search';
import Domain from './components/Domain';

// ABIs
import EthereumOne from "./abis/EthereumOne.json" ;

function App() {
  const[account , setAccount] = useState(null) ;
  const[provider, setProvider] = useState(null) ;
  const[contract , setContract] = useState(null) ;
  const[domains ,setDomains] = useState([]) ;

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3" ;

  useEffect(()=>{
    const loadBlockchainData = async() =>{

      const provider = new ethers.providers.Web3Provider(window.ethereum) ;
      setProvider(provider) ;

      const contract = new ethers.Contract(contractAddress,EthereumOne,provider) ;
      setContract(contract) ;

      window.ethereum.on("accountsChanged",async()=>{
        const accounts = await window.ethereum.request({ "method" : "eth_requestAccounts"}) ;
        const account = ethers.utils.getAddress(accounts[0]) ;
        setAccount(account) ;
      })

      const maxSupply = await contract.maxSupply() ;
      console.log(maxSupply.toString());

      const domains = [] ;
      for(var i =1 ;i<= maxSupply ;i++){
        const domain = await contract.getDomain(i) ;
        domains.push(domain) ;
      }
      setDomains(domains) ;

      const totalSupply = await contract.totalSupply() ;
      console.log(totalSupply.toString());
  
    }
    loadBlockchainData() ;
  },[]) 
  return (
    <div className="App">
      <Navbar account={account} setAccount={setAccount}/>
      <Search/>

      <div className='card-container'>
        <h2 className='card-heading'>Why you need a Domain name.</h2>
        <p className='card-desc'>Own your custom username,use it across services and be able to store an avatar and other profile data.</p>


        <div className='domains'>
          {
          domains.map((domain,index) => (
            <Domain domain={domain} id={index + 1} contract={contract} provider={provider} key={index}/>
          ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
