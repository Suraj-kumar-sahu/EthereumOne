import "./Search.css" ;

const Search = () => {
  return (
    <header className="container">

      <div className="left1">
        <div className="subtitle">
            <p >Seek and buy available domain names</p>
        </div>

        <div className="title">
            <h2 >Decentralised naming for wallets, websites, & more.</h2>
        </div>
        <div className="input">
          <input
            type="text"
            className="input"
            placeholder="Find your domain"
          />
          <button
            type="button"
            id='button'
          >
            Buy It
          </button>
        </div>
      </div>

      <div className="right1">
        <img src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" alt="img" id="header-img"/>
      </div>


    </header>
  );
}

export default Search;