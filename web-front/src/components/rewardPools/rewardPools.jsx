import React, { Component,Fragment} from "react";
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
      minWidth:'calc(100% - 24px)',
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
  DFpoolDiv:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    '& a':{
      color:'rgba(67,73,118,1)',
      textDecoration:'underline',
      // display:'block',
      //   width:'10px',
      //   height:'10px',
      //   margin:'0 0 12px 14px',
      //   backgroundImage:'url('+require('../../assets/pool-link-icon.svg')+')',
      //   backgroundSize:'auto',
      //   backgroundRepeat:'no-repeat',
        '&:hover':{
          color:'#BA59FF'
          // backgroundImage:'url('+require('../../assets/pool-linked-icon.svg')+')',
        }
    },
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
    marginBottom: '10px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '8px',
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
  dTokenDataBox: {
    width: '250px',
    height: '35px',
    lineHeight: '35px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between;',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '280px',
      height: '25px',
      lineHeight: '25px',
      fontSize: '16px',
      borderRadius: '2px'
    }
  },
  dTokenData: {
    flex: '1',
    textAlign: 'center',
    color: '#1CCD95',
    marginRight: '5px',
    [theme.breakpoints.down('md')]: {
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
    position:'relative',
    height:'50px',
    overflow:'hidden',
    '&:hover':{
      paddingTop:'50px'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      borderRadius: '2px',
      height:'40px',
      '&:hover':{
        paddingTop:'40px'
      },
    }
  },
  open:{
    display:'block',
    width:'100%',
    height:'100%',
    marginTop:'-100px',
    [theme.breakpoints.down('md')]: {
      marginTop:'-80px',
    }
  },
  poolWebsiteH5:{
    height: '25px',
    lineHeight: '19px',
    marginBottom:'8px',
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
  },
  // poolAPY
  poolApy:{
    width:'874px',
    height:'auto',
    boxShadow:'0px 0px 35px 0px rgba(94,85,126,0.15)',
    borderradius:'6px',
    fontSize:'16px',
    fontWeight:'500',
    '& thead tr td':{
      color:'#7E8199'
    },
    '& tr':{
      // '& td':{
      //   width:'25%'
      // },
      lineHeight:'54px',
      '&:last-child':{
        borderBottom:'0'
      },
      '& td:first-child':{
        width:'18%',
        paddingLeft:'24px'
      },
      '& td:last-child':{
        color:'#0DA88B',
        paddingRight:'24px',
      }
    },
    
    [theme.breakpoints.down('md')]: {
      width:'calc(100% - 24px)',
      margin:'0 12px',
      fontSize:'12px',
      '& thead tr td':{
        padding:'8px 0 8px 8px',
        fontSize:'12px',
        lineHeight:'18px',
        whiteSpace:'nowrap'
      },
      '& tr':{
        lineHeight:'35px!important',
        '& td:first-child':{
          width:'30%!important',
          paddingLeft:'10px!important'
        },
      '& td:last-child':{
        paddingRight:'10px!important',
      }
      }
    }
  },
  noColor:{
    color:'#7E8199!important'
  },
  subHead:{
    color:'#434976',
    fontWeight:'bold',
    background:'rgba(208,209,221,0.2)',
    '& td:last-child':{
      color:'#434976!important'
    }
  },
  DFrow:{
    background:'rgba(208,209,221,0.2)',
    borderBottom:'1px solid #E5E6F2',
    '& td:first-child':{
      color:'#434976',
      fontWeight:'bold'
    }
  }
})
const store = Store.store

class RewardPools extends Component {

