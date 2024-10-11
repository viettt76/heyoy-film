import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '~/App';
import UserProvider from './Context/UserProvider';

import '~/styles/index.scss';
import 'normalize.css';
import '~/styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
