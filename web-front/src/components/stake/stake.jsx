import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Web3 from 'web3';
import Header from '../header';
import Footer from '../footer';
import UnlockModal from '../unlock/unlockModal'
import Loader from '../loader'
import Snackbar from '../snackbar'
import config from '../../config/config'
import Store from "../../stores";
import { colors } from '../../theme'

import {
  ERROR,
  STAKE,
  STAKE_RETURNED,
  WITHDRAW,
  WITHDRAW_RETURNED,
  GET_REWARDS,
  GET_REWARDS_RETURNED,
  EXIT,
  EXIT_RETURNED,
  GET_YCRV_REQUIREMENTS,
  GET_YCRV_REQUIREMENTS_RETURNED,
  GET_BALANCES_RETURNED,
  CONNECTION_CONNECTED,
  CONNECTION_DISCONNECTED,
  CONFIGURE_RETURNED,
  GET_BALANCES_PERPETUAL_RETURNED,
  GET_BALANCES_PERPETUAL,
  CONFIGURE
} from '../../constants'

import { injected } from "../../stores/connectors";

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '922px',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      overflow: 'hidden'
    }
  },
  intro: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '400px'
  },
  introCenter: {
    minWidth: '100%',
    textAlign: 'center',
    padding: '48px 0px'
  },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '800px',
    }
  },
  connectContainer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '450',
    }
  },
  disaclaimer: {
    padding: '12px',
    border: '1px solid rgb(174, 174, 174)',
    borderRadius: '0.75rem',
    marginBottom: '24px',
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    flex: 1,
    whiteSpace: 'nowrap',
    fontSize: '0.83rem',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    padding: '28px 30px',
    borderRadius: '50px',
    border: '1px solid ' + colors.borderBlue,
    alignItems: 'center',
    maxWidth: '500px',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  walletAddress: {
    padding: '0px 12px'
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray
  },
  title: {
    fontSize: '36px',
    margin: '0 auto 29px',
    color: '#434976',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw - 75px)',
      textAlign: 'center',
      margin: '0 auto 5px',
      fontSize: '28px',
      lineHeight: '33px'
    }
  },
  subTitle: {
    maxWidth: '453px',
    fontSize: '18px',
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: '39px',
    marginTop: '0',
    color: '#A4A7BE',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw - 75px)',
      textAlign: 'center',
      margin: '0 auto 20px',
      fontSize: '16px',
      color: '#A4A7BE',
      fontWeight: '400',
      lineHeight: '20px'
    }
  },
  overview: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '28px 30px',
    alignItems: 'center',
    width: '100%',
    background: colors.white,
    boxShadow: '0px 0px 35px 0px rgba(94,85,126,0.15)',
    borderRadius: '6px',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw - 25px)',
      padding: '20px 0',
    }
  },
  overviewField: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    flexDirection: 'column',
    borderRight: '1px solid #F6F5F8',
    lineHeight: '1'
  },
  lastField: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    flexDirection: 'column',
    borderRight: '1px solid #F6F5F8',
    borderRight: '0'
  },
  overviewTitle: {
    color: '#A4A7BE',
    fontSize: '14px',
    marginBottom: '13px',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
      marginBottom: '8px',
    }
  },
  overviewValue: {
    fontSize: '20px',
    color: '#434976',
    [theme.breakpoints.down('md')]: {
      fontSize: '13px',
      fontWeight: '500'
    }
  },
  actions: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      padding: '0 12px'
    }
  },
  actionContainer: {
    width: '270px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'block',
      '&:first-child': {
        marginBottom: '12px'
      }
    }
  },
  primaryButton: {
    '&:hover': {
      backgroundColor: '#BA59FF',
      color: '#fff',
      border: '0'
    },
    backgroundColor: '#BA59FF',
    color: '#fff',
    fontWeight: 500,
  },
  actionButton: {
    '&:hover': {
      backgroundColor: '#BA59FF',
      color: '#fff',
      border: '0'
    },
    '&:first-child': {
      marginRight: '30px'
    },
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    color: '#BA59FF',
    borderRadius: '4px',
    border: '1px solid #BA59FF!important'
  },
  actionButton_Lock: {
    color: '#DADADA',
    backgroundColor: '#F4F4F4',
    fontWeight: '700',
    border: '1px solid #E5E6F2!important',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    borderRadius: '4px',
    pointerEvents: 'none',
    marginRight: '30px',
    border: '1px solid #E5E6F2!important'
  },
  disabledActionButton: {
    color: '#DADADA',
    backgroundColor: '#F4F4F4',
    fontWeight: '700',
    border: '1px solid #E5E6F2!important',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    borderRadius: '4px',
    pointerEvents: 'none',
    marginRight: '30px'
  },
  buttonText: {
    fontWeight: '700',
    border: '0'
  },
  stakeButtonText: {
    fontWeight: '700',
    color: 'white',
  },
  valContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem'
  },
  inputAdornment: {
    fontWeight: '600',
    fontSize: '1.5rem'
  },
  assetIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: '25px',
    background: '#dedede',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    marginRight: '16px'
  },
  balances: {
    width: '100%',
    textAlign: 'right',
    paddingRight: '20px',
    cursor: 'pointer'
  },
  stakeTitle: {
    width: '100%',
    color: colors.darkGray,
    marginBottom: '20px'
  },
  stakeButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    align: 'center',
    marginTop: '20px'
  },
  stakeButton: {
    minWidth: '300px'
  },
  requirement: {
    display: 'flex',
    alignItems: 'center'
  },
  check: {
    paddingTop: '6px'
  },
  voteLockMessage: {
    margin: '20px'
  },
  stakeBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#fff',
    boxShadow: '0px 0px 35px 0px rgba(94,85,126,0.15)',
    borderRadius: '6px',
    margin: '19px auto 40px',
    padding: '40px 0',
    [theme.breakpoints.down('md')]: {
      width: 'calc(100vw - 24px)',
      padding: '20px 0',
      margin: '12px auto 15px',
    }
  },
  stake: {
    margin: '0 auto 40px',
    height: '54px',
    lineHeight: '54px',
    fontSize: '16px',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto 15px',
      fontSize: '13px',
      height: '44px',
      lineHeight: '44px',
    }
  },
  unstake: {
    margin: '0 auto 40px',
    height: '54px',
    lineHeight: '54px',
    fontSize: '16px',
    position: 'relative',
    marginBottom: '0',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto 15px',
      fontSize: '13px',
      height: '44px',
      lineHeight: '44px',
    }
  },
  stakeInput: {
    display: 'block',
    float: 'left',
    width: '400px',
    height: '54px',
    borderRadius: '4px 0px 0px 4px',
    border: '1px solid #E5E6F2',
    padding: '0 52px 0 14px',
    fontSize: '16px',
    fontWeight: '400',
    [theme.breakpoints.down('md')]: {
      width: '220px',
      height: '44px',
      lineHeight: '44px',
      padding: '0 50px 0 10px',
      fontSize: '13px',
    }
  },
  stakeSpan: {
    display: 'inline-block',
    width: '170px',
    height: '54px',
    background: '#BA59FF',
    borderRadius: '0px 4px 4px 0px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '85px',
      height: '44px',
      lineHeight: '44px',
      fontSize: '13px',
    }
  },
  max: {
    position: 'absolute',
    top: '0',
    right: '170px',
    lineHeight: '54px',
    width: '52px',
    margin: '0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#434976',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '50px',
      height: '44px',
      lineHeight: '44px',
      right: '85px',
      textAlign: 'center',
      fontSize: '14px',
    }
  },
  unstake_lock: {
    margin: '0 auto 40px',
    height: '54px',
    lineHeight: '54px',
    fontSize: '16px',
    position: 'relative',
    marginBottom: '0',
    [theme.breakpoints.down('md')]: {
      margin: '48px auto 15px',
      fontSize: '13px',
      height: '44px',
      lineHeight: '44px',
    }
  },
  unstakeLockTop: {
    width: '570px',
    margin: '0 auto 40px',
    height: '54px',
    lineHeight: '54px',
    fontSize: '16px',
    position: 'relative',
    marginBottom: '0',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      width: '305px',
      margin: '0 auto 4px',
      fontSize: '12px',
      lineHeight: '20px',
      height: "auto"
    }
  },
  lockRed: {
    color: '#FF4848'
  },
  lockModal: {
    lineHeight: '20px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    position: 'absolute',
    right: '0',
    top: '-33px',
    padding: '3px 5px',
    fontSize: '12px',
    borderRadius: '2px',
    [theme.breakpoints.down('md')]: {
      top: '-55px',
    }
  },
  sj: {
    width: '0',
    height: '0',
    zIndex: '1000',
    borderBottom: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid rgba(0,0,0,0.5)',
    borderLeft: '6px solid transparent',
    position: 'absolute',
    bottom: '-12px',
    right: '85px',
    content: ' ',
    [theme.breakpoints.down('md')]: {
      right: '42.5px',
    }
  },
  stakeInput_lock: {
    display: 'block',
    float: 'left',
    width: '400px',
    height: '54px',
    borderRadius: '4px 0px 0px 4px',
    border: '1px solid #E5E6F2',
    padding: '0 52px 0 14px',
    fontSize: '16px',
    fontWeight: '400',
    backgroundColor: '#F4F4F4',
    pointerEvents: 'none',
    '&::-webkit-input-placeholder': {
      color: '#DADADA'
    },
    [theme.breakpoints.down('md')]: {
      width: '220px',
      height: '44px',
      lineHeight: '44px',
      padding: '0 50px 0 10px',
      fontSize: '13px',
      pointerEvents: 'none',
    }
  },
  stakeSpan_lock: {
    display: 'inline-block',
    width: '170px',
    height: '54px',
    background: '#BA59FF',
    borderRadius: '0px 4px 4px 0px',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    cursor: 'pointer',
    backgroundColor: '#C6C6C9',
    [theme.breakpoints.down('md')]: {
      width: '85px',
      height: '44px',
      lineHeight: '44px',
      fontSize: '13px',
    }
  },
  max_lock: {
    position: 'absolute',
    top: '0',
    right: '170px',
    lineHeight: '54px',
    width: '52px',
    margin: '0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#434976',
    cursor: 'pointer',
    pointerEvents: 'none',
    color: '#DADADA',
    [theme.breakpoints.down('md')]: {
      width: '50px',
      height: '44px',
      lineHeight: '44px',
      right: '85px',
      textAlign: 'center',
      fontSize: '14px',
      pointerEvents: 'none',
    }
  }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Stake extends Component {

  constructor(props) {
    super(props)
    const account = store.getStore('account')
    // const pool = store.getStore('currentPool')
    const pool = this.props.location.state.currentPool
    // console.log("pool" + pool)
    // console.log(store)
    // if (!pool) {
    //   props.history.push('/')
    // }
    this.state = {
      pool: pool,
      loading: !account,
      account: account,
      modalOpen: false,
      value: 'options',
      voteLockValid: false,
      balanceValid: false,
      voteLock: null,
      unstakeLock: false,
      mouseEnter: false,
      timeStamp: 0
    }
    // if (pool && ['Fee Rewards', 'Governance'].includes(pool.id)) {
    //   dispatcher.dispatch({ type: GET_YCRV_REQUIREMENTS, content: {} })
    // }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.on(CONFIGURE_RETURNED, this.configureReturned);
    emitter.on(GET_BALANCES_PERPETUAL_RETURNED, this.getBalancesReturned);
    emitter.on(ERROR, this.errorReturned);
    emitter.on(STAKE_RETURNED, this.showHash);
    emitter.on(WITHDRAW_RETURNED, this.showHash);
    emitter.on(EXIT_RETURNED, this.showHash);
    emitter.on(GET_REWARDS_RETURNED, this.showHash);
    emitter.on(GET_YCRV_REQUIREMENTS_RETURNED, this.yCrvRequirementsReturned);
    emitter.on(GET_BALANCES_RETURNED, this.balancesReturned);
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        injected.activate()
          .then((a) => {
            store.setStore({ account: { address: a.account }, web3context: { library: { provider: a.provider } } })
            emitter.emit(CONNECTION_CONNECTED)
            console.log(a)
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
      }
    });
  }
  componentDidMount(prevProps) {
    // metamask networkChange
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      window.ethereum.on('chainChanged', (_chainId) => {
        if (window.sessionStorage.getItem("chainId") !== _chainId) {
          window.sessionStorage.setItem("chainId", _chainId)
          window.location.reload()
        }
      });

      // metamask disConnect
      window.ethereum.on('disconnect', () => {
        console.log("disConnect")
      });
      // accountChange
      window.ethereum.on('accountsChanged', (accounts) => {
        const account = { address: accounts[0] }
        store.setStore('account', account)
        this.setState(() => (
          {
            account
          }
        ))
        dispatcher.dispatch({ type: CONFIGURE, content: {} })
        if (window.sessionStorage.getItem("accounts") !== accounts[0] + '') {
          window.sessionStorage.setItem("accounts", accounts[0])
          window.location.reload()
        }
      });
    }
    setTimeout(async () => {
      const { account } = this.state
      if (!Object.getOwnPropertyNames(account).length) {
        this.setState(() => (
          {
            modalOpen: true
          }
        ))
      }
      if (store.getStore('web3context') !== null) {
        const asset = this.state.pool
        const web3 = new Web3(store.getStore('web3context').library.provider);
        const LockContract = new web3.eth.Contract(asset.tokens[0].rewardsABI, asset.tokens[0].rewardsAddress)
        // return;
        const Locked = await LockContract.methods.lockedDetails().call();
        if (Locked[0]) {
          this.setState({
            unstakeLock: true,
            timeStamp: Locked[1],
          })
        } else {
          console.log(Locked)
        }
      }
    }, 1000)
  }
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
    emitter.removeListener(GET_BALANCES_PERPETUAL_RETURNED, this.getBalancesReturned);
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(STAKE_RETURNED, this.showHash);
    emitter.removeListener(WITHDRAW_RETURNED, this.showHash);
    emitter.removeListener(EXIT_RETURNED, this.showHash);
    emitter.removeListener(GET_REWARDS_RETURNED, this.showHash);
    emitter.removeListener(GET_YCRV_REQUIREMENTS_RETURNED, this.yCrvRequirementsReturned);
    emitter.removeListener(GET_BALANCES_RETURNED, this.balancesReturned);
  };

  getBalancesReturned = () => {
    window.setTimeout(() => {
      dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
    }, 15000)
  }

  configureReturned = () => {
    dispatcher.dispatch({ type: GET_BALANCES_PERPETUAL, content: {} })
  }

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })
    dispatcher.dispatch({ type: CONFIGURE, content: {} })
    this.setState(() => (
      {
        modalOpen: false
      }
    ))
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
    dispatcher.dispatch({ type: CONFIGURE, content: {} })
  }

  balancesReturned = () => {
    // const currentPool = store.getStore('currentPool')
    const currentPool = this.state.pool
    const pools = store.getStore('rewardPools')
    let newPool = pools.filter((pool) => {
      return pool.id === currentPool.id
    })

    if (newPool.length > 0) {
      newPool = newPool[0]
      // store.setStore({ currentPool: newPool })
      this.setState({
        pool: newPool
      })
    }
  }

  yCrvRequirementsReturned = (requirements) => {
    this.setState({
      balanceValid: requirements.balanceValid,
      voteLockValid: requirements.voteLockValid,
      voteLock: requirements.voteLock
    })
  }

  showHash = (txHash) => {
    this.setState({ snackbarMessage: null, snackbarType: null, loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  };

  formatNumber = (amount) => {
    let roundAmount = amount.toFixed(4).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    let index = roundAmount.indexOf('.')
    return roundAmount.slice(0, index + 3)
  }

  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: error.toString(), snackbarType: 'Error' }
      that.setState(snackbarObj)
    })
  };

  render() {
    const { classes } = this.props;
    const {
      value,
      account,
      modalOpen,
      pool,
      loading,
      snackbarMessage,
      voteLockValid,
      balanceValid
    } = this.state
    var address = null;
    if (account.address) {
      address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length)
    }
    if (!pool) {
      return null
    }
    return (
      <div className={classes.root}>
        <Header show={true} address={address} overlayClicked={this.overlayClicked} cur_language={this.props.cur_language} linkTo={"/"} />
        {modalOpen && this.renderModal()}
        {/* <Typography variant={'h5'} className={classes.disaclaimer}>This project is in beta. Use at your own risk.</Typography> */}
        {/* <div className={classes.intro}>
          <Card className={classes.addressContainer} onClick={this.overlayClicked}>
            <Typography variant={'h3'} className={classes.walletTitle} noWrap>Wallet</Typography>
            <Typography variant={'h4'} className={classes.walletAddress} noWrap>{address}</Typography>
            <div style={{ background: '#DC6BE5', opacity: '1', borderRadius: '10px', width: '10px', height: '10px', marginRight: '3px', marginTop: '3px', marginLeft: '6px' }}></div>
          </Card>
        </div> */}
        <h1 className={classes.title}><FormattedMessage id='Staking_title' /></h1>
        <h2 className={classes.subTitle}><FormattedMessage id='Staking_subTitle' /></h2>
        <div className={classes.overview}>
          <div className={classes.overviewField}>
            <Typography variant={'h3'} className={classes.overviewTitle}><FormattedMessage id='Your_Balance' /></Typography>
            <Typography variant={'h2'} className={classes.overviewValue}>{pool.tokens[0].balance ? this.formatNumber(pool.tokens[0].balance) : "0"}  {pool.tokens[0].symbol}</Typography>
          </div>
          <div className={classes.overviewField}>
            <Typography variant={'h3'} className={classes.overviewTitle}><FormattedMessage id='Currently_Staked' /></Typography>
            {/* <Typography variant={'h2'} className={classes.overviewValue}>{pool.tokens[0].stakedBalance ? pool.tokens[0].stakedBalance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "0"} {pool.tokens[0].symbol}</Typography> */}
            <Typography variant={'h2'} className={classes.overviewValue}>{pool.tokens[0].stakedBalance ? this.formatNumber(pool.tokens[0].stakedBalance) : "0"} {pool.tokens[0].symbol}</Typography>
          </div>
          <div className={[classes.lastField]}>
            <Typography variant={'h3'} className={classes.overviewTitle}><FormattedMessage id='Available_to_Claim' /></Typography>
            {/* <Typography variant={'h2'} className={classes.overviewValue}>{pool.tokens[0].rewardsSymbol == '$' ? pool.tokens[0].rewardsSymbol : ''} {pool.tokens[0].rewardsAvailable ? pool.tokens[0].rewardsAvailable.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "0"} {pool.tokens[0].rewardsSymbol != '$' ? pool.tokens[0].rewardsSymbol : ''}</Typography> */}
            <Typography variant={'h2'} className={classes.overviewValue}>{pool.tokens[0].rewardsSymbol == '$' ? pool.tokens[0].rewardsSymbol : ''} {pool.tokens[0].rewardsAvailable ? (pool.tokens[0].rewardsAvailable / (10 ** (pool.tokens[0].rewardsDecimal))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : "0"} {pool.tokens[0].rewardsSymbol != '$' ? pool.tokens[0].rewardsSymbol : ''}</Typography>
          </div>
        </div>
        {pool.id === 'Fee Rewards' &&
          <div className={classes.actions}>
            <Typography className={classes.stakeTitle} variant={'h3'}>yCRV reward requirements</Typography>
            <div className={classes.requirement}>
              <Typography variant={'h4'}>You must have voted in a proposal recently</Typography><Typography variant={'h4'} className={classes.check}>{voteLockValid ? <CheckIcon style={{ color: colors.green }} /> : <ClearIcon style={{ color: colors.red }} />}</Typography>
            </div>
            <div className={classes.requirement}>
              <Typography variant={'h4'}>You must have at least 1000 BPT staked in the Governance pool</Typography><Typography variant={'h4'} className={classes.check}>{balanceValid ? <CheckIcon style={{ color: colors.green }} /> : <ClearIcon style={{ color: colors.red }} />}</Typography>
            </div>
          </div>
        }
        {this.stakeBox()}
        {value === 'options' && this.renderOptions()}
        {value === 'claim' && this.renderClaim()}
        {value === 'exit' && this.renderExit()}
        {snackbarMessage && this.renderSnackbar()}
        {loading && <Loader />}
        <Footer cur_language={this.props.cur_language} setLanguage={this.props.setLanguage} />
      </div>
    )
  }

  renderOptions = () => {
    const { classes } = this.props;
    const { loading, pool, voteLockValid, balanceValid, voteLock, unstakeLock } = this.state

    return (
      <div className={classes.actions}>
        <div className={classes.actionContainer}>
          <Button
            fullWidth
            className={!loading ? classes.actionButton : classes.disabledActionButton}
            variant="outlined"
            color="primary"
            // disabled={loading}
            onClick={() => { this.onClaim() }}
          >
            <div className={classes.buttonText}><FormattedMessage id='Claim_DF' /></div>
          </Button>
        </div>
        <div className={classes.actionContainer}>
          <Button
            fullWidth
            className={!(!loading && !unstakeLock) ? classes.disabledActionButton : classes.actionButton}
            variant="outlined"
            color="primary"
            // disabled={loading}
            onClick={() => { this.onExit() }}
          >
            <div className={classes.buttonText}><FormattedMessage id='Exit_Claim_and_Unstake' /></div>
          </Button>
        </div>
        {(pool.id === 'Governance' && voteLockValid) && <Typography variant={'h4'} className={classes.voteLockMessage}>Unstaking tokens only allowed once all your pending votes have closed at Block: {voteLock}</Typography>}
      </div>
    )
  }

  navigateInternal = (val) => {
    this.setState({ value: val })
  }

  onMouseOver = () => {
    this.setState({ mouseEnter: true })
  }
  onMouseOut = () => {
    this.setState({ mouseEnter: false })
  }

  stakeBox = () => {
    const { classes, cur_language } = this.props;
    const { loading, pool, unstakeLock, mouseEnter } = this.state
    const asset = pool.tokens[0]
    const amount = this.state[asset.id + '_stake']
    const amountError = this.state[asset.id + '_stake_error']
    const unAmount = this.state[asset.id + '_unstake']
    const unAmountError = this.state[asset.id + '_unstake_error']
    return (
      <div className={classes.stakeBox}>
        {unstakeLock ?
          cur_language === "中文" ?
            <div className={classes.unstakeLockTop}>
              <FormattedMessage id='unstake_lock_title1' />&nbsp;<span className={classes.lockRed}>{moment(this.state.timeStamp * 1000).format('HH:mm:ss YYYY/MM/DD')}</span><FormattedMessage id='unstake_lock_title2' />
            </div> :
            <div className={classes.unstakeLockTop}>
              <FormattedMessage id='unstake_lock_title1' />&nbsp;<span className={classes.lockRed}>{moment(this.state.timeStamp * 1000).format('HH:mm:ss YYYY/MM/DD')}</span>
            </div>
          : ''
        }
        <div className={classes.stake}>
          <input
            className={classes.stakeInput}
            placeholder="Amount"
            value={amount}
            error={amountError}
            id={asset.id + '_stake'}
            onChange={e => this.onChange(e)} />
          <p className={classes.max} onClick={() => this.onMaxChange(asset.id, 'stake')}><FormattedMessage id='MAX' /></p>
          <span className={classes.stakeSpan} onClick={() => { this.onStake() }}><FormattedMessage id='STAKE' /></span>
        </div>
        {
          unstakeLock ?
            <div className={classes.unstake_lock}>
              {mouseEnter ?
                cur_language === "中文" ?
                  <div className={classes.lockModal}><FormattedMessage id='unstake_lock_title1' />&nbsp;{moment(this.state.timeStamp * 1000).format('HH:mm:ss YYYY/MM/DD')}<div className={classes.sj}></div><FormattedMessage id='unstake_lock_title2' /></div>
                  : <div className={classes.lockModal}><FormattedMessage id='unstake_lock_title1' />&nbsp;{moment(this.state.timeStamp * 1000).format('HH:mm:ss YYYY/MM/DD')}<div className={classes.sj}></div></div>
                : ''}
              <input
                className={classes.stakeInput_lock}
                placeholder="Amount"
                value={unAmount}
                error={unAmountError}
                id={asset.id + '_unstake'}
              />
              <p className={classes.max_lock}><FormattedMessage id='MAX' /></p>
              <span className={classes.stakeSpan_lock} onMouseEnter={() => this.onMouseOver()} onMouseLeave={() => this.onMouseOut()}><FormattedMessage id='UNSTAKE' /></span>
            </div>
            : <div className={classes.unstake}>
              <input
                className={classes.stakeInput}
                placeholder="Amount"
                value={unAmount}
                error={unAmountError}
                id={asset.id + '_unstake'}
                onChange={e => this.onChange(e)} />
              <p className={classes.max} onClick={() => this.onMaxChange(asset.id, 'unstake')}><FormattedMessage id='MAX' /></p>
              <span className={classes.stakeSpan} onClick={() => { this.onUnstake() }}><FormattedMessage id='UNSTAKE' /></span>
            </div>
        }

      </div>
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  onStake = () => {
    this.setState({ amountError: false })
    const { pool } = this.state
    const tokens = pool.tokens
    const selectedToken = tokens[0]
    const amount = this.state[selectedToken.id + '_stake']
    // if(amount > selectedToken.balance) {
    //   return false
    // }
    if (amount !== '0' && amount != 'undefined') {
      this.setState({ loading: true })
      dispatcher.dispatch({ type: STAKE, content: { asset: selectedToken, amount: amount } })
    }
  }

  onClaim = () => {
    const { pool } = this.state
    const tokens = pool.tokens
    const selectedToken = tokens[0]

    this.setState({ loading: true })
    dispatcher.dispatch({ type: GET_REWARDS, content: { asset: selectedToken } })
  }

  onUnstake = () => {
    this.setState({ amountError: false })
    const { pool } = this.state
    const tokens = pool.tokens
    const selectedToken = tokens[0]
    const amount = this.state[selectedToken.id + '_unstake'] + ''
    //
    // if(amount > selectedToken.balance) {
    //   return false
    // }
    if (amount !== '0' && amount != 'undefined') {
      this.setState({ loading: true })
      amount && dispatcher.dispatch({ type: WITHDRAW, content: { asset: selectedToken, amount: amount } })
    }
  }

  onExit = () => {
    const { pool } = this.state
    const tokens = pool.tokens
    const selectedToken = tokens[0]

    this.setState({ loading: true })
    dispatcher.dispatch({ type: EXIT, content: { asset: selectedToken } })
  }

  onMaxChange = (assetId, type) => {
    const { pool } = this.state
    let maxValue, actualMaxValue
    if (type === 'stake') {
      maxValue = pool.tokens[0].balance ? pool.tokens[0].balance : '0'
      // actualMaxValue = pool.tokens[0].balance ? pool.tokens[0].balance : '0'
    } else if (type === 'unstake') {
      maxValue = pool.tokens[0].stakedBalance ? pool.tokens[0].stakedBalance : '0'
      // actualMaxValue = pool.tokens[0].stakedBalance ? pool.tokens[0].stakedBalance : '0'
    }
    this.setState(
      {
        [assetId + '_' + type]: maxValue
      }
    )
  }

  renderAssetInput = (asset, type) => {
    const {
      classes
    } = this.props

    const {
      loading
    } = this.state

    const amount = this.state[asset.id + '_' + type]
    const amountError = this.state[asset.id + '_' + type + '_error']

    return (
      <div className={classes.valContainer} key={asset.id + '_' + type}>
        <div className={classes.balances}>
          {type === 'stake' && <Typography variant='h4' onClick={() => { this.setAmount(asset.id, type, (asset ? asset.balance : 0)) }} className={classes.value} noWrap>{'Balance: ' + (asset && asset.balance ? (Math.floor(asset.balance * 10000) / 10000).toFixed(4) : '0.0000')} {asset ? asset.symbol : ''}</Typography>}
          {type === 'unstake' && <Typography variant='h4' onClick={() => { this.setAmount(asset.id, type, (asset ? asset.stakedBalance : 0)) }} className={classes.value} noWrap>{'Balance: ' + (asset && asset.stakedBalance ? (Math.floor(asset.stakedBalance * 10000) / 10000).toFixed(4) : '0.0000')} {asset ? asset.symbol : ''}</Typography>}
        </div>
        <div>
          <TextField
            fullWidth
            disabled={loading}
            className={classes.actionInput}
            id={'' + asset.id + '_' + type}
            value={amount}
            error={amountError}
            onChange={this.onChange}
            placeholder="0.00"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end" className={classes.inputAdornment}><Typography variant='h3' className={''}>{asset.symbol}</Typography></InputAdornment>,
              startAdornment: <InputAdornment position="end" className={classes.inputAdornment}>
                <div className={classes.assetIcon}>
                  <img
                    alt=""
                    src={require('../../assets/' + asset.symbol + '-logo.png')}
                    height="30px"
                  />
                </div>
              </InputAdornment>,
            }}
          />
        </div>
      </div>
    )
  }

  renderSnackbar = () => {
    var {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
  };

  onChange = (e) => {
    //
    const val = this.validChange(e)
    this.setState(val)
  }

  validChange = (e) => {
    const changeType = e.target.id.split('_')[1]
    const { pool } = this.state

    let maxValue

    if (changeType === 'stake') {
      maxValue = pool.tokens[0].balance ? this.formatNumber(pool.tokens[0].balance) : "0";
    } else if (changeType === 'unstake') {
      maxValue = pool.tokens[0].stakedBalance ? this.formatNumber(pool.tokens[0].stakedBalance) : "0";
    }

    let value = e.target.value
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入六个小数
    if (Number(value) > Number(maxValue)) {
      value = maxValue
    }
    if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
      value = parseFloat(value);
    }
    let val = []
    val[e.target.id] = value.toString()
    return val;
  }

  setAmount = (id, type, balance) => {
    const bal = (Math.floor((balance === '' ? '0' : balance) * 10000) / 10000).toFixed(4)
    let val = []
    val[id + '_' + type] = bal
    this.setState(val)
  }
  renderModal = () => {
    return (
      <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

}

export default withRouter(withStyles(styles)(Stake));
