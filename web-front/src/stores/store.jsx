import config from "../config";
import async from 'async';
import * as moment from 'moment';
import {
  ERROR,
  CONFIGURE,
  CONFIGURE_RETURNED,
  GET_BALANCES,
  GET_BALANCES_RETURNED,
  GET_BALANCES_PERPETUAL,
  GET_BALANCES_PERPETUAL_RETURNED,
  STAKE,
  STAKE_RETURNED,
  WITHDRAW,
  WITHDRAW_RETURNED,
  GET_REWARDS,
  GET_REWARDS_RETURNED,
  EXIT,
  EXIT_RETURNED,
  PROPOSE,
  PROPOSE_RETURNED,
  GET_PROPOSALS,
  GET_PROPOSALS_RETURNED,
  VOTE_FOR,
  VOTE_FOR_RETURNED,
  VOTE_AGAINST,
  VOTE_AGAINST_RETURNED,
  GET_CLAIMABLE_ASSET,
  GET_CLAIMABLE_ASSET_RETURNED,
  CLAIM,
  CLAIM_RETURNED,
  GET_CLAIMABLE,
  GET_CLAIMABLE_RETURNED,
  GET_YCRV_REQUIREMENTS,
  GET_YCRV_REQUIREMENTS_RETURNED,
} from '../constants';
import Web3 from 'web3';

import {
  injected,
  walletconnect,
  walletlink,
  ledger,
  trezor,
  frame,
  fortmatic,
  portis,
  squarelink,
  torus,
  authereum
} from "./connectors";