  constructor(props) {
    super(props)

    const account = store.getStore('account')
    const rewardPools = store.getStore('rewardPools')
    this.state = {
      rewardPools: rewardPools,
      loading: !(account && rewardPools),
      account: account,
      ROI:{
        'DF/ETH':0,
        "DF/USDx":0,
        "GOLDx/USDx":0,
        "dDAI": 0,
        "dUSDC": 0,
        "dUSDT": 0,
        },
      APY:{
        'DF/ETH':0,
        "DF/USDx":0,
        "GOLDx/USDx":0,
        "dDAI": 0,
        "dUSDC": 0,
        "dUSDT": 0,
      }
    }
    // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  }


  configureReturned = () => {
    this.setState({ loading: false })
  }
  componentDidMount(){
    // ROI http://192.168.1.26:5000/api/getRoi/   https://testapi.dforce.network/api/getRoi/
    this.state.rewardPools && fetch(`https://api.dforce.network/api/getRoi/`).then(response => response.json())
    .then(data => {
      this.setState(() => ({
        ROI: data,
      }),()=>{
        setInterval(()=>{
          fetch(`https://api.dforce.network/api/getRoi/`).then(response => response.json())
          .then(data=>{
            this.setState(() => ({
              ROI: data,
            }))
          })
          .catch(e => console.log("Oops, error", e))
        },10000)
      })
    })
    .catch(e => console.log("Oops, error", e))
    // APY
    this.state.rewardPools && fetch(`https://markets.dforce.network/api/v1/getApy/?net=main`).then(response => response.json())
    .then(data => {
      this.setState(() => ({
        APY: data,
      }),()=>{
        setInterval(() => {
          fetch(`https://markets.dforce.network/api/v1/getApy/?net=main`).then(response => response.json())
        .then(data => {
          this.setState(() => ({
            APY: data,
          }))
        })
        .catch(e => console.log("Oops, error", e))
        }, 10000);
      })
    })
    .catch(e => console.log("Oops, error", e))
  }
  render() {
    const { classes } = this.props;
    const {
      ROI,
      APY,
      rewardPools,
      modalOpen,
    } = this.state
    const dTokenPools = rewardPools.filter(rp=>rp.tokens[0].type === 'dToken')
    const GOLDxPools = rewardPools.filter(rp=>rp.tokens[0].type === 'GOLDx')
    const DFPools = rewardPools.filter(rp=>rp.tokens[0].type === 'DF')
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
        <table className={classes.poolApy}>
          <thead>
            <tr>
              <td align="left"><FormattedMessage id="Pool" /></td>
              <td align="right"><FormattedMessage id="MiningAPY" /></td>
              <td align="right"><FormattedMessage id="YieldingAPY" /></td>
              <td className={classes.noColor} align="right"><FormattedMessage id="CompoundAPY" /></td>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.subHead}><td colSpan="4"><FormattedMessage id='dToken_APY'/></td></tr>
            {
              dTokenPools.map(rp => (
                // this.formatAPYNumber(APY[rp.tokens[0].ROI['now_apy']])+'%'
                <tr key={rp.id}>
                  <td align="left">{rp.id}</td>
                  <td align="right">{ROI[rp.id] ? this.formatAPYNumber(ROI[rp.id]*100)+'%' : '...'}</td>
                  <td align="right">{APY[rp.id] ? APY[rp.id]["now_apy"]+'%' : '...'}</td>
                  <td align="right">{ROI[rp.id] && APY[rp.id] ? this.formatAPYNumber(this.formatAPYNumber(ROI[rp.id]*100) +  parseFloat(APY[rp.id]["now_apy"])) +'%': '...'}</td>
                </tr>
              ))
            }
            {
              GOLDxPools.map(rp => (
                // this.formatAPYNumber(APY[rp.tokens[0].ROI['now_apy']])+'%'
                <tr className={classes.DFrow} key={rp.id}>
                  <td align="left"><FormattedMessage id='GOLDx_APY'/></td>
                  <td align="right">{ROI[rp.id] ? this.formatAPYNumber(ROI[rp.id]*100)+'%' : '...'}</td>
                  <td align="right">0.00%</td>
                  <td align="right">{ROI[rp.id] ? this.formatAPYNumber(ROI[rp.id]*100)+'%' : '...'}</td>
                </tr>
              ))
            }
            <tr className={classes.subHead}><td colSpan="4"><FormattedMessage id='DF_APY'/></td></tr>
            {
              DFPools.map(rp => (
                // this.formatAPYNumber(APY[rp.tokens[0].ROI['now_apy']])+'%'
                <tr key={rp.id}>
                  <td align="left">{rp.id}</td>
                  <td align="right">{ROI[rp.id] ? this.formatAPYNumber(ROI[rp.id]*100)+'%' : '...'}</td>
                  <td align="right">0.00%</td>
                  <td align="right">{ROI[rp.id] ? this.formatAPYNumber(ROI[rp.id]*100)+'%' : '...'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Footer cur_language={this.props.cur_language} setLanguage={this.props.setLanguage} />
        {/* {modalOpen && this.renderModal()} */}
      </div>
    )
  }

  renderRewards = () => {
    const { rewardPools } = this.state

    // const dtoken = rewardPools.filter((item) => item.tokens[0].dToken)
    // const LP = rewardPools.filter((item) => !item.tokens[0].dToken)
    // const renderRewardPools = [ dtoken,...LP]

    const dTokenPools = rewardPools.filter(rp=>rp.tokens[0].type === 'dToken')
    const GOLDxPools = rewardPools.filter(rp=>rp.tokens[0].type === 'GOLDx')
    const DFPools = rewardPools.filter(rp=>rp.tokens[0].type === 'DF')

    const renderRewardPools = [ dTokenPools,...GOLDxPools,DFPools]

    return renderRewardPools.map((rewardPool) => {
      return this.renderRewardPool(rewardPool)
    })
  }

  renderRewardPool = (rewardPool) => {
    const {ROI} = this.state
    const { classes } = this.props
    let poolType
    if (Array.isArray(rewardPool)) {
      // dToken and DF
      rewardPool.map(item=>(
        poolType = item.tokens[0].type
      ))
      let tokensList = rewardPool.map(item => (
        item.tokens.map((rp) => { return rp.symbol }).join(', ')
      )).join('/')
      
      // dToekn JSX
      return poolType === 'dToken' ? (<div className={classes.rewardPoolContainer} key={"dToken"} >
        <Typography variant='h3' className={classes.poolName}>{tokensList}</Typography>
        <Typography variant='h5' className={classes.poolWebsiteH5}><a className={classes.poolWebsite} href={"https://markets.dforce.network/"} rel="noopener noreferrer" target="_blank">{"https://markets.dforce.network/"}</a></Typography>
        <div className={classes.svgCenter}><img src={dTokenPool} alt="" /></div>
        <Typography varian='h4' className={classes.tokensList} align='center'>
          <b className={classes.B}><FormattedMessage id='dToken'/></b>
        </Typography>
        {/* {
          <div className={classes.dTokenDataBox}>
            {
              rewardPool.map(rp => (
              <div className={classes.dTokenData} key={rp.id}>
                <b>
                  {ROI[rp.tokens[0].ROI] ? this.formatAPYNumber(ROI[rp.tokens[0].ROI]*100)+'%' : '...'}
                </b>
              </div>
              ))
            }
          </div>
        } */}
        {
          <div className={classes.dTokenBtnBox}>
            {
              rewardPool.map(rp => (
                <div className={classes.dTokenBtn} key={rp.id} onClick={() => { if (rp.tokens.length > 0) { this.navigateStake(rp) } }}><b>{rp.tokens[0].symbol}</b><b className={classes.open}><FormattedMessage id='open' /></b></div>
              ))
            }
          </div>
        }

      </div>)
      //DF JSX
      :(<div className={classes.rewardPoolContainer} key={"DF"} >
        {
          rewardPool.map(rp=>(
            <div className={classes.DFpoolDiv} key={rp.id}>
              <Typography variant='h3' className={classes.poolName}><a href={rp.link} rel="noopener noreferrer" target="_blank">Uniswap&nbsp;{rp.id}</a></Typography>
              {/* <a className={classes.linkA} href={rp.link} rel="noopener noreferrer" target="_blank"></a> */}
            </div>
          ))
        }
        <div className={classes.svgCenter}><img src={rewardPool[0].logo} alt="" /></div>
        <Typography varian='h4' className={classes.tokensList} align='center'>
          <b className={classes.B}><FormattedMessage id='DF_DF'/></b>
        </Typography>
        {
          <div className={classes.dTokenBtnBox}>
            {
              rewardPool.map(rp => (
                <div className={classes.dTokenBtn} key={rp.id} onClick={() => { if (rp.tokens.length > 0) { this.navigateStake(rp) } }}><b>{rp.id}</b><b className={classes.open}><FormattedMessage id='open' /></b></div>
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
        <Typography variant='h3' className={classes.poolName}>Uniswap&nbsp;{rewardPool.id}</Typography>
        <Typography variant='h5' className={classes.poolWebsiteH5}><a className={classes.poolWebsite} href={rewardPool.link} target="_blank">{rewardPool.website}</a></Typography>
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
          {/* <div className={classes.dTokenDataBox}>
            {
              <div className={classes.dTokenData}>
                <b>
                {ROI[rewardPool.tokens[0].ROI] ? this.formatAPYNumber(ROI[rewardPool.tokens[0].ROI]*100)+'%' : '...'}
                </b>
              </div>
            }
          </div> */}
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

  formatAPYNumber = (num,floatPlace=2)=>{
    const m = Math.pow(10,floatPlace);
    return Math.floor(num*m)/m;
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
