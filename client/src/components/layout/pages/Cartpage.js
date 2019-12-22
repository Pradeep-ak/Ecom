import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadCartPage, updateCart, removeCartItem } from '../../../action/commonAction'
import Utils from '../../../utils/utils'


const PriceInfo = (data) => {
    return <div style={{display:'inline-block', verticalAlign:'top', float:'right', minWidth:'300px'}}>
        <span>
            ${new Utils().roundToTwo(data.priceInfo.eachItemPrice)} Each<br/>
            Total Amount: ${new Utils().roundToTwo(data.priceInfo.totalItemPrice)}<br/>
            {data.priceInfo.totalSaving===0?'':'Saving : $'+ new Utils().roundToTwo(data.priceInfo.totalSaving)}<br/>
            <b>{data.priceInfo.priceType==='ORIGINAL'?'':data.priceInfo.priceType}</b>
        </span>
    </div>
}

const Quantity = (data) => {
    var optionHtml = [...Array(50).keys()].map((ele,k)=>{
        if(ele==0){
            return
        }
        return <option key={k} value={ele}>{ele}</option>
    })
    return <div style={{display:'inline-block', verticalAlign:'middle', float:'right', minWidth:'300px'}}>
        <label htmlFor="exampleFormControlSelect1" style={{margin:'0px 10px 0px 0px', textTransform: "capitalize"}}>Quantity : </label>
        <select className="form-control" id="exampleFormControlSelect1" style={{width:'50%', display:'inline'}} name={data.id} onChange={data.onselect} value={data.quantity}>
            {optionHtml}
        </select>
        <br/><br/>
        <div style={{textAlign:'center'}}>
            <input type="button" value="Remove" name={data.id} onClick={data.removeItem}/>
        </div>
    </div>
}


class Cartpage extends Component {

    constructor(props){
        super(props)
        this.updateCart = this.updateCart.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.loadCheckout = this.loadCheckout.bind(this)
        this.state = {            
        }
    }

    loadCheckout = (e) => {
        this.props.history.push('/checkout')
    }

    removeItem = (e) => {
        this.props.removeCartItem(e.target.name)
    }
    
    updateCart = (e) => {
        var skuUpdated = e.target.name
        var updatedQuantity = e.target.value
        this.props.updateCart(skuUpdated, updatedQuantity)
    }

    componentDidMount = ()=> {
        this._asyncRequest = loadCartPage(this.props.location).then(
            externalData => {
                this._asyncRequest = null;
                this.setState(externalData.data);
            }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.common.type === 'cart_details'){
            this.setState(nextProps.common.cart);
        }
    }

     render() {
        var isCartEmpty = Object.keys(this.state).length > 0 && this.state.ItemList && this.state.ItemList.length > 0;
        console.log('isCartEmpty = ' + isCartEmpty)
       return(
           <div>
                {isCartEmpty === false && <div>
                    <br/><br/><br/><br/><br/>
                    <h3>Your Cart is Empty, Please continue Shopping <a href="/">Here</a></h3>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>}
                {isCartEmpty === true && <div>
                    <br/><br/><br/>
                        <ul className="list-unstyled">
                            {this.state.ItemList.map((e, i)=>{
                                return <li className="media" style={{padding: '1px'}} key={i}>
                                    <img src={e.itemInfo.productImage} className="mr-3" alt={e.sku} style={{maxWidth:'150px', maxHeight:'150px', minHeight:'150px', minWidth:'150px'}}/>
                                    <div className="media-body" style={{textAlign:'justify'}}>
                                        <div style={{display:'inline-block', verticalAlign:'top'}}>
                                            <h5 className="mt-0 mb-1">{e.sku}</h5>
                                            {e.itemInfo.attributes && e.itemInfo.attributes.map((y, key) => {
                                            return <span key={key}>
                                                <span><b>{y.name}</b> : {y.value}</span><br/>
                                            </span>
                                            })}
                                            <span>
                                                <span><b>Sku</b> : {e.sku}</span><br/>
                                            </span>
                                        </div>
                                        <PriceInfo priceInfo={e.priceInfo}/>
                                        <Quantity quantity={e.quantity} id={e.sku} onselect={this.updateCart} removeItem={this.removeItem}/>
                                    </div>
                                    <hr/>
                                </li>
                            })}
                            <hr/>
                            <li className="media" style={{padding: '1px'}}>
                                <div className="media-body" style={{textAlign:'justify'}}>
                                    <div style={{display:'inline-block', verticalAlign:'middle', float:'right', minWidth:'300px'}}>
                                        Sub Total : ${new Utils().roundToTwo(this.state.PriceInfo.orderSubTotal)}<br/>
                                        Total Saving : ${new Utils().roundToTwo(this.state.PriceInfo.orderItemSaving)}<br/>
                                        Shipping : ${new Utils().roundToTwo(this.state.PriceInfo.orderShippingTotal)}<br/>
                                        Tax Amount : ${new Utils().roundToTwo(this.state.PriceInfo.orderTaxAmount)}<br/>
                                        Order Total : ${new Utils().roundToTwo(this.state.PriceInfo.orderTotal)}<br/>
                                        <hr/>
                                    </div>
                                </div>
                            </li>
                            <li className="media" style={{padding: '1px'}}>
                                <div className="media-body" style={{textAlign:'justify'}}>
                                    <div style={{display:'inline-block', verticalAlign:'middle', float:'right', minWidth:'300px'}}>
                                        <input type="button" value="Checkout" 
                                        style={{backgroundColor: '#29b363', width: '70%', height: '40px', border: 'black solid 0.5px'}}
                                        onClick={this.loadCheckout}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <br/><br/><br/><br/><br/><br/>
                    </div>}
           </div>
        
       )
     }
}

function mapStateToProps(state){
    return {common:state.common};
  }


export default connect(mapStateToProps,{updateCart, removeCartItem})(withRouter(Cartpage));
