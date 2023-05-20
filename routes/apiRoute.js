const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const port = process.env.PORT;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("../artifacts/contracts/contractApi.sol/contractApi.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require("express");
const router = express.Router();



// Get Single NFT
router.route("/:id")
    .get(async (req, res) => {
        try {
            const id = req.params.id;
            const nft = await contractInstance.getNft(id);

            res.status(200).json({
                "Name": nft[0],
                "Price in INR": parseInt(nft[1])
            });
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    })

// Get All NFT
router.route("/")
    .get(async (req, res) => {
        try {
            const allNfts = await contractInstance.getAllNFTs();
            const nfts = allNfts.map(nft => ({
                id: parseInt(nft.id),
                name: nft.name,
                price: parseInt(nft.price),
            }))
            console.log(nfts)
            res.status(200).json(nfts);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    })

// Create NFT
router.route("/")
    .post(async (req, res) => {

        try {
            const { id, name, price } = req.body;
            const tx = await contractInstance.createNft(id, name, price);
            await tx.wait();
            res.json({ success: true })
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    })

// Update a NFT
router.route("/:id")
    .put(async (req, res) => {

        try {
            const id = req.params.id;
            const { name, price } = req.body;
            const tx = await contractInstance.updateNft(id, name, price);
            await tx.wait();
            res.json({ success: true })
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    })

// Delete a NFT
router.route("/:id")
    .delete(async (req, res) => {

        try {
            const id = req.params.id;
            const tx = await contractInstance.deleteNft(id);
            await tx.wait();
            res.json({ success: true })
        }
        catch (error) {
            res.status(500).send(error.message);
        }

    })



module.exports = router;