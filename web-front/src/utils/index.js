import axios, { AxiosInstance } from "axios";
import { GET_BALANCES } from '../constants';

const Dispatcher = require('flux').Dispatcher;
const dispatcher = new Dispatcher();

const api = axios.create({
  baseURL: "https://ethereum-api.xyz",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export async function apiGetAccountAssets(address, chainId) {
  const response = await api.get(`/account-assets?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}

export function sanitizeHex(hex) {
  hex = hex.substring(0, 2) === "0x" ? hex.substring(2) : hex;
  if (hex === "") {
    return "";
  }
  hex = hex.length % 2 !== 0 ? "0" + hex : hex;
  return "0x" + hex;
}

export function convertStringToHex(value) {
  return (`${value}`).toString(16)
}

export const apiGetGasPrices = async () => {
  const response = await api.get(`/gas-prices`)
  const { result } = response.data
  console.log(result);
  return result
}

export function convertAmountToRawNumber(value, decimals, bn) {
  // return (`${value}`)
  //   .times(bn('10').pow(decimals))
  //   .toString()

  console.log(value * (10 ** decimals));
  return (value * (10 ** decimals))
  // console.log(value);
  // return (`${value}`)
}

export const apiGetAccountNonce = async (address, chainId) => {
  const response = await api.get(`/account-nonce?address=${address}&chainId=${chainId}`);
  const { result } = response.data;
  return result;
}


async function formatTestTransaction(web3, data, from_address, to_address, chainId, amountToSend) {
  const from = from_address;
  const to = to_address;

  const _toBN = web3.utils.toBN;
  // nonce
  const _nonce = await apiGetAccountNonce(from_address, chainId);
  const nonce = sanitizeHex(convertStringToHex(_nonce));

  // gasPrice
  const _gasPrice = (await apiGetGasPrices()).fast.price;
  // const gasPrice = sanitizeHex(convertStringToHex(convertAmountToRawNumber(_gasPrice, 9, amountToSend)));
  let gasPrice = _toBN(_gasPrice).mul(_toBN(10).pow(_toBN(9)));
  gasPrice = web3.utils.toHex(gasPrice);


  const t_gasLimit = await web3.eth.estimateGas({ to: to_address, data: data });
  console.log(t_gasLimit)
  // gasLimit
  const _gasLimit = t_gasLimit;
  const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));
  // value
  const _value = 0;
  const value = sanitizeHex(convertStringToHex(_value));

  // test transaction
  const tx = { from, to, nonce, gasPrice, gasLimit, value, data };

  return tx;
}


export async function SendTransaction(web3, data, from_address, to_address, ChainId, amountToSend, callback) {
  const tx = await formatTestTransaction(web3, data, from_address, to_address, ChainId, amountToSend);

  try {
    const result = await sendTransaction(tx);
    console.log(result)


    function sendTransaction(_tx) {
      web3.eth.sendTransaction(_tx)
        .on('transactionHash', function (hash) {
          console.log(hash)
          callback(null, hash)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          if (confirmationNumber == 2) {
            dispatcher.dispatch({ type: GET_BALANCES, content: {} })
          }
        })
        .on('receipt', function (receipt) {
          console.log(receipt);
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
        .catch((error) => {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
    }


    // function sendTransaction(_tx) {
    //   return new Promise((resolve, reject) => {
    //     web3.eth
    //       .sendTransaction(_tx)
    //       .once("transactionHash", (txHash) => resolve(txHash))
    //       .catch((err) => reject(err));
    //   });
    // }
  } catch (error) {
    console.error(error);
  }
}