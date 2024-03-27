// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMint is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("NFTMint", "NFT") Ownable(msg.sender) {}

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 _tokenIds = _tokenIdCounter;

        _safeMint(recipient, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);

        _tokenIdCounter += 1;

        return _tokenIds;
    }
}
