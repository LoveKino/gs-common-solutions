'use strict';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // eslint-disable-line
import AppBar from 'material-ui/AppBar'; // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // eslint-disable-line
import FlatButton from 'material-ui/FlatButton'; // eslint-disable-line
import '../style/index.css';

// material UI: http://www.material-ui.com
// react router: https://reacttraining.com/react-router

class Page1 extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (<MuiThemeProvider>
            <div>
                This is page 1
                <Link to="/page2">
                    <FlatButton label="to page2" />{' '}
                </Link>
            </div>
        </MuiThemeProvider>);
    }
}

class Page2 extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return ( <div >
            This is page 2
        </div>);
    }
}

/**
 * config router
 */
const Main = () => ( // eslint-disable-line
    <Router>
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="react material demo"
                        onLeftIconButtonClick={() => location.href = '/'}
                        onTitleClick={() => location.href = '/'}
                        iconElementRight={<div />}
                    />
                </div>
            </MuiThemeProvider>

            <Route exact path="/" component={Page1} />
            <Route path="/page2" component={Page2} />
        </div>
    </Router>
);

ReactDOM.render(<Main />, document.getElementById('pager'));
