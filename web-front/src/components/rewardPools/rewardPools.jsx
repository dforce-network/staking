import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card
} from '@material-ui/core';
import { withNamespaces } from 'react-i18next';
// import svgTitle1 from '../../assets/img1.svg'
// import svgTitle2 from '../../assets/img2.svg'
// import svgCenter1 from '../../assets/logo2.svg'
// import svgCenter2 from '../../assets/logo2.svg'
import UnlockModal from '../unlock/unlockModal.jsx'
import Store from "../../stores";
import { colors } from '../../theme'

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '922px',
    // width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '0 auto 50px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: '0 12px 35px'
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
    justifyContent: 'center',
    paddingTop: '20px',
    flexWrap: 'wrap'
  },
  rewardPoolContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '432px',
    padding: '30px 0',
    borderRadius: '6px',
    boxShadow: '0px 0px 35px 0px rgba(94,85,126,0.15)',
    background: colors.white,
    marginRight: '9px',
    [theme.breakpoints.down('md')]: {
      margin: '0 0 12px 0',
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
  title: {
    // width: '100%',
    color: '#434976',
    fontSize: '36px',
    minWidth: '100%',
    textAlign: 'left',
    margin: '42px auto 36px 30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      margin: '40px auto 25px'
    }
  },
  poolName: {
    height: '25px',
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'rgba(67,73,118,1)',
    lineHeight: '25px'
  },
  tokensList: {
    color: '#A4A7BE',
    marginBottom: '30px',
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
  poolWebsite: {
    height: '19px',
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(164,167,190,1)',
    lineHeight: '19px'
  },
  svgCenter: {
    width: '150px',
    height: '80px',
    margin: '30px auto 34px',
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
    super()

    const account = store.getStore('account')
    const rewardPools = store.getStore('rewardPools')

    this.state = {
      rewardPools: rewardPools,
      loading: !(account && rewardPools),
      account: account
    }

    // dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  }

  // componentWillMount() {
  //   emitter.on(CONFIGURE_RETURNED, this.configureReturned);
  //   emitter.on(GET_BALANCES_RETURNED, this.balancesReturned);
  // }

  // componentWillUnmount() {
  //   emitter.removeListener(CONFIGURE_RETURNED, this.configureReturned);
  //   emitter.removeListener(GET_BALANCES_RETURNED, this.balancesReturned);
  // };

  // balancesReturned = () => {
  //   const rewardPools = store.getStore('rewardPools')
  //   this.setState({ rewardPools: rewardPools })
  // }

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

    // var address = null;
    // if (account.address) {
    //   address = account.address.substring(0, 6) + '...' + account.address.substring(account.address.length - 4, account.address.length)
    // }

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
        <div className={classes.rewardPools}>
          <Typography variant={'h3'} className={classes.title} noWrap>Which pool would you like to stake?</Typography>
          {
            this.renderRewards()
          }
        </div>
        {/* {modalOpen && this.renderModal()} */}
      </div>
    )
  }

  renderRewards = () => {
    const { rewardPools } = this.state

    return rewardPools.map((rewardPool) => {
      return this.renderRewardPool(rewardPool)
    })
  }

  renderRewardPool = (rewardPool) => {

    const { classes } = this.props

    let tokensList = rewardPool.tokens.map((rp) => { return rp.symbol }).join(', ')
    // if (tokensList.length > 2) {
    //   tokensList = (tokensList + ' ...')
    // }

    return (<div className={classes.rewardPoolContainer} key={rewardPool.id} >
      <div className={classes.svgTitle}><img src={rewardPool.icon} alt="" /></div>
      <Typography variant='h3' className={classes.poolName}>{rewardPool.id}</Typography>
      <Typography variant='h5'><a className={classes.poolWebsite} href={rewardPool.link} target="_blank">{rewardPool.website}</a></Typography>
      <div className={classes.svgCenter}><img src={rewardPool.logo} alt="" /></div>
      <Typography varian='h4' className={classes.tokensList} align='center'>
        Stake<b className={classes.B}>{tokensList}</b>to earn<b className={classes.B}>DF</b>
        {/* {rewardPool.tokens.length > 0 && "Supported Tokens: " + tokensList}
        {rewardPool.tokens.length == 0 && "No supported tokens currently"} */}
      </Typography>
      <div className={classes.Btn} onClick={() => { if (rewardPool.tokens.length > 0) { this.navigateStake(rewardPool) } }}>Open</div>
    </div>)
  }

  navigateStake = (rewardPool) => {
    store.setStore({ currentPool: rewardPool })
    const path = {
      pathname: '/stake',
      state: { currentPool: rewardPool },
    }
    // this.props.history.push('/stake')
    this.props.history.push(path)

  }

  // renderModal = () => {
  //   return (
  //     <UnlockModal closeModal={this.closeModal} modalOpen={this.state.modalOpen} />
  //   )
  // }

  // overlayClicked = () => {
  //   this.setState({ modalOpen: true })
  // }

  // closeModal = () => {
  //   this.setState({ modalOpen: false })
  // }

}

export default withRouter(withStyles(styles)(RewardPools));
