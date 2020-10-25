import Web3 from "web3"; //Web3 is a constructor function

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // in the server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/13932dea88aa42069f4a1650b1afd8f0"
  );
  web3 = new Web3(provider);
}

export default web3;
