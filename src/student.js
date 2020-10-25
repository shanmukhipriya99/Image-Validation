import web3 from "./web3";

const address = "0x0661f96E3D1A8b7Ac5729ED5B1e5eE4b91b90010";
const abi = [
  {
    constant: false,
    inputs: [
      { name: "id", type: "uint256" },
      { name: "hash", type: "bytes" },
    ],
    name: "insertdetails",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ name: "id", type: "uint256" }],
    name: "finddetails",
    outputs: [{ name: "", type: "bytes[]" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "pupil",
    outputs: [
      { name: "id", type: "uint256" },
      { name: "hash", type: "bytes" },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// const contract = new web3.eth.Contract(abi, address);
// console.log(contract);

export default new web3.eth.Contract(abi, address);