const rp = require('request-promise');
const ethers = require('ethers');

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();
class Store {
  constructor() {

    this.store = {
      currentBlock: 0,
      universalGasPrice: '70',
      account: {},
      web3: null,
      connectorsByName: {
        MetaMask: injected,
        MYKEY: injected,
        WalletConnect: walletconnect,
        WalletLink: walletlink,
        Ledger: ledger,
        Trezor: trezor,
        Frame: frame,
        Fortmatic: fortmatic,
        Portis: portis,
        Squarelink: squarelink,
        Torus: torus,
        Authereum: authereum
      },
      web3context: null,
      languages: [
        {
          language: 'English',
          code: 'en'
        },
        {
          language: 'Japanese',
          code: 'ja'
        },
        {
          language: 'Chinese',
          code: 'zh'
        }
      ],
      proposals: [
      ],
      claimableAsset: {
        id: 'yfi',
        name: 'yearn.finance',
        address: config.yfiAddress,
        abi: config.yfiABI,
        symbol: 'YFI',
        balance: 0,
        decimals: 18,
        rewardAddress: '0xfc1e690f61efd961294b3e1ce3313fbd8aa4f85d',
        rewardSymbol: 'aDAI',
        rewardDecimals: 18,
        claimableBalance: 0
      },
      rewardPools: [
        {
          id: 'dUSDT',
          urlParam:'dUSDT',
          name: 'Balancer Pool', // USDx: 0x33284741d62914C97E7DEF7B4B21550138Bc7d5c USDC: 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede
          website: 'markets.dforce.network',
          link: 'https://markets.dforce.network/',
          // icon: require('../assets/img1.svg'),
          logo: require('../assets/dUSDT.svg'),
          tokens: [
            {
              id: 'bpt',
              address: config.dUSDT_dToken_Address,
              // balancer Pool contract address
              // address: '0x7a71d2789Cf6b13aE25CA19DFD36c4925E7BD582',
              symbol: 'dUSDT',
              dToken: true,
              ROI:'dUSDT',
              type:'dToken',
              abi: config.erc20ABI,
              decimals: 6,
              rewardsAddress: config.dUSDT_RewardsAddress, // 0x2C196aF9540420E9F0716BfD8c9bF5fC9C3E227d
              rewardsABI: config.balancerRewardsABI,
              rewardsSymbol: 'DF',
              rewardsDecimal: 12,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0
            }
          ]
        },
        {
          id: 'dUSDC',
          urlParam:'dUSDC',
          name: 'Balancer Pool', // USDx: 0x33284741d62914C97E7DEF7B4B21550138Bc7d5c USDC: 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede
          website: 'markets.dforce.network',
          link: 'https://markets.dforce.network/',
          // icon: require('../assets/img2.svg'),
          logo: require('../assets/dUSDC.svg'),
          tokens: [
            {
              id: 'bpt',
              address: config.dUSDC_dToken_Address,
              // address: '0x7a71d2789Cf6b13aE25CA19DFD36c4925E7BD582',
              symbol: 'dUSDC',
              dToken: true,
              ROI:'dUSDC',
              type:'dToken',
              abi: config.erc20ABI,
              decimals: 6,
              rewardsAddress: config.dUSDC_RewardsAddress, // 0x2C196aF9540420E9F0716BfD8c9bF5fC9C3E227d
              rewardsABI: config.balancerRewardsABI,
              rewardsSymbol: 'DF',
              rewardsDecimal: 18,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0
            }
          ]
        },
        {
          id: 'dDAI',
          urlParam:'dDAI',
          name: 'Balancer Pool', // USDx: 0x33284741d62914C97E7DEF7B4B21550138Bc7d5c USDC: 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede
          website: 'markets.dforce.network',
          link: 'https://markets.dforce.network',
          // icon: require('../assets/img2.svg'),
          logo: require('../assets/dDAI.svg'),
          tokens: [
            {
              id: 'bpt',
              address: config.dDAI_dToken_Address,
              // address: '0x7a71d2789Cf6b13aE25CA19DFD36c4925E7BD582',
              symbol: 'dDAI',
              dToken: true,
              ROI:'dDAI',
              type:'dToken',
              abi: config.erc20ABI,
              decimals: 18,
              rewardsAddress: config.dDAI_RewardsAddress, // 0x2C196aF9540420E9F0716BfD8c9bF5fC9C3E227d
              rewardsABI: config.balancerRewardsABI,
              rewardsSymbol: 'DF',
              rewardsDecimal: 0,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0
            }
          ]
        },
        {
          id: 'GOLDx/USDx',
          urlParam:'GOLDx-USDx',
          name: 'Uniswap Exchange', // USDx: 0x33284741d62914C97E7DEF7B4B21550138Bc7d5c USDC: 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede
          website: 'Uniswap Exchange',
          link: 'https://app.uniswap.org/#/add/0xeb269732ab75a6fd61ea60b06fe994cd32a83549/0x355c665e101b9da58704a8fddb5feef210ef20c0',
          // icon: require('../assets/img2.svg'),
          logo: require('../assets/logo2.svg'),
          tokens: [
            {
              id: 'bpt',
              address: config.UniswapGOLDx_LP_Token,
              // address: '0x7a71d2789Cf6b13aE25CA19DFD36c4925E7BD582',
              symbol: 'UNI-V2',
              ROI:'Glodx',
              type:'GOLDx',
              abi: config.erc20ABI,
              decimals: 18,
              rewardsAddress: config.GOLDx_LP_RewardsAddress, // 0x2C196aF9540420E9F0716BfD8c9bF5fC9C3E227d
              rewardsABI: config.balancerRewardsABI,
              rewardsSymbol: 'DF',
              rewardsDecimal: 0,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0
            }
          ]
        },
        {
          id: 'DF/USDx',
          urlParam:'DF-USDx',
          name: 'Uniswap Exchange', // USDx: 0x33284741d62914C97E7DEF7B4B21550138Bc7d5c USDC: 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede
          website: 'Uniswap Exchange',
          link: 'https://app.uniswap.org/#/add/0xeb269732ab75a6fd61ea60b06fe994cd32a83549/0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0',
          // icon: require('../assets/img2.svg'),
          logo: require('../assets/logo2.svg'),
          tokens: [
            {
              id: 'bpt',
              address: config.UniswapDF_USDx_Token,
              // address: '0x7a71d2789Cf6b13aE25CA19DFD36c4925E7BD582',
              symbol: 'UNI-V2',
              ROI:'DF',
              type:'DF',
              abi: config.erc20ABI,
              decimals: 18,
              rewardsAddress: config.DF_USDx_RewardsAddress, // 0x2C196aF9540420E9F0716BfD8c9bF5fC9C3E227d
              rewardsABI: config.balancerRewardsABI,
              rewardsSymbol: 'DF',
              rewardsDecimal: 0,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0
            }
          ]
        },
        {
          id: 'DF/ETH',
          urlParam:'DF-ETH',
          name: 'Uniswap Exchange', // USDx: 0x33284741d62914C97E7DEF7B4B21550138Bc7d5c USDC: 0xb7a4F3E9097C08dA09517b5aB877F7a917224ede
          website: 'Uniswap Exchange',
          link: 'https://app.uniswap.org/#/add/0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0/ETH',
          // icon: require('../assets/img2.svg'),
          logo: require('../assets/logo2.svg'),
          tokens: [
            {
              id: 'bpt',
              address: config.UniswapDF_ETH_Token,
              symbol: 'UNI-V2',
              ROI:'DF',
              type:'DF',
              abi: config.erc20ABI,
              decimals: 18,
              rewardsAddress: config.DF_ETH_RewardsAddress, 
              rewardsABI: config.balancerRewardsABI,
              rewardsSymbol: 'DF',
              rewardsDecimal: 0,
              balance: 0,
              stakedBalance: 0,
              rewardsAvailable: 0
            }
          ]
        }
      ]
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case GET_BALANCES:
            this.getBalances(payload);
            break;
          case GET_BALANCES_PERPETUAL:
            this.getBalancesPerpetual(payload);
            break;
          case STAKE:
            this.stake(payload);
            break;
          case WITHDRAW:
            this.withdraw(payload);
            break;
          case GET_REWARDS:
            this.getReward(payload);
            break;
          case EXIT:
            this.exit(payload);
            break;
          case PROPOSE:
            this.propose(payload)
            break;
          case GET_PROPOSALS:
            this.getProposals(payload)
            break;
          case VOTE_FOR:
            this.voteFor(payload)
            break;
          case VOTE_AGAINST:
            this.voteAgainst(payload)
            break;
          case GET_CLAIMABLE_ASSET:
            this.getClaimableAsset(payload)
            break;
          case CLAIM:
            this.claim(payload)
            break;
          case GET_CLAIMABLE:
            this.getClaimable(payload)
            break;
          case GET_YCRV_REQUIREMENTS:
            this.getYCRVRequirements(payload)
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return (this.store[index]);
  };

  setStore(obj) {
    this.store = { ...this.store, ...obj }
    // console.log(this.store)
    return emitter.emit('StoreUpdated');
  };

  configure = async () => {
    if (store.getStore('web3context') === null) { return false }
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const currentBlock = await web3.eth.getBlockNumber()

    store.setStore({ currentBlock: currentBlock })

    window.setTimeout(() => {
      emitter.emit(CONFIGURE_RETURNED)
    }, 100)
  }

  getBalancesPerpetual = async () => {
    const pools = store.getStore('rewardPools')
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const currentBlock = await web3.eth.getBlockNumber()
    store.setStore({ currentBlock: currentBlock })

    async.map(pools, (pool, callback) => {

      async.map(pool.tokens, (token, callbackInner) => {

        async.parallel([
          (callbackInnerInner) => { this._getERC20Balance(web3, token, account, callbackInnerInner) },
          (callbackInnerInner) => { this._getstakedBalance(web3, token, account, callbackInnerInner) },
          (callbackInnerInner) => { this._getRewardsAvailable(web3, token, account, callbackInnerInner) }
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }

          token.balance = data[0]
          token.stakedBalance = data[1]
          token.rewardsAvailable = data[2]

          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }

        pool.tokens = tokensData
        callback(null, pool)
      })

    }, (err, poolData) => {
      if (err) {
        console.log(err)
        return emitter.emit(ERROR, err)
      }
      store.setStore({ rewardPools: poolData })
      emitter.emit(GET_BALANCES_PERPETUAL_RETURNED)
      emitter.emit(GET_BALANCES_RETURNED)
    })
  }

  getBalances = () => {
    const pools = store.getStore('rewardPools')
    const account = store.getStore('account')

    const web3 = new Web3(store.getStore('web3context').library.provider);

    async.map(pools, (pool, callback) => {

      async.map(pool.tokens, (token, callbackInner) => {

        async.parallel([
          (callbackInnerInner) => { this._getERC20Balance(web3, token, account, callbackInnerInner) },
          (callbackInnerInner) => { this._getstakedBalance(web3, token, account, callbackInnerInner) },
          (callbackInnerInner) => { this._getRewardsAvailable(web3, token, account, callbackInnerInner) }
        ], (err, data) => {
          if (err) {
            console.log(err)
            return callbackInner(err)
          }

          token.balance = data[0]
          token.stakedBalance = data[1]
          token.rewardsAvailable = data[2]

          callbackInner(null, token)
        })
      }, (err, tokensData) => {
        if (err) {
          console.log(err)
          return callback(err)
        }

        pool.tokens = tokensData
        callback(null, pool)
      })

    }, (err, poolData) => {
      if (err) {
        console.log(err)
        return emitter.emit(ERROR, err)
      }
      store.setStore({ rewardPools: poolData })
      emitter.emit(GET_BALANCES_RETURNED)
    })
  }

  _checkApproval = async (asset, account, amount, contract, callback) => {
    try {
      const web3 = new Web3(store.getStore('web3context').library.provider);

      const erc20Contract = new web3.eth.Contract(asset.abi, asset.address)
      const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })

      const ethAllowance = web3.utils.fromWei(allowance, "ether")

      if (parseFloat(ethAllowance) < parseFloat(amount)) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        callback()
      } else {
        callback()
      }
    } catch (error) {
      console.log(error)
      if (error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }

  _checkApprovalWaitForConfirmation = async (asset, account, amount, contract, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address)
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })

    const ethAllowance = web3.utils.fromWei(allowance, "ether")

    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        .on('transactionHash', function (hash) {
          callback()
        })
        .on('error', function (error) {
          if (!error.toString().includes("-32601")) {
            if (error.message) {
              return callback(error.message)
            }
            callback(error)
          }
        })
    } else {
      callback()
    }
  }

  // toStringDecimals
  toStringDecimals = (numStr, decimals, decimalPlace = decimals)=>{
        numStr = numStr.toLocaleString().replace(/,/g, '');
        decimals = decimals.toString();
    
        var str = Number(`1e+${decimals}`).toLocaleString().replace(/,/g, '').slice(1);
    
        var res = (numStr.length > decimals ?
            numStr.slice(0, numStr.length - decimals) + '.' + numStr.slice(numStr.length - decimals) :
            '0.' + str.slice(0, str.length - numStr.length) + numStr).replace(/(0+)$/g, "");
    
        // res = res.slice(-1) == '.' ? res + '00' : res;
    
        if (decimalPlace == 0)
            return res.slice(0, res.indexOf('.'));
    
        var length = res.indexOf('.') + 1 + decimalPlace;
        res = res.slice(0, length >= res.length ? res.length : length).replace(/(0+)$/g, "");
        return res.slice(-1) == '.' ? res + '00' : res;
    }

  _getERC20Balance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address)
    try {
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      // console.log(Number(this.toStringDecimals(balance, asset.decimals)),this.toStringDecimals(balance, asset.decimals),balance)
      // balance = parseFloat(balance) / 10 ** asset.decimals
      callback(null, this.toStringDecimals(balance, asset.decimals))
      
    } catch (ex) {
      return callback(ex)
    }
  }

  _getstakedBalance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
    try {
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      // balance = parseFloat(balance) / 10 ** asset.decimals
      callback(null, this.toStringDecimals(balance, asset.decimals))
    } catch (ex) {
      return callback(ex)
    }
  }

  _getRewardsAvailable = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
    try {
      var earned = await erc20Contract.methods.earned(account.address).call({ from: account.address });
      // earned = parseFloat(earned) / 10 ** asset.decimals
      // callback(null, parseFloat(earned))
      callback(null, this.toStringDecimals(earned, 18))
    } catch (ex) {
      return callback(ex)
    }
  }

  _checkIfApprovalIsNeeded = async (asset, account, amount, contract, callback, overwriteAddress) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, (overwriteAddress ? overwriteAddress : asset.address))
    const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })

    const ethAllowance = web3.utils.fromWei(allowance, "ether")
    if (parseFloat(ethAllowance) < parseFloat(amount)) {
      asset.amount = amount
      callback(null, asset)
    } else {
      callback(null, false)
    }
  }

  _callApproval = async (asset, account, amount, contract, last, callback, overwriteAddress) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);
    let erc20Contract = new web3.eth.Contract(config.erc20ABI, (overwriteAddress ? overwriteAddress : asset.address))
    try {
      if (last) {
        await erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
        callback()
      } else {
        erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
          .on('transactionHash', function (hash) {
            callback()
          })
          .on('error', function (error) {
            if (!error.toString().includes("-32601")) {
              if (error.message) {
                return callback(error.message)
              }
              callback(error)
            }
          })
      }
    } catch (error) {
      if (error.message) {
        return callback(error.message)
      }
      callback(error)
    }
  }

  stake = (payload) => {
    const account = store.getStore('account')
    const { asset, amount } = payload.content
    this._checkApproval(asset, account, amount, asset.rewardsAddress, (err) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }
      this._callStake(asset, account, amount, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(STAKE_RETURNED, res)
      })
    })
  }

  _callStake = async (asset, account, amount, callback) => {
    debugger
    console.log(store.getStore('connectorsByName'))
    console.log(store.getStore('web3context'))
    const web3 = new Web3(store.getStore('web3context').library.provider);
    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)
    
    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * Number(`1e+${asset.decimals}`)).toFixed(0);
      
    }

    // const tx = {
    //   from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
    //   to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
    //   data: "0x", // Required
    //   gasPrice: "0x02540be400", // Optional
    //   gas: "0x9c40", // Optional
    //   value: "0x00", // Optional
    //   nonce: "0x0114", // Optional
    // };
    // console.log(store.getStore('web3context'))
    // console.log("yCurveFiContract",yCurveFiContract)

    // web3.eth.signTransaction({
    //   from: account.address,
    //   gasPrice: '100000000000',
    //   gas: "2100000",
    //   to: asset.rewardsAddress,
    //   value: "0",
    //   data: '0xa694fc3a0000000000000000000000000000000000000000000000000de0b6b3a7640000'
    // })
    // .then(console.log)
    // .catch(e=>{console.log(e)})

    yCurveFiContract.methods.stake(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
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

  withdraw = (payload) => {
    const account = store.getStore('account')
    const { asset, amount } = payload.content

    this._callWithdraw(asset, account, amount, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(WITHDRAW_RETURNED, res)
    })
  }

  _callWithdraw = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)

    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }

    yCurveFiContract.methods.withdraw(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
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

  getReward = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content

    this._callGetReward(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(GET_REWARDS_RETURNED, res)
    })
  }

  _callGetReward = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)

    yCurveFiContract.methods.getReward().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
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

  exit = (payload) => {
    const account = store.getStore('account')
    const { asset } = payload.content

    this._callExit(asset, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(EXIT_RETURNED, res)
    })
  }

  _callExit = async (asset, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const yCurveFiContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)

    yCurveFiContract.methods.exit().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
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

  propose = (payload) => {
    const account = store.getStore('account')

    this._callPropose(account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(PROPOSE_RETURNED, res)
    })
  }

  _callPropose = async (account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const governanceContract = new web3.eth.Contract(config.governanceABI, config.governanceAddress)

    governanceContract.methods.propose().send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
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

  getProposals = (payload) => {
    // emitter.emit(GET_PROPOSALS_RETURNED)
    const account = store.getStore('account')
    const web3 = new Web3(store.getStore('web3context').library.provider);

    this._getProposalCount(web3, account, (err, proposalCount) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      let arr = Array.from(Array(parseInt(proposalCount)).keys())

      if (proposalCount == 0) {
        arr = []
      }

      async.map(arr, (proposal, callback) => {
        this._getProposals(web3, account, proposal, callback)
      }, (err, proposalsData) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        store.setStore({ proposals: proposalsData })
        emitter.emit(GET_PROPOSALS_RETURNED)
      })

    })
  }

  _getProposalCount = async (web3, account, callback) => {
    try {
      const governanceContract = new web3.eth.Contract(config.governanceABI, config.governanceAddress)
      var proposals = await governanceContract.methods.proposalCount().call({ from: account.address });
      callback(null, proposals)
    } catch (ex) {
      return callback(ex)
    }
  }

  _getProposals = async (web3, account, number, callback) => {
    try {
      const governanceContract = new web3.eth.Contract(config.governanceABI, config.governanceAddress)
      var proposals = await governanceContract.methods.proposals(number).call({ from: account.address });
      callback(null, proposals)
    } catch (ex) {
      return callback(ex)
    }
  }

  voteFor = (payload) => {
    const account = store.getStore('account')
    const { proposal } = payload.content

    this._callVoteFor(proposal, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(VOTE_FOR_RETURNED, res)
    })
  }

  _callVoteFor = async (proposal, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const governanceContract = new web3.eth.Contract(config.governanceABI, config.governanceAddress)

    governanceContract.methods.voteFor(proposal.id).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} })
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

  voteAgainst = (payload) => {
    const account = store.getStore('account')
    const { proposal } = payload.content

    this._callVoteAgainst(proposal, account, (err, res) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      return emitter.emit(VOTE_AGAINST_RETURNED, res)
    })
  }

  _callVoteAgainst = async (proposal, account, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const governanceContract = new web3.eth.Contract(config.governanceABI, config.governanceAddress)

    governanceContract.methods.voteAgainst(proposal.id).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_PROPOSALS, content: {} })
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

  getClaimableAsset = (payload) => {
    const account = store.getStore('account')
    const asset = store.getStore('claimableAsset')

    const web3 = new Web3(store.getStore('web3context').library.provider);

    async.parallel([
      (callbackInnerInner) => { this._getClaimableBalance(web3, asset, account, callbackInnerInner) },
      (callbackInnerInner) => { this._getClaimable(web3, asset, account, callbackInnerInner) },
    ], (err, data) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      asset.balance = data[0]
      asset.claimableBalance = data[1]

      store.setStore({ claimableAsset: asset })
      emitter.emit(GET_CLAIMABLE_ASSET_RETURNED)
    })
  }

  _getClaimableBalance = async (web3, asset, account, callback) => {
    let erc20Contract = new web3.eth.Contract(asset.abi, asset.address)

    try {
      var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals
      callback(null, parseFloat(balance))
    } catch (ex) {
      return callback(ex)
    }
  }

  _getClaimable = async (web3, asset, account, callback) => {
    let claimContract = new web3.eth.Contract(config.claimABI, config.claimAddress)

    try {
      var balance = await claimContract.methods.claimable(account.address).call({ from: account.address });
      balance = parseFloat(balance) / 10 ** asset.decimals
      callback(null, parseFloat(balance))
    } catch (ex) {
      return callback(ex)
    }
  }

  claim = (payload) => {
    const account = store.getStore('account')
    const asset = store.getStore('claimableAsset')
    const { amount } = payload.content

    this._checkApproval(asset, account, amount, config.claimAddress, (err) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      this._callClaim(asset, account, amount, (err, res) => {
        if (err) {
          return emitter.emit(ERROR, err);
        }

        return emitter.emit(CLAIM_RETURNED, res)
      })
    })
  }

  _callClaim = async (asset, account, amount, callback) => {
    const web3 = new Web3(store.getStore('web3context').library.provider);

    const claimContract = new web3.eth.Contract(config.claimABI, config.claimAddress)

    var amountToSend = web3.utils.toWei(amount, "ether")
    if (asset.decimals != 18) {
      amountToSend = (amount * 10 ** asset.decimals).toFixed(0);
    }

    claimContract.methods.claim(amountToSend).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
      .on('transactionHash', function (hash) {
        console.log(hash)
        callback(null, hash)
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        if (confirmationNumber == 2) {
          dispatcher.dispatch({ type: GET_CLAIMABLE_ASSET, content: {} })
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

  getClaimable = (payload) => {
    const account = store.getStore('account')
    const asset = store.getStore('claimableAsset')

    const web3 = new Web3(store.getStore('web3context').library.provider);

    async.parallel([
      (callbackInnerInner) => { this._getClaimableBalance(web3, asset, account, callbackInnerInner) },
      (callbackInnerInner) => { this._getClaimable(web3, asset, account, callbackInnerInner) },
    ], (err, data) => {
      if (err) {
        return emitter.emit(ERROR, err);
      }

      asset.balance = data[0]
      asset.claimableBalance = data[1]

      store.setStore({ claimableAsset: asset })
      emitter.emit(GET_CLAIMABLE_RETURNED)
    })
  }

  getYCRVRequirements = async (payload) => {
    try {
      const account = store.getStore('account')
      const web3 = new Web3(store.getStore('web3context').library.provider);

      const governanceContract = new web3.eth.Contract(config.governanceABI, config.governanceAddress)
      let balance = await governanceContract.methods.balanceOf(account.address).call({ from: account.address })
      balance = parseFloat(balance) / 10 ** 18

      const voteLock = await governanceContract.methods.voteLock(account.address).call({ from: account.address })
      const currentBlock = await web3.eth.getBlockNumber()

      const returnOBJ = {
        balanceValid: (balance > 1000),
        voteLockValid: voteLock > currentBlock,
        voteLock: voteLock
      }

      emitter.emit(GET_YCRV_REQUIREMENTS_RETURNED, returnOBJ)

    } catch (ex) {
      return emitter.emit(ERROR, ex);
    }
  }

  _getGasPrice = async () => {
    try {
      const url = 'https://gasprice.poa.network/'
      const priceString = await rp(url);
      const priceJSON = JSON.parse(priceString)
      if (priceJSON) {
        return priceJSON.fast.toFixed(0)
      }
      return store.getStore('universalGasPrice')
    } catch (e) {
      console.log(e)
      return store.getStore('universalGasPrice')
    }
  }
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
