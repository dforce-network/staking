import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  Switch,
  Route
} from "react-router-dom";
import IpfsRouter from 'ipfs-react-router'

import './i18n';
import { IntlProvider } from 'react-intl';
import en_US from './language/en_US';
import zh_CN from './language/zh_CN';
import interestTheme from './theme';
import ScrollToTop from './components/ScrollToTop'
import Stake from './components/stake';
import RewardsPools from './components/rewardPools';

class App extends Component {
  state = {
    account: null,
    headerValue: null,
    cur_language: navigator.language === 'zh-CN' ? '中文' : 'English',
  };

  setHeaderValue = (newValue) => {
    this.setState({ headerValue: newValue })
  };
  setLanguage = (cur_language) => {
    this.setState({ cur_language })
  }

  render() {

    return (
      <IntlProvider locale={'en'} messages={this.state.cur_language === '中文' ? zh_CN : en_US} >
        <MuiThemeProvider theme={createMuiTheme(interestTheme)}>
          <CssBaseline />
          <IpfsRouter>
            <ScrollToTop>
              <Switch>
                <Route exact path="/">
                  <RewardsPools cur_language={this.state.cur_language} setLanguage={this.setLanguage} />
                </Route>
                <Route path="/dapp">
                  <Stake cur_language={this.state.cur_language} setLanguage={this.setLanguage} />
                </Route>
              </Switch>
            </ScrollToTop>
          </IpfsRouter>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }
}

export default App;
