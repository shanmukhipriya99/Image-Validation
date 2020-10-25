const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'test boost nuclear avoid episode inject gaze joke infant poet raven inspire',
    'https://rinkeby.infura.io/v3/13932dea88aa42069f4a1650b1afd8f0'
); 
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from: ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
    console.log(interface);
    console.log('Contract deployed to: ', result.options.address);
};
deploy();