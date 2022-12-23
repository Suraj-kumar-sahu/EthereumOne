import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import "./Domain.css"

const Domain = ({ domain, contract, provider, id }) => {
  const[owner,setOwner] = useState(null) ;
  const[hasSold,setHasSold] = useState(false) ;

  const getOwner = async() =>{
    if(domain.isOwned || hasSold){
      const owner = await contract.ownerOf(id) ;
      setOwner(owner) ;
    }
  }

  const buyHandler = async() =>{
    const signer = provider.getSigner() ;
    const transaction = await contract.connect(signer).mint(id,{value: domain.cost}) ;
    await transaction.wait() ;

    setHasSold(true) ;
  }

  useEffect(()=>{
    getOwner()
  },[hasSold])

  return (
    <div className='domain'>
      <div className="domain-name">
        <h3>
          { domain.isOwned || owner ? (
            <del>{domain.name}</del>
          ): (
            <>{domain.name}</>
          )}
        </h3>

        <>
          <p>
            {domain.isOwned || hasSold ? (
              <>
                <small>
                  Owned by:<br/>
                  <span>
                    {owner && owner.slice(0,6)+"..."+owner.slice(38,42)} ;
                  </span>
                </small>
              </>
            ) : (
              <h4>{ethers.utils.formatEther(domain.cost)} ETH</h4>
            )}


          </p>
        </>
      </div>

      { !domain.isOwned && !owner &&
        (<button type='button' className='buy-button' onClick={buyHandler}>
          Buy it
      </button>)
      }

      
    </div>
  );
}

export default Domain;
