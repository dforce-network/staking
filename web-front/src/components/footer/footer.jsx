import React, { Fragment } from 'react';
import '../../App.scss';
import '../header/header.scss';
import 'antd/dist/antd.css';
// add i18n.
import { IntlProvider, FormattedMessage } from 'react-intl';
import en_US from '../../language/en_US';
import zh_CN from '../../language/zh_CN';

import Twitter from '../../assets/footer/twitter.svg';
import Telegram from '../../assets/footer/telegram.svg';
import Medium from '../../assets/footer/medium.svg';
import Reddit from '../../assets/footer/Reddit.svg';
import Discord from '../../assets/footer/Discord.svg';
import LinkedIn from '../../assets/footer/LinkedIn.svg';
import Youtube from '../../assets/footer/Youtube.svg';
import erweima from '../../assets/footer/erweima.png';
import weixin from '../../assets/footer/weixin.svg';
import arrow_u from '../../assets/footer/up.svg';

import img_is_open from '../../assets/footer/img_is_open.svg';
import { Menu, Dropdown, Drawer, Collapse, Modal } from 'antd';


export default class App extends React.Component {
    constructor(porps) {
        super(porps);

        this.state = {
            // cur_language: props.cur_language === 'zh-CN' ? '中文' : 'English',
            show_left_more_token: false,
            showonly: false,
            meun1: true,
            meun2: true,
            meun3: true,
            is_open: true
        }

    }

    clear_open = (e) => {
        // console.log(e);
        // console.log(e.currentTarget);
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
            <Fragment>
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
                            System Maintain, Come back Soon...
            </div>
                        <div className='popup-is-open-text'>
                            系统维护，敬请期待...
            </div>
                    </div>
                </Modal>
                <div className="App" onClick={(e) => { this.clear_open(e) }}>

                    {/* foot */}
                    <div className="foot">
                        <div className="foot-item">
                            <div className="foot-item-title">
                                <FormattedMessage id='Resource' />
                            </div>
                            <div className="foot-item-content">
                                <a href='https://github.com/dforce-network/staking' target='_blank' rel="noopener noreferrer">
                                    GitHub
                </a>
                            </div>
                            <div className="foot-item-content">
                                <a
                                    href={
                                        this.props.cur_language === '中文' ?
                                            'https://github.com/dforce-network/staking'
                                            :
                                            'https://github.com/dforce-network/staking'
                                    }
                                    target='_blank'
                                    rel="noopener noreferrer"
                                >
                                    FAQ
                </a>
                            </div>
                        </div>

                        <div className="foot-item">
                            <div className="foot-item-title">
                                <FormattedMessage id='Community' />
                            </div>
                            <div className="foot-item-content icom-a">
                                <a href='https://twitter.com/dForcenet' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={Twitter} />
                                </a>
                                <a href='https://t.me/dforcenet' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={Telegram} />
                                </a>
                                <a href='https://medium.com/dforcenet' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={Medium} />
                                </a>
                                <a href='https://www.reddit.com/r/dForceNetwork' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={Reddit} />
                                </a>
                                <a href='https://discord.gg/Gbtd3MR' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={Discord} />
                                </a>
                                <a href='https://www.linkedin.com/company/dforce-network' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={LinkedIn} />
                                </a>
                                <a href='https://www.youtube.com/channel/UCM6Vgoc-BhFGG11ZndUr6Ow' target='_blank' rel="noopener noreferrer">
                                    <img alt='' src={Youtube} />
                                </a>
                                {
                                    this.props.cur_language === '中文' &&
                                    <span className='weixin-img-wrap'>
                                        <img alt='' src={weixin} />
                                        <img alt='' className='weixin-img' src={erweima} />
                                    </span>
                                }
                            </div>

                            <div className='footer-right-fixed'>
                                <div className='fixed1'>
                                    {
                                        this.props.cur_language === '中文' ? '中文简体' : 'English'
                                    }
                                </div>
                                <span className='fixed-img'>
                                    <img alt='' src={arrow_u} />
                                </span>
                                <div className='fixed2'>
                                    <ul>
                                        <li onClick={() => { this.props.setLanguage('中文') }}>{'中文简体'}</li>
                                        <li onClick={() => { this.props.setLanguage('English') }}>{'English'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="foot-item padding-left20">
                            <div className="foot-item-title">
                                <FormattedMessage id='Contract_US' />
                            </div>
                            <div className="foot-item-content">
                                support@dforce.network
              </div>
                            <div className="foot-item-content">
                                bd@dforce.network
              </div>
                            <div className="foot-item-content">
                                tech@dforce.network
              </div>
                        </div>
                        <div className="clear"></div>
                    </div>


                </div>
            </Fragment >
        )
    }
}
