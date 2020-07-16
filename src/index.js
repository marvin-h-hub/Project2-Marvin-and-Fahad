import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import {Pane} from 'evergreen-ui';
import {Stocks} from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Pane background={'#F1FBFC'} height={'100vh'}>
      <Stocks/>
    </Pane>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
