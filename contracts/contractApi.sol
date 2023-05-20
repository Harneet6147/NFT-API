// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract contractApi {
    struct Nft {
        uint256 id;
        string name;
        uint256 price;
    }

    address owner;
    Nft public removeNft;

    mapping(uint256 => Nft) public nfts;
    Nft[] public nftArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Create NFT
    function createNft(
        uint256 _id,
        string memory _name,
        uint256 _price
    ) public onlyOwner {
        Nft memory nft = Nft(_id, _name, _price);
        nfts[_id] = nft;
        nftArray.push(Nft(_id, _name, _price));
    }

    // Get a NFT
    function getNft(
        uint256 _id
    ) public view returns (string memory, uint256) {
        require(nfts[_id].id != 0, "Nft not found");
        Nft memory nft = nfts[_id];
        return (nft.name, nft.price);
    }

    // Get all NFT's
    function getAllNFTs() public view returns (Nft[] memory) {
        return nftArray;
    }

    //Update Nft
    function updateNft(
        uint256 _id,
        string memory _name,
        uint256 _price
    ) public onlyOwner {
        require(nfts[_id].id != 0, "Nft not found");
        deleteNft(_id);
        nfts[_id] = Nft(_id, _name, _price);
        nftArray.push(Nft(_id, _name, _price));
    }

    //Delete NFT
    function deleteNft(uint256 _id) public onlyOwner {
        require(nfts[_id].id != 0, "NFT not found");
        delete nfts[_id];
        for (uint i = 0; i < nftArray.length; i++) {
            if (nftArray[i].id == _id) {
                removeNft = nftArray[i];
                nftArray[i] = nftArray[nftArray.length - 1];
                nftArray[nftArray.length - 1] = removeNft;
            }
        }
        nftArray.pop();
    }
}
