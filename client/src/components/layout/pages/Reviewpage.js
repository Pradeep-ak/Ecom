import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initalReviewLoad, submitOrder} from '../../../action/checkoutAction'
import Utils from '../../../utils/utils'


const PaymentSection = (data) => {
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Payment Information</h5>
                <hr/>
            </div>                                                               
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span>COD (<i>Cash on Delivery</i>)</span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

const BillingSection = (data) => {
    return <span>
        <div className="row justify-content-md-center" >
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Billing Information</h5>
                <hr/>
            </div>                                                              
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span dangerouslySetInnerHTML={{ __html: data.billingAdd.address.InnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}


const ShippingTypeSection = (data) => {
    var shippingType = (data.shippingAdd && data.shippingAdd.shippingMethods)?data.shippingAdd.shippingMethods:undefined;
    
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Shipping Type</h5>
                <hr/>
            </div>                                                              
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span> {(data.shippingOption.filter(e=>e.id === shippingType))[0].label} </span>
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>

}

const ShippingSection = (data) => {
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Shipping Information</h5>
                <hr/>
            </div>                                                               
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span dangerouslySetInnerHTML={{ __html: data.shippingAdd.address.InnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

const PersonalSection = (data) => {
    return <span>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                <h5>Personal Information</h5>
                <hr/>
            </div>                                            
        </div>
        <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left'}}>
                    <span dangerouslySetInnerHTML={{ __html: data.personalInfo.PersonalDataInnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>
    </span>
}

const OrderInfo = (data) => {
    return <span>
            <div style={{fontWeight:'bold'}}>
                <div style={{minWidth:'60%', float:'left'}} >Sku</div>
                <div style={{minWidth:'15%', float:'left'}}>Quantity</div>
                <div style={{minWidth:'15%', textAlign:'right'}}>Price</div>
            </div>
        {data.order.ItemList.map((e, i) => {
            return <div key={i}>
                <div style={{minWidth:'70%', float:'left'}} >{e.sku}</div>
                <div style={{minWidth:'10%', float:'left'}}>{e.quantity}</div>
                <div style={{minWidth:'10%', textAlign:'right'}} >${new Utils().roundToTwo(e.priceInfo.totalItemPrice)}</div>
            </div>
        })}
        <hr/>
        <div style={{minWidth:'100%', textAlign:'right'}}>
            Sub Total : ${new Utils().roundToTwo(data.order.PriceInfo.orderSubTotal)}<br/>
            Total Saving : ${new Utils().roundToTwo(data.order.PriceInfo.orderItemSaving)}<br/>
            Shipping : ${new Utils().roundToTwo(data.order.PriceInfo.orderShippingTotal)}<br/>
            Tax Amount : ${new Utils().roundToTwo(data.order.PriceInfo.orderTaxAmount)}<br/>
            <hr/>
            Order Total : ${new Utils().roundToTwo(data.order.PriceInfo.orderTotal)}<br/><br/>
        </div>
    </span>
}


class Reviewpage extends Component {

    constructor(props){
        super(props)
        this.submitOrder = this.submitOrder.bind(this)
        this.state =  null
    }

    submitOrder = event => {
        //this.props.history.push('/review')
        this.props.submitOrder(this.props.history)
    }

    componentDidMount = () => {
        this._asyncRequest = initalReviewLoad().then(
            externalData => {
              this._asyncRequest = null;
              if(externalData.data.REDIRECT_URL != null){
                this.props.history.push(externalData.data.REDIRECT_URL)
              } else {
                this.setState({order:externalData.data})
              }
            }
        );
    }

    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.checkout.order){
            this.setState({order:nextProps.checkout.order})
        }
    }

     render() {
       return(this.state && this.state.order &&
           <div>
               <br/><br/><br/>
               <div className="row justify-content-md-center">
                    <div className="col col-lg-8" style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                        <PersonalSection personalInfo={this.state.order.PersonalInfo}/>
                        <br/>
                        <ShippingSection shippingAdd={this.state.order.ShippingInfo}/>
                        <br/>
                        <ShippingTypeSection shippingAdd={this.state.order.ShippingInfo} shippingOption={this.state.order.shippingOption}/>
                        <br/>
                        <BillingSection  billingAdd={this.state.order.BillingInfo}/>
                        <br/>
                        <PaymentSection  paymentInfo={this.state.order.PaymentInfo}/>
                        <br/><br/>

                        {(this.state.order.review === true) && <div style={{minWidth:'60%', textAlign:'right'}}>
                                <button type="button" onClick={this.submitOrder} style={{width:'30%'}}>Submit Order</button>
                            </div>}
                        <br/>
                    </div>
                    <div className="col col-lg-1">
                        
                    </div>
                    <div className="col col-lg-3">
                        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
                            <div className="col col-lg-12" style={{textAlign:'left'}}>
                                <h5>Order Information</h5>
                            </div>                                                          
                        </div>
                        <div className="row justify-content-md-center" style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                            <div className="col col-lg-12" style={{textAlign:'left'}}>
                                <OrderInfo order={this.state.order}/>
                            </div>                                                               
                        </div>
                    </div>
                </div>
           </div>
       )
     }
}

function mapStateToProps(state){
    return {checkout:state.checkout};
  }


export default connect(mapStateToProps,{submitOrder})(withRouter(Reviewpage));
