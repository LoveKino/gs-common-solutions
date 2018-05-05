'use strict';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { BrowserRouter as BrowserRouter, Router, Route, Link } from 'react-router-dom'; // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // eslint-disable-line

import FilterPage from './page/filterPage'; // eslint-disable-line
import SettingPage from './page/settingPage'; // eslint-disable-line

import PageLoader from './view/pageLoader'; // eslint-disable-line
import SideBar from './view/sidebar'; // eslint-disable-line
import AppBar from './view/appbar'; // eslint-disable-line

import {storeWithLoading} from './util/loadingStore';
import ErrorRetryView from './view/errorRetryView'; // eslint-disable-line

import Store from './store';

import '../style/index.css';

// material UI: http://www.material-ui.com
// react router: https://reacttraining.com/react-router

/**
 * config router
 */
class Main extends React.Component { // eslint-disable-line
    constructor() {
        super();
        this.state = {
            group: 0,
            groups: ['User Group', 'Product Group'],

            country: 0,
            countryList: [],

            channelCategory: [],

            pageError: null
        };
    }

    componentDidMount() {
        const self = this;
        storeWithLoading(Store.combo([Store.getUserInfo, Store.getChannelCategory]), self)().then(([user, channelCategory]) => {
            self.setState({
                countryList: user.access,
                channelCategory
            });
        });
    }

    updateUserData() {
        const self = this;
        return storeWithLoading(Store.getUserInfo, self)().then((user) => {
            self.setState({
                countryList: user.access
            });
        });
    }

    handleCountryChange(index) {
        this.setState({
            country: index
        });
    }

    handleGroupChange(index) {
        this.setState({
            group: index
        });
    }

    render() {
        return (<BrowserRouter>
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar/>
                        <SideBar
                            country={this.state.country}
                            countryList={this.state.countryList}
                            onChangeCountry={(index)=>this.handleCountryChange(index)}

                            group={this.state.group}
                            groups={this.state.groups}
                            onChangeGroup={(index)=>this.handleGroupChange(index)}/>
                        {this.state.showPageLoader?<PageLoader/> :null}
                        <ErrorRetryView onRetry={this.updateUserData.bind(this)} error={this.state.pageError} onClose={()=>this.setState({pageError: null})}/>
                    </div>
                </MuiThemeProvider>

                <Route exact path="/" component={()=><div style={{marginLeft:256, marginTop:64}}>
                    <FilterPage
                        channelCategory={this.state.channelCategory}
                        country={this.state.country}
                        countryList={this.state.countryList}/>
                </div>} />
                <Route exact path="/setting" component={()=><div style={{marginLeft:256, marginTop:64}}><SettingPage/></div>} />
            </div>
        </BrowserRouter>);
    }
}

ReactDOM.render(<Main />, document.getElementById('pager'));
