import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css';
import BookInfo from './page/book-info'
import BookDetail from './page/book-detail'

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import App from './page/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/bookInfo" component={BookInfo} />
      <Route path="/bookDetail" component={BookDetail} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

