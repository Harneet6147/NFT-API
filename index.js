const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const port = process.env.PORT;
const router = require("./routes/apiRoute");

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./artifacts/contracts/contractApi.sol/contractApi.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require('express');
const app = express();
app.use(express.json());

app.use('/nfts', router);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
