import Web3 from "web3/dist/web3.min.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { firestoredb } from "../firebase/firebase";
// import createBrowserHistory from "../utils/history";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const RPC_URL =
  "https://polygon-mainnet.g.alchemy.com/v2/VogGgwpNhdrqobnh5kxDBGeRkzCqWqxB";
// const RPC_URL =
//   "https://polygon-mumbai.g.alchemy.com/v2/4PVWbySpmDFT8D4d3T8PcFlCDPRUqehb";
const current_chainId = 80001;
const polygon_chainId = 137;
const web3 = createAlchemyWeb3(RPC_URL);

// const web3 = new Web3(provider);

// const web3 = new Web3(window.ethereum);
// await window.ethereum.enable();
const truckMintABI = require("../abi/truckmint-abi.json");
const truckMintAddress = process.env.REACT_APP_TRUCK_MINT_CONTRACT;
const truckTokenABI = require("../abi/trucktoken-abi.json");
const truckTokenAddress = process.env.REACT_APP_TRUCK_TOKEN;
export const getConnectedAddress = async () => {
  if (window.ethereum) {
    var address_connected = "";

    try {
      await web3.eth.getAccounts().then((res) => {
        address_connected = res[0];
      });

      return address_connected;
    } catch (err) {
      console.log(err);
      return 0;
    }
  } else {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        137: RPC_URL,
      },
      qrcode: false,
    });
    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3 = new Web3(provider);

    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      return address_connected;
      //sign the transaction via Metamask
    } catch (err) {
      console.log(err);
      return 0;
    }
  }
};
// export const getConnectedChainId = async () => {
//   if (window.ethereum) {
//     var chainId_connected = "";

//     try {
//       await web3.eth.getChainId().then((res) => {
//         chainId_connected = res;

//       });
//       return chainId_connected;
//     } catch (err) {
//       console.log(err);
//       return 0;
//     }
//   } else {
//     //  Create WalletConnect Provider
//     const provider = new WalletConnectProvider({
//       rpc: {
//         137: RPC_URL,
//       },
//       qrcode: false,
//     });
//     //  Enable session (triggers QR Code modal)
//     await provider.enable();

//     const web3 = new Web3(provider);

//     var chainId_connected = "";

//     await web3.eth.getChainId().then((res) => {
//       chainId_connected = res;
//     });

//     try {
//       return chainId_connected;
//       //sign the transaction via Metamask
//     } catch (err) {
//       console.log(err);
//       return 0;
//     }
//   }
// };

