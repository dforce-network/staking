import React from 'react';
import '../../App.scss';
import './header.scss';
import 'antd/dist/antd.css';
import logo_xswap from '../../assets/header/logo-dforce.svg';
import close from '../../assets/header/close.svg';
import close_new from '../../assets/header/close-new.svg';
// add i18n.
import { IntlProvider, FormattedMessage } from 'react-intl';
import en_US from '../../language/en_US';
import zh_CN from '../../language/zh_CN';
import arrow_u from '../../assets/header/up.svg';

import arrow_d from '../../assets/header/arrow_d.svg';
import img_is_open from '../../assets/header/img_is_open.svg';
import { Modal } from 'antd';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // cur_language: props.language === 'zh-CN' ? '中文' : 'English',
            show_left_more_token: false,
            showonly: false,
            meun1: true,
            meun2: true,
            meun3: true,
            is_open: true
        }
    }
    clear_open = (e) => {
        if (this.state.show_left_more_token) {
            this.setState({
                show_left_more_token: false
            })
        }
        if (this.state.show_right_more_token) {
            this.setState({
                show_right_more_token: false
            })
        }
    }
    render() {
        return (
            <IntlProvider locale={'en'} messages={this.props.cur_language === '中文' ? zh_CN : en_US} >
                <Modal
                    keyboard={false}
                    maskClosable={false}
                    visible={!this.state.is_open}
                    centered={true}
                    footer={false}
                    closable={false}
                >
                    <div className='popup-is-open'>
                        <img src={img_is_open} alt='' />
                        <div className='popup-is-open-text'>
                            Oracle System Maintain, Come back Soon...
            </div>
                        <div className='popup-is-open-text'>
                            Oracle系统维护，敬请期待...
            </div>
                    </div>
                </Modal>

                <div className={'header'}>
                    <a href={this.props.linkTo} className={'header__logo'}>
                        <img src={logo_xswap} alt="logo" />
                    </a>
                    <div className={'header__menu'}>
                        <div className={"dropDown"}>
                            <span className={'header__menu_item'}>
                                <label><FormattedMessage id='dForce_Stablecoin' /></label>
                                <img src={arrow_d} alt="down" />
                            </span>
                            <div className={'header__overlay'}>
                                <div className={"menuItem"}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://usdx.dforce.network/" className={'header__overlay_item'}>
                                        <span>USDx</span>
                                        <label>
                                            <FormattedMessage id='Portal' />
                                        </label>
                                    </a>
                                </div>
                                <div className={"menuItem"}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://markets.dforce.network/" className={'header__overlay_item'}>
                                        <span>
                                            <FormattedMessage id='Yield_Markets' />
                                        </span>
                                        <label>
                                            <FormattedMessage id='Yield_Markets_detail' />
                                        </label>
                                    </a>
                                </div>

                                <div className={"menuItem"}>
                                    <a target="_blank" rel="noopener noreferrer" href="https://goldx.dforce.network/" className={'header__overlay_item'}>
                                        <span>
                                            <FormattedMessage id='goldx' />
                                        </span>
                                        <label>
                                            <FormattedMessage id='goldx_detail' />
                                        </label>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={"dropDown"}>
                            <span className={'header__menu_item'}>
                                <label>
                                    <FormattedMessage id='Exchange_Market' />
                                </label>
                                <img src={arrow_d} alt="down" />
                            </span>
                            <div className={'header__overlay'}>
                                <div className={"menuItem"}>
                                    <a rel="noopener noreferrer" href="https://trade.dforce.network/" className={'header__overlay_item'}>
                                        <span>dForce Trade</span>
                                        <label>
                                            <FormattedMessage id='Instant_Swap_of_Stable_Assets' />
                                        </label>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={"dropDown"}>
                            <span className={'header__menu_item'}>
                                <label>
                                    <FormattedMessage id='Governance' />
                                </label>
                                <img src={arrow_d} alt="down" />
                            </span>
                            <div className={'header__overlay'}>
                                <div className={"menuItem"}>
                                    <a rel="noopener noreferrer" href="https://airdrop.dforce.network/" className={'header__overlay_item'}>
                                        <span>Airdrop</span>
                                        <label>
                                            <FormattedMessage id='DF_token_distribute_system' />
                                        </label>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {
                            this.props.address && this.props.show &&
                            <a
                                className={'header__menu_wallet'}
                            >
                                <div onClick={() => this.props.overlayClicked && this.props.overlayClicked()}>
                                    <i style={{ backgroundColor: this.state.net_type !== 'rinkeby' ? '#29B6AF' : '#e2bc73' }}></i>
                                    {this.props.address}
                                </div>
                            </a>
                        }
                        {
                            !this.props.address && this.props.show &&
                            <a className={'header__menu_wallet'} onClick={() => this.props.overlayClicked && this.props.overlayClicked()}>
                                <FormattedMessage id='connect' />
                            </a>
                        }
                    </div>
                </div>

                {/* mobile tips */}
                <div className={this.state.showonly ? 'mobile-only' : 'disn'}>
                    <div className='wrap-mob'>
                        <div className='only-left'>
                            <a href="https://dforce.network/" className={'header__logo'}>
                                <img src={logo_xswap} alt="logo" />
                            </a>
                        </div>
                        <div className='only-right'>
                            <img src={close_new} alt='' onClick={() => { this.setState({ showonly: false }) }} />
                        </div>
                        <div className='clear'></div>
                    </div>
                    <div className='only-kong'></div>

                    <h1 onClick={() => { this.setState({ meun1: !this.state.meun1 }) }}>
                        <FormattedMessage id='dForce_Stablecoin' />
                        <span>
                            <img src={this.state.meun1 ? arrow_u : arrow_d} />
                        </span>
                    </h1>
                    <div className={this.state.meun1 ? 'meun1' : 'only1px'}>
                        <div className='m-item'>
                            <a href='https://usdx.dforce.network/' target='_blank' rel="noopener noreferrer">
                                <span className='title1'>USDx</span>
                            </a>
                            <span className='details'>
                                <FormattedMessage id='Portal' />
                            </span>
                        </div>
                        <div className='m-item'>
                            <a href='https://markets.dforce.network/' target='_blank' rel="noopener noreferrer">
                                <span className='title1'>
                                    <FormattedMessage id='Yield_Markets' />
                                </span>
                            </a>
                            <span className='details'>
                                <FormattedMessage id='Yield_Markets_detail' />
                            </span>
                        </div>
                        <div className='m-item'>
                            <a href='https://goldx.dforce.network/' target='_blank' rel="noopener noreferrer">
                                <span className='title1'>
                                    <FormattedMessage id='goldx' />
                                </span>
                            </a>
                            <span className='details'>
                                <FormattedMessage id='goldx_detail' />
                            </span>
                        </div>
                    </div>


                    <h1 onClick={() => { this.setState({ meun3: !this.state.meun3 }) }}>
                        <FormattedMessage id='Exchange_Market' />
                        <span>
                            <img src={this.state.meun3 ? arrow_u : arrow_d} />
                        </span>
                    </h1>
                    <div className={this.state.meun3 ? 'meun1' : 'only1px'}>
                        <div className='m-item'>
                            <a href='https://trade.dforce.network/' rel="noopener noreferrer">
                                <span className='title1'>dForce Trade</span>
                            </a>
                            <span className='details'>
                                <FormattedMessage id='Instant_Swap_of_Stable_Assets' />
                            </span>
                        </div>
                    </div>


                    <h1 onClick={() => { this.setState({ meun2: !this.state.meun2 }) }}>
                        <FormattedMessage id='Governance' />
                        <span>
                            <img src={this.state.meun2 ? arrow_u : arrow_d} />
                        </span>
                    </h1>
                    <div className={this.state.meun2 ? 'meun1' : 'only1px'}>
                        <div className='m-item'>
                            <a href='https://airdrop.dforce.network/' rel="noopener noreferrer">
                                <span className='title1'>Airdrop</span>
                            </a>
                            <span className='details'>
                                <FormattedMessage id='DF_token_distribute_system' />
                            </span>
                        </div>
                    </div>

                </div>
                <div className="App" onClick={(e) => { this.clear_open(e) }}>

                    <div className='wrap-mob'>
                        <div className='only-left'>
                            <a href={this.props.linkTo} className={'header__logo'}>
                                <img src={logo_xswap} alt="logo" />
                            </a>
                        </div>
                        <div className='only-right'>
                            <img src={close} alt='' onClick={() => { this.setState({ showonly: true }) }} />
                        </div>
                        <div className='clear'></div>
                    </div></div>
            </IntlProvider >
        )
    }
}
