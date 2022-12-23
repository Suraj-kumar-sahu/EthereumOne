import React from 'react'
import { ethers } from 'ethers';
import logo from '../assets/logo.svg';
import "./Navbar.css"

export default function Navbar({ account, setAccount }) {
  const connectHandler = async() =>{
    const accounts = await window.ethereum.request({"method" :"eth_requestAccounts"});
    const account = await ethers.utils.getAddress(accounts[0]) ;

    setAccount(account) ;
  }

  return (
        <nav className="navbar">
          <div className='left'>
            <img src={logo} alt="Logo" id="img"/>
            <h1 id="heading">EthereumOne</h1>
            <ul className='list'>
              <li><a href="/Domain">Domain Names</a></li>
              <li><a href="/">Learn</a></li>
              <li><a href="/">Market</a></li>
              <li><a href="https://surajkumarsahu.netlify.app/" style={{color:"white"}}>Maker</a></li>
            </ul>
          </div>

          <div className="right">
            { account ?
              (<button
              type=''
              className=''
            >
              {account.slice(0,6)+"..."+ account.slice(38,42)}
            </button>
            ) : (
              <button
              type='button'
              className=''
              onClick={connectHandler}
              >
                Connect
              </button>
            )}
          </div>
        </nav>
  )
}
