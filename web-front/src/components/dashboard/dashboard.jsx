import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Web3 from "web3";
import Header from "../header";
import Footer from "../footer";
import UnlockModal from "../unlock/unlockModal";
import Loader from "../loader";
import Store from "../../stores";
import backHome from "../../assets/backhome.svg";
import dUSDT_logo from "../../assets/logo-dUSDT.svg";
import dUSDC_logo from "../../assets/logo-dUSDC.svg";
import DAI_logo from "../../assets/logo-dDAI.svg";
import DF_logo from "../../assets/logo-DF.svg";
import GOLDx_logo from "../../assets/logo-DF.svg";
import "./dash.scss";
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from "../../constants";

import { injected } from "../../stores/connectors";

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

class DashBoard extends Component {
  constructor(props) {
    super(props);
    const account = store.getStore("account");
    const rewardPools = store.getStore("rewardPools");
    const svgLogo = {
      dUSDT: dUSDT_logo,
      dUSDC: dUSDC_logo,
      dDAI: DAI_logo,
      "DF/USDx": DF_logo,
      "DF/ETH": DF_logo,
      "GOLDx/USDx": GOLDx_logo,
    };
    const dashboardData = rewardPools.map((rp) => ({
      poolUrlParam: rp.id,
      rp,
      logo: svgLogo[rp.id],
      StakingSize: "...",
      TotalDFDistribution: "...",
      RemainingDF: "...",
      AvailableToClaim: "...",
      rewardsAvailable: "...",
    }));
    this.state = {
      rewardPools,
      loading: !account,
      account: account,
      modalOpen: false,
      dashboardData
    };
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        injected
          .activate()
          .then((a) => {
            store.setStore({
              account: { address: a.account },
              web3context: { library: { provider: a.provider } },
            });
            emitter.emit(CONNECTION_CONNECTED);
            console.log(a);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
      }
    });
  }
  componentDidMount() {
    // metamask networkChange
    if (window.ethereum && window.ethereum.on) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      window.ethereum.on("chainChanged", (_chainId) => {
        if (window.sessionStorage.getItem("chainId") !== _chainId) {
          window.sessionStorage.setItem("chainId", _chainId);
          window.location.reload();
        }
      });

      // metamask disConnect
      window.ethereum.on("disconnect", () => {
        console.log("disConnect");
      });
      // accountChange
      window.ethereum.on("accountsChanged", (accounts) => {
        const account = { address: accounts[0] };
        store.setStore("account", account);
        this.setState(() => ({
          account,
        }));
        if (window.sessionStorage.getItem("accounts") !== accounts[0] + "") {
          window.sessionStorage.setItem("accounts", accounts[0]);
          window.location.reload();
        }
      });
    }
    setTimeout(async () => {
      const { account } = this.state;
      //   console.log(account)
      if (
        !Object.getOwnPropertyNames(account).length ||
        account.address === undefined
      ) {
        this.setState(() => ({
          modalOpen: true,
        }));
      }
    }, 1000);
  }
  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(
      CONNECTION_DISCONNECTED,
      this.connectionDisconnected
    );
  }

  connectionConnected = async () => {
    const { dashboardData,account } = this.state;
    this.setState({ account: store.getStore("account") });
    this.setState(() => ({
      modalOpen: false,
    }));
    const web3 = new Web3(store.getStore("web3context").library.provider);
    let bn = web3.utils.toBN;
    const poolsContract = await Promise.all(
      dashboardData.map(
        (item) =>
          new web3.eth.Contract(
            item.rp.tokens[0].rewardsABI,
            item.rp.tokens[0].rewardsAddress
          )
      )
    );
    const ERCpoolsContract = await Promise.all(
      dashboardData.map(
        (item) =>
          new web3.eth.Contract(
            item.rp.tokens[0].abi,
            item.rp.tokens[0].address
          )
      )
    );
    const poolData = await Promise.all(
      poolsContract.map(async (pool, index) =>
        // await pool.methods.periodFinish().call()
        ({
          StakingSize: this.toStringDecimals(
            bn(
              await ERCpoolsContract[index].methods
                .balanceOf(dashboardData[index].rp.tokens[0].rewardsAddress)
                .call()
            ),
            dashboardData[index].rp.tokens[0].decimals,
            2
          ),
          TotalDFDistribution: this.toStringDecimals(
            bn(await pool.methods.rewardRate().call()).mul(
              bn(await pool.methods.DURATION().call())
            ),
            18,
            2
          ),
          RemainingDF:
            Number((await pool.methods.periodFinish().call())) >
            Math.floor(new Date().valueOf()/1000)
              ? this.toStringDecimals(
                  bn(await pool.methods.rewardRate().call()).mul(
                    bn((await pool.methods.periodFinish().call())).sub(
                      bn(Math.floor(new Date().valueOf()/1000))
                    )
                  ),
                  18,
                  2
                )
              : "0",
          rewardsAvailable: this.toStringDecimals(
            bn(
              await pool.methods
                .earned(this.state.account.address)
                .call()
            ),
            18,
            2
          ),
        })
      )
    );
    this.setState(
      () => ({
        dashboardData: this.merge_data(dashboardData, poolData),
      }),
      () => {
        setInterval(async () => {
          const poolData = await Promise.all(
            poolsContract.map(async (pool, index) =>
              // await pool.methods.periodFinish().call()
              ({
                StakingSize: this.toStringDecimals(
                  bn(
                    await ERCpoolsContract[index].methods
                      .balanceOf(
                        dashboardData[index].rp.tokens[0].rewardsAddress
                      )
                      .call()
                  ),
                  dashboardData[index].rp.tokens[0].decimals,
                  2
                ),
                TotalDFDistribution: this.toStringDecimals(
                  bn(await pool.methods.rewardRate().call()).mul(
                    bn(await pool.methods.DURATION().call())
                  ),
                  18,
                  2
                ),
                RemainingDF:
                  Number((await pool.methods.periodFinish().call())) >
                  Math.floor(new Date().valueOf()/1000)
                    ? this.toStringDecimals(
                        bn(await pool.methods.rewardRate().call()).mul(
                          bn(
                            (await pool.methods.periodFinish().call())
                          ).sub(bn(Math.floor(new Date().valueOf()/1000)))
                        ),
                        18,
                        2
                      )
                    : "0",
                rewardsAvailable: this.toStringDecimals(
                  bn(
                    await pool.methods
                      .earned(this.state.account.address)
                      .call()
                  ),
                  18,
                  2
                ),
              })
            )
          );
          this.setState(() => ({
            dashboardData: this.merge_data(dashboardData, poolData),
          }));
        },10000)
      }
    )
  }

  connectionDisconnected = () => {
    this.setState({ account: store.getStore("account") });
  };

  render() {
    const { account, modalOpen, rewardPools, loading } = this.state;
    var address = null;
    if (account.address) {
      address =
        account.address.substring(0, 6) +
        "..." +
        account.address.substring(
          account.address.length - 4,
          account.address.length
        );
    }
    if (!rewardPools) {
      return null;
    }
    return (
      <div className={"root"}>
        <Header
          show={true}
          address={address}
          overlayClicked={this.overlayClicked}
          cur_language={this.props.cur_language}
          linkTo={"/"}
        />
        <div
          className={"backWarp"}
          onClick={() => this.props.history.push("/")}
        >
          <div className={"back"}>
            <img src={backHome} alt="" />
            <span>Home</span>
          </div>
        </div>
        <div className={"dashboard"}>
          {/* {rewardPools.map((pool) => (
            <div
              onClick={() => {
                if (pool.tokens.length > 0) {
                  this.navigateDapp(pool);
                }
              }}
            >
              {pool.urlParam}
            </div>
          ))} */}
          <div className="title">dForce (DF) Liquidity Mining</div>
          <div className="title-plus">
            Participate in dForce liquidity mining by staking and earn DF
            rewards
          </div>
          <div className="table-wrap">
            <table>
              <thead className="table-head">
                <tr>
                  <td className={"tdH3"}>Staking Pool</td>
                </tr>
                <tr>
                  <td>Pool</td>
                  <td>Staking Size</td>
                  <td>Total DF Distribution</td>
                  <td>Remaining DF</td>
                  <td>Available to Claim</td>
                </tr>
              </thead>
              <tbody>
                {this.state.dashboardData.map((pool) => (
                  <tr
                    key={pool.rp.id}
                    onClick={() => {
                      if (pool.rp.tokens.length > 0) {
                        this.navigateDapp(pool.rp);
                      }
                    }}
                  >
                    <td>
                      <img src={pool.logo} alt="" />
                      <span>{pool.rp.id}</span>
                    </td>
                    <td>{this.formatNumber(pool.StakingSize)}</td>
                    <td>{pool.TotalDFDistribution === '...'?'...':this.formatNumber(Math.ceil(pool.TotalDFDistribution).toFixed(2))}</td>
                    {/* <td>{this.formatNumber(pool.TotalDFDistribution)==='...'?'...':Math.ceil(pool.TotalDFDistribution).toFixed(2)}</td> */}
                    <td>{this.formatNumber(pool.RemainingDF)}</td>
                    <td>{this.formatNumber(pool.rewardsAvailable)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {modalOpen && this.renderModal()}
        {loading && <Loader />}
        <Footer
          cur_language={this.props.cur_language}
          setLanguage={this.props.setLanguage}
        />
      </div>
    );
  }

  toStringDecimals = (numStr, decimals, decimalPlace = decimals) => {
    numStr = numStr.toLocaleString().replace(/,/g, "");
    decimals = decimals.toString();

    var str = Number(`1e+${decimals}`)
      .toLocaleString()
      .replace(/,/g, "")
      .slice(1);

    var res = (numStr.length > decimals
      ? numStr.slice(0, numStr.length - decimals) +
        "." +
        numStr.slice(numStr.length - decimals)
      : "0." + str.slice(0, str.length - numStr.length) + numStr
    ).replace(/(0+)$/g, ""); // res = res.slice(-1) == '.' ? res + '00' : res;

    if (decimalPlace == 0) return res.slice(0, res.indexOf("."));

    var length = res.indexOf(".") + 1 + decimalPlace;
    res = res
      .slice(0, length >= res.length ? res.length : length)
      .replace(/(0+)$/g, "");
    return res.slice(-1) == "." ? res + "00" : res;
  };

  merge_data = (tar_arr, assign_arr) => {
    const mergeArr = tar_arr.map((item, index) => {
      return Object.assign(item, assign_arr[index]);
    });
    return mergeArr;
  };

  formatNumber = (amount) => {
    let index = amount.indexOf(".");
    if (index === -1) {
      amount = Number(amount).toFixed(2);
    }
    let roundAmount = amount.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    let rindex = roundAmount.indexOf(".");
    return roundAmount.slice(0, rindex + 3);
  };

  navigateDapp = (rewardPool) => {
    store.setStore({ currentPool: rewardPool });
    const currentPoolId = rewardPool.urlParam;
    const path = {
      pathname: `/dapp/${currentPoolId}`,
    };
    this.props.history.push(path);
  };

  overlayClicked = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  renderModal = () => {
    return (
      <UnlockModal
        closeModal={this.closeModal}
        modalOpen={this.state.modalOpen}
      />
    );
  };
}

export default withRouter(DashBoard);