export const getTotalSupply = async () => {
  try {
    window.truckMintcontract = await new web3.eth.Contract(
      truckMintABI,
      truckMintAddress
    );

    const totalSupply = await window.truckMintcontract.methods
      .totalSupply()
      .call();
    return totalSupply;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export const mintNFT = async (minterEmail) => {
  if (window.ethereum) {
    // var weiValue = web3.utils.toWei("0.01", "ether");
    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckMintcontract = await new web3.eth.Contract(
        truckMintABI,
        truckMintAddress
      );

      //set up your Ethereum transaction

      //sign the transaction via Metamask
      const txHash = await web3.eth.sendTransaction({
        to: truckMintAddress, // Required except during contract publications.
        from: address_connected, // must match user's active address.
        maxPriorityFeePerGas: 40000000000,
        data: window.truckMintcontract.methods.MintNFT().encodeABI(), //make call to buy box
      });
      await addDoc(collection(firestoredb, "TruckMintEmails"), {
        minterEmail: minterEmail,
        mintTime: new Date(),
      })
        .then(async (docRef) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        window.location.reload();
      }, 30000);
    } catch (err) {
      console.log(err);
      if (err.code == 4001) {
        return err;
      }
    }
  } else {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        137: RPC_URL,
      },
      qrcode: false,
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3 = new Web3(provider);
    // var weiValue = web3.utils.toWei("0.01", "ether");
    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckMintcontract = await new web3.eth.Contract(
        truckMintABI,
        truckMintAddress
      );

      //sign the transaction via Metamask
      const txHash = await web3.eth.sendTransaction({
        to: truckMintAddress, // Required except during contract publications.
        from: address_connected, // must match user's active address.
        maxPriorityFeePerGas: 40000000000,
        data: window.truckMintcontract.methods.MintNFT().encodeABI(), //make call to buy box
      });
      await addDoc(collection(firestoredb, "TruckMintEmails"), {
        minterEmail: minterEmail,
        mintTime: new Date(),
      })
        .then(async (docRef) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(() => {
        window.location.reload();
      }, 30000);
    } catch (err) {
      console.log(err);
      if (err.code == 4001) {
        return err;
      }
    }
  }
};
export const checkAssetBalance = async () => {
  if (window.ethereum) {
    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckTokenContract = await new web3.eth.Contract(
        truckTokenABI,
        truckTokenAddress
      );

      const balanceOf = await window.truckTokenContract.methods
        .balanceOf(address_connected)
        .call();
      console.log(balanceOf);

      return balanceOf;
    } catch (err) {
      console.log(err);
      return 0;
    }
  } else {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        137: RPC_URL,
      },
      qrcode: false,
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3 = new Web3(provider);

    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckTokenContract = await new web3.eth.Contract(
        truckTokenABI,
        truckTokenAddress
      );

      const balanceOf = await window.truckTokenContract.methods
        .balanceOf(address_connected)
        .call();
      console.log(balanceOf);

      return balanceOf;

      //sign the transaction via Metamask
    } catch (err) {
      console.log(err);
      return 0;
    }
  }
};
export const checkAllowance = async () => {
  if (window.ethereum) {
    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckTokenContract = await new web3.eth.Contract(
        truckTokenABI,
        truckTokenAddress
      );
      window.truckMintcontract = await new web3.eth.Contract(
        truckMintABI,
        truckMintAddress
      );

      const totalAllowance = await window.truckTokenContract.methods
        .allowance(address_connected, truckMintAddress)
        .call();

      return totalAllowance;
    } catch (err) {
      console.log(err);
      return 0;
    }
  } else {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        137: RPC_URL,
      },
      qrcode: false,
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3 = new Web3(provider);

    var address_connected = "";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckTokenContract = await new web3.eth.Contract(
        truckTokenABI,
        truckTokenAddress
      );

      const totalAllowance = await window.truckTokenContract.methods
        .allowance(address_connected, truckMintAddress)
        .call();

      return totalAllowance;

      //sign the transaction via Metamask
    } catch (err) {
      console.log(err);
      return 0;
    }
  }
};
export const approveMinter = async () => {
  if (window.ethereum) {
    var address_connected = "";

    // var weiValue = web3.utils.toWei("0.34", "ether");
    var valueWETH = "340000000000000000";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckTokenContract = await new web3.eth.Contract(
        truckTokenABI,
        truckTokenAddress
      );

      const txHash = await web3.eth.sendTransaction({
        to: truckTokenAddress, // Required except during contract publications.
        from: address_connected, // must match user's active address.
        maxPriorityFeePerGas: 40000000000,
        data: window.truckTokenContract.methods
          .approve(truckMintAddress, valueWETH)
          .encodeABI(), //make call to buy box
      });

      return txHash;
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        137: RPC_URL,
      },
      qrcode: false,
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3 = new Web3(provider);

    var address_connected = "";
    var valueWETH = "340000000000000000";

    await web3.eth.getAccounts().then((res) => {
      address_connected = res[0];
    });

    try {
      window.truckTokenContract = await new web3.eth.Contract(
        truckTokenABI,
        truckTokenAddress
      );

      const txHash = await web3.eth.sendTransaction({
        to: truckTokenAddress, // Required except during contract publications.
        from: address_connected, // must match user's active address.
        maxPriorityFeePerGas: 40000000000,
        data: window.truckTokenContract.methods
          .approve(truckMintAddress, valueWETH)
          .encodeABI(), //make call to buy box
      });
      return txHash;
      //sign the transaction via Metamask
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
