import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {cartTotal, loadCart} from '../action/commonAction'

class SearchBar extends Component {
    constructor(props){
      super(props)
      this.state = {searchTerm : "",errors : {}, cart:0}
      this.onChange = this.onChange.bind(this);
      this.loadCart = this.loadCart.bind(this);
    }

    loadCart(e) {
      this.props.history.push('/cart')
    }

    onChange(e) {
      this.setState({ [e.target.name] : e.target.value});
    }

    componentWillMount = ()=> {
      const search = this.props.location.search; // could be '?foo=bar'
      const params = new URLSearchParams(search);
      const searchTerm = params.get('searchTerm'); // bar
      if (searchTerm != null){
        this.setState({['searchTerm']:searchTerm})
      }
      this._asyncRequest = cartTotal().then(
        externalData => {
          this._asyncRequest = null;
          //Update cart count.
          var totalItem=0
          externalData.data.cart.forEach(element => {
            totalItem = totalItem + element.quantity
          });
          this.setState({cart:totalItem});
        }
      );
    }

    componentWillUnmount() {
      if (this._asyncRequest) {
        this._asyncRequest.cancel();
      }
    }

    componentWillReceiveProps = nextProps => {
      if(nextProps.common.totalItem != null){
        this.setState({cart:nextProps.common.totalItem});
      }
    }

    render(){
      return (
        <div className="row justify-content-md-center " style={{padding:'10px', background:'#28B463', boxShadow:'0 4px 8px 0 rgba(28,32,36,.2)'}}>
          <div className="col col-lg-2">
              Site Logo
          </div>
          <div className="col-md-auto col-lg-8">
            <form method='get' action='/s/seoname'>
              <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search for..."  name="searchTerm"
                  value={this.state.searchTerm} onChange={this.onChange} />
                  <span className="input-group-btn" style={{paddingLeft:'10px'}}>
                    <button className="btn btn-default" type="submit" style={{borderColor:'black'}} >Go!</button>
                  </span>
              </div>
            </form>  
          </div>
          <div className="col col-lg-2">
              <span className="input-group-btn" style={{paddingLeft:'10px'}}>
                <button className="btn btn-default" type="button" style={{borderColor:'black'}} onClick={this.loadCart}>Cart - {this.state.cart} Items</button>
              </span>
          </div>  
        </div>
      )
    }
  }

  function mapStateToProps(state){
    //console.log(state)
    return {
      common:state.common,
    };
  }

  export default withRouter(connect(mapStateToProps, {})(SearchBar));