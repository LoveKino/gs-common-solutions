'use strict';

import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // eslint-disable-line
import '../style/index.css';

// react router: https://reacttraining.com/react-router

class Page1 extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return ( <div >
            This is page 1
            <Link to="/page2">
                to page 2
            </Link>
        </div>);
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

const Main = () => (
    <Router>
        <div>
            <div>
                react-base demo
            </div>
            <Route exact path="/" component={Page1} />
            <Route path="/page2" component={Page2} />
        </div>
    </Router>
);

ReactDOM.render(<Main />, document.getElementById('pager'));
