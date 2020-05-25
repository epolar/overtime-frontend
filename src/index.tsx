import React from 'react';
import ReactDOM from 'react-dom';
import Overtime from './components/overtime/overtime';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Manage from './components/manage/manage';

// ========================================

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/manage">
                    <Manage />
                </Route>
                <Route path="/">
                    <Overtime />
                </Route>
            </Switch>
        </Router>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
