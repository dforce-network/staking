import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography
} from '@material-ui/core';
import back from '../../assets/backdash.svg'
import { FormattedMessage } from 'react-intl';
import Header from '../header';
import Footer from '../footer';
import Store from "../../stores";
import { colors } from '../../theme'
import dTokenPool from '../../assets/dTokenPool.svg'
const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '874px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '0 auto 50px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '0 0 35px'
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
      width: '450px',
    }
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#2F80ED",
    },
    padding: '12px',
    backgroundColor: "#2F80ED",
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
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
  rewardPools: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  rewardPoolContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '280px',
    padding: '30px 0 20px',
    borderRadius: '6px',
    boxShadow: '0px 0px 35px 0px rgba(94,85,126,0.15)',
    background: colors.white,
    margin: '0 17px 16px 0',
    '&:nth-child(4n)': {
      marginRight: '0'
    },
    [theme.breakpoints.down('md')]: {
      width: 'calc(100% - 24px)',
      margin: '0 12px 12px',
      padding: '15px 0 20px',
    }
  },
  svgTitle: {
    width: '70px',
    height: '70px',
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px',
    }
  },
  mainTitle:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    minWidth:'100%',
    margin: '0 0 36px 0',
    [theme.breakpoints.down('md')]: {
      margin: '0 12px 25px',
      flexDirection:'column',
      alignItems:'flex-start'
    }
  },
  title: {
    // width: '100%',
    color: '#434976',
    fontSize: '36px',
    minWidth: '70%',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      minWidth: 'calc(100% - 25px)'
    }
  },
  back:{
    width:'146px',
    height:'44px',
    background:'#F8F9FF',
    border:'#BA59FF',
    color:'#BA59FF',
    border:'1px solid #BA59FF',
    borderRadius:'4px',
    // lineHeight:'1.2',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width:'190px',
      height:'40px',
      marginTop:'20px'
    }
  },
  backText:{
    fontSize:'16px',
    fontWeight:'bold',
    color:'#BA59FF',
    marginRight:'10px'
  },
  backIcon:{
    width:'8px',
    height:'12px',
    marginTop:'3px'
  },
  poolName: {
    height: '25px',
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'rgba(67,73,118,1)',
    lineHeight: '19px',
    marginBottom: '8px'
  },
  tokensList: {
    color: '#A4A7BE',
    marginBottom: '28px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '15px',
    }
  },
  B: {
    margin: '0 3px',
    color: '#000'
  },
  Btn: {
    width: '250px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    color: '#fff',
    background: '#BA59FF',
    borderRadius: '4px',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      width: '280px',
      height: '40px',
      lineHeight: '40px',
      fontSize: '16px',
      borderRadius: '2px'
    }
  },
  dTokenBtnBox: {
    width: '250px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between;',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '280px',
      height: '40px',
      lineHeight: '40px',
      fontSize: '16px',
      borderRadius: '2px'
    }
  },
  dTokenBtn: {
    flex: '1',
    textAlign: 'center',
    color: '#fff',
    background: '#BA59FF',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      borderRadius: '2px'
    }
  },
  poolWebsite: {
    height: '16px',
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(164,167,190,1)',
    lineHeight: '16px',
    textDecoration: 'underline',
    '&:hover': {
      color: '#BA59FF'
    }
  },
  svgCenter: {
    width: '150px',
    height: '80px',
    margin: '20px auto 20px',
    [theme.breakpoints.down('md')]: {
      margin: '20px auto 15px'
    }
  }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class RewardPools extends Component {

  constructor(props) {
    super(props)

    const account = store.getStore('account')
    const rewardPools = store.getStore('rewardPools')

    this.state = {
      rewardPools: rewardPools,
      loading: !(account && rewardPools),
      account: account
    }
    // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  }


  configureReturned = () => {
    this.setState({ loading: false })
  }

  render() {
    const { classes } = this.props;
    const {
      // value,
      // account,
      // loading,
      modalOpen,
    } = this.state


    return (
      <div className={classes.root}>
        {/* <Typography variant={'h5'} className={classes.disaclaimer}>This project is in beta. Use at your own risk.</Typography>
        <div className={classes.intro}>
          <Card className={classes.addressContainer} onClick={this.overlayClicked}>
            <Typography variant={'h3'} className={classes.walletTitle} noWrap>Wallet</Typography>
            <Typography variant={'h4'} className={classes.walletAddress} noWrap>{address}</Typography>
            <div style={{ background: '#DC6BE5', opacity: '1', borderRadius: '10px', width: '10px', height: '10px', marginRight: '3px', marginTop: '3px', marginLeft: '6px' }}></div>
          </Card>
        </div> */}
        <Header show={false} cur_language={this.props.cur_language} setLanguage={this.props.setLanguage} linkTo={'https://dforce.network/'} />
        <div className={classes.rewardPools}>
          <div className={classes.mainTitle}>
            <Typography variant={'h3'} className={classes.title} noWrap><FormattedMessage id='pool_title' /></Typography>
            <div className={classes.back} onClick={()=>this.props.history.push('/dashboard')}>
              <span className={classes.backText}>Dashboard</span>
              <img className={classes.backIcon} src={back} alt=""/>
            </div>
          </div>
          {
            this.renderRewards()
          }
        </div>
        <Footer cur_language={this.props.cur_language} setLanguage={this.props.setLanguage} />
        {/* {modalOpen && this.renderModal()} */}
      </div>
    )
  }

  renderRewards = () => {
    const { rewardPools } = this.state
    const dtoken = rewardPools.filter((item) => item.tokens[0].dToken)
    const LP = rewardPools.filter((item) => !item.tokens[0].dToken)
    const renderRewardPools = [ dtoken,...LP]
    return renderRewardPools.map((rewardPool) => {
      return this.renderRewardPool(rewardPool)
    })
  }

  renderRewardPool = (rewardPool) => {

    const { classes } = this.props
    if (Array.isArray(rewardPool)) {
      // let dtokensList = rewardPool.tokens.map((rp) => { return rp.symbol }).join(', ')
      let tokensList = rewardPool.map(item => (
        item.tokens.map((rp) => { return rp.symbol }).join(', ')
      )).join('/')
      return (<div className={classes.rewardPoolContainer} key={"dToken"} >
        {/* <div className={classes.svgTitle}><img src={rewardPool.icon} alt="" /></div> */}
        <Typography variant='h3' className={classes.poolName}>{tokensList}</Typography>
        <Typography variant='h5'><a className={classes.poolWebsite} href={"https://markets.dforce.network/"} target="_blank">{"https://markets.dforce.network/"}</a></Typography>
        <div className={classes.svgCenter}><img src={dTokenPool} alt="" /></div>
        <Typography varian='h4' className={classes.tokensList} align='center'>
          {/* <FormattedMessage id='tips_stake' /> */}
          <b className={classes.B}><FormattedMessage id='dToken'/></b>
          {/* <FormattedMessage id='tips_earn' /> */}
          {/* <b className={classes.B}><FormattedMessage id='tips_DF' /></b> */}
          {/* {rewardPool.tokens.length > 0 && "Supported Tokens: " + tokensList}
        {rewardPool.tokens.length == 0 && "No supported tokens currently"} */}
        </Typography>
        {
          <div className={classes.dTokenBtnBox}>
            {
              rewardPool.map(rp => (
                <div className={classes.dTokenBtn} key={rp.id} onClick={() => { if (rp.tokens.length > 0) { this.navigateStake(rp) } }}><b>{rp.tokens[0].symbol}</b></div>
              ))
            }
          </div>
        }

      </div>)
    } else {
      let tokensList = rewardPool.tokens.map((rp) => { return rp.symbol }).join(', ')
      // if (tokensList.length > 2) {
      //   tokensList = (tokensList + ' ...')
      // }

      return (<div className={classes.rewardPoolContainer} key={rewardPool.id} >
        {/* <div className={classes.svgTitle}><img src={rewardPool.icon} alt="" /></div> */}
        <Typography variant='h3' className={classes.poolName}>Uniswap{rewardPool.id}</Typography>
        <Typography variant='h5'><a className={classes.poolWebsite} href={rewardPool.link} target="_blank">{rewardPool.website}</a></Typography>
        <div className={classes.svgCenter}><img src={rewardPool.logo} alt="" /></div>
        <Typography varian='h4' className={classes.tokensList} align='center'>
          {/* <FormattedMessage id='tips_stake' /> */}
          {/* <b className={classes.B}><FormattedMessage id='dToken' /></b> */}
          <b className={classes.B}><FormattedMessage id={`DF_${rewardPool.tokens[0].type}`} /></b>
          {/* <FormattedMessage id='tips_earn' /> */}
          {/* <b className={classes.B}><FormattedMessage id='tips_DF' /></b> */}
          {/* {rewardPool.tokens.length > 0 && "Supported Tokens: " + tokensList}
        {rewardPool.tokens.length == 0 && "No supported tokens currently"} */}
        </Typography>
        <div className={classes.Btn} onClick={() => { if (rewardPool.tokens.length > 0) { this.navigateStake(rewardPool) } }}><b><FormattedMessage id='open' /></b></div>
      </div>)
    }
  }
  renderdTokenPool = (rewardPool) => {

    const { classes } = this.props

    let tokensList = rewardPool.tokens.map((rp) => { return rp.symbol }).join(', ')
    let dtokensList = rewardPool.tokens.map((rp) => { return rp.symbol }).join(', ')
    // if (tokensList.length > 2) {
    //   tokensList = (tokensList + ' ...')
    // }

    return (<div className={classes.rewardPoolContainer} key={rewardPool.id} >
      {/* <div className={classes.svgTitle}><img src={rewardPool.icon} alt="" /></div> */}
      <Typography variant='h3' className={classes.poolName}>{rewardPool.id}</Typography>
      <Typography variant='h5'><a className={classes.poolWebsite} href={rewardPool.link} target="_blank">{rewardPool.website}</a></Typography>
      <div className={classes.svgCenter}><img src={rewardPool.logo} alt="" /></div>
      <Typography varian='h4' className={classes.tokensList} align='center'>
        {/* <FormattedMessage id='tips_stake' />
        <b className={classes.B}>{tokensList}</b>
        <FormattedMessage id='tips_earn' /> */}
        <b className={classes.B}><FormattedMessage id='tips_DF' /></b>
        {/* {rewardPool.tokens.length > 0 && "Supported Tokens: " + tokensList}
        {rewardPool.tokens.length == 0 && "No supported tokens currently"} */}
      </Typography>
      <div className={classes.Btn} onClick={() => { if (rewardPool.tokens.length > 0) { this.navigateStake(rewardPool) } }}><b><FormattedMessage id='open' /></b></div>
    </div>)
  }

  navigateStake = (rewardPool) => {
    store.setStore({ currentPool: rewardPool })
    const currentPoolId = rewardPool.urlParam
    const path = {
      pathname: `/dapp/${currentPoolId}`
      // state: { currentPool: rewardPool },
    }
    this.props.history.push(path)

  }

}

export default withRouter(withStyles(styles)(RewardPools));
