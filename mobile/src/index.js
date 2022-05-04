import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import App from './App';
import reducer from './reducer/reducer'
import { legacy_createStore as createStore} from 'redux'
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const store = createStore(reducer)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

defineCustomElements(window);