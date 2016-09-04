import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Link, Router, Route, hashHistory} from 'react-router';
import {createStore, combineReducers} from 'redux'

const div = document.createElement('div');
document.body.appendChild(div);

function configReducer(state = { username: 'toto' }, action) {
    switch (action.type) {
        case 'CONFIG_SET_USERNAME':
            return Object.assign({}, state, {
                username: action.username
            });
        default:
            return state;
    }
}

const mainReducer = combineReducers({ config: configReducer });

const store = createStore(mainReducer, window.devToolsExtension && window.devToolsExtension());

const Index = ({children}) => (
    <div>
        <h1>My React Playground App</h1>
        <ul>
            <li>
                <Link to="/">Index</Link>
            </li>
            <li>
                <Link to="/conf1">First config page</Link>
            </li>
            <li>
                <Link to="/conf2">Second config page</Link>
            </li>
        </ul>
        {children}
    </div>
);

const Config1 = () => {
    return <div>
        <h2>Config 1</h2>
        <input type="text" value={store.getState().config.username} onChange={(ev) => store.dispatch({ type: 'CONFIG_SET_USERNAME', username: ev.target.value }) }/>
        <div>{store.getState().config.username}</div>
    </div>
};

const Config2 = () => {
    return <div>
        <h2>Config 2</h2>
        <input type="text" value={store.getState().config.username} onChange={(ev) => store.dispatch({ type: 'CONFIG_SET_USERNAME', username: ev.target.value }) }/>
        <div>{store.getState().config.username}</div>
    </div>
};

const router = (
    <Router history={hashHistory}>
        <Route path="/" component={Index}>
            <Route path="conf1" component={Config1} />
            <Route path="conf2" component={Config2} />
        </Route>
    </Router>
);

class AppComponent extends React.Component {

    render() {
        return router;  // Si je mets le router directement ici au lieu de la ligne 52, j'ai l'erreur "Warning: [react-router] You cannot change <Router routes>; it will be ignored"
    }
}

const render = () => ReactDOM.render(<AppComponent />, div);
store.subscribe(render);

render();
