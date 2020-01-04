import React, {Component}from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import store from './store'
import Siteheader from './components/layout/Siteheader'
import Searchbar from './components/Searchbar'
import Menubar from './components/Menubar'
import Sitefooter from './components/layout/Sitefooter'
import './utils/axios.js';

import Homepage from './components/layout/pages/Homepage'
import Deptpage from './components/layout/pages/Departmentpage'
import Catpage from './components/layout/pages/Categorypage'
import Searchpage from './components/layout/pages/Searchpage'
import Productpage from './components/layout/pages/Productpage'
import AlertBar from './components/Alertbar'
import Cartpage from './components/layout/pages/Cartpage'
import Checkoutpage from './components/layout/pages/Checkoutpage'
import Review from './components/layout/pages/Reviewpage'
import OrderConfirmation from './components/layout/pages/OrderConfirmationpage' 

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="container-fluid">
              <header>
                <Siteheader />
                <Searchbar />
                <Menubar />
              </header>
              <AlertBar/>
              <article style={{ maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
                <Route exact  path="/" component={Homepage} />
                <Route exact  path="/d/:department" component={Deptpage} />
                <Route exact  path="/c/:department/:category" component={Catpage} />
                <Route exact  path="/s/:searchterm" component={Searchpage} />
                <Route exact  path="/p/:name" component={Productpage} />
                <Route exact  path="/cart" component={Cartpage} />
                <Route exact  path="/checkout" component={Checkoutpage}/>
                <Route exact  path="/review" component={Review}/>
                <Route exact  path="/oc" component={OrderConfirmation}/>
              </article>
              <Sitefooter />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
