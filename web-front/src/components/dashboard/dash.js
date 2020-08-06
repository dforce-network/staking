import React, { Component } from 'react';
import DAI_logo from './images/DAI.svg';

import './dash.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => { }


    render() {
        return (
            <>
                <div className='title'>dForce (DF) Liquidity Mining</div>
                <div className='title-plus'>Participate in dForce liquidity mining by staking and earn DF rewards</div>

                <div className='table-wrap'>
                    <table>
                        <h3>Staking Pool</h3>

                        <tr className='table-head'>
                            <td>Pool</td>
                            <td>Staking Size</td>
                            <td>Total DF Distribution</td>
                            <td>Remaining DF</td>
                            <td>Available to Claim</td>
                        </tr>

                        <tr>
                            <td>
                                <img src={DAI_logo} alt='' />
                                <span>dUSDT</span>
                            </td>
                            <td>2,567,318.62</td>
                            <td>25,800</td>
                            <td>5,800</td>
                            <td>800.34</td>
                        </tr>

                        <tr>
                            <td>
                                <img src={DAI_logo} alt='' />
                                <span>dUSDC</span>
                            </td>
                            <td>2,567,318.62</td>
                            <td>25,800</td>
                            <td>5,800</td>
                            <td>800.34</td>
                        </tr>

                        <tr>
                            <td>
                                <img src={DAI_logo} alt='' />
                                <span>dDAI</span>
                            </td>
                            <td>2,567,318.62</td>
                            <td>25,800</td>
                            <td>5,800</td>
                            <td>800.34</td>
                        </tr>

                        <tr>
                            <td>
                                <img src={DAI_logo} alt='' />
                                <span>GOLDx/USDx</span>
                            </td>
                            <td>2,567,318.62</td>
                            <td>25,800</td>
                            <td>5,800</td>
                            <td>800.34</td>
                        </tr>

                        <tr>
                            <td>
                                <img src={DAI_logo} alt='' />
                                <span>DF/USDx</span>
                            </td>
                            <td>2,567,318.62</td>
                            <td>25,800</td>
                            <td>5,800</td>
                            <td>800.34</td>
                        </tr>
                    </table>
                </div>
            </>
        )
    }
}
export default Dashboard;
