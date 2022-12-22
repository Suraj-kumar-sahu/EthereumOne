// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol" ;

contract EthereumOne is ERC721{
    address public owner ;
    uint public maxSupply ;
    uint public totalSupply ;

    struct Domain{
        string name ;
        uint cost ;
        bool isOwned ;
    }

    mapping(uint => Domain) domains ;

    modifier onlyOwner(){
        require(msg.sender == owner,"only owner can call this function");
        _;
    }

    constructor(string memory _name , string memory _symbol) ERC721(_name , _symbol){
        owner = msg.sender ;
    }

    function list_domains(string memory _name , uint _cost) public onlyOwner {
        maxSupply++ ;
        domains[maxSupply] = Domain(_name , _cost , false) ;
    }

    function mint(uint _id)public payable {
        require(_id !=0);
        require(_id <= maxSupply);
        require(domains[_id].isOwned == false);
        require(msg.value >= domains[_id].cost) ;

        domains[_id].isOwned = true ;
        _safeMint(msg.sender,_id) ; // _safeMint is provided by openzeppelin
        totalSupply++ ;
    }

    function getDomain(uint _id) public view returns(Domain memory){
        return domains[_id] ;
    }

    function getBalance() public view returns(uint){
        return address(this).balance ;
    }

    function withdraw() public onlyOwner{
        payable(owner).transfer(address(this).balance) ;
    }
}
