import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOrderRequested} from '../../../action/commonAction'
import Utils from '../../../utils/utils'


const ItemList = (data) => {
    return <ul className="list-unstyled">
    {data.itemList.map((e, i)=>{
        return <li className="media" style={{paddingTop: '25px', paddingBottom: '25px', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} key={i}>
            <img src={e.itemInfo.productImage} className="mr-3" alt={e.sku} style={{maxWidth:'150px', maxHeight:'150px', minHeight:'150px', minWidth:'150px', padding:'10px'}}/>
            <div className="media-body" style={{textAlign:'justify'}}>
                <div style={{display:'inline-block', verticalAlign:'top', minWidth:'50%'}}>
                    <h5 className="mt-0 mb-1">{e.sku}</h5>
                    {e.itemInfo.attributes && e.itemInfo.attributes.map((y, key) => {
                    return <span key={key}>
                        <span><b>{y.name}</b> : {y.value}</span><br/>
                    </span>
                    })}
                    <span>
                        <span><b>Sku</b> : <span style={{cursor:'pointer'}} onClick={data.openProductPage}>{e.sku}</span></span><br/>
                    </span>
                </div>
                <PriceInfo priceInfo={e.priceInfo}/>
                <Quantity quantity={e.quantity} id={e.sku}/>
            </div>
            <hr/>
        </li>
    })}
</ul>
}

const PriceInfo = (data) => {
    return <div style={{display:'inline-block', verticalAlign:'top', float:'right', minWidth:'25%'}}>
        <span>
            ${new Utils().roundToTwo(data.priceInfo.eachItemPrice)} Each<br/>
            Total Amount: ${new Utils().roundToTwo(data.priceInfo.totalItemPrice)}<br/>
            {data.priceInfo.totalSaving===0?'':'Saving : $'+ new Utils().roundToTwo(data.priceInfo.totalSaving)}<br/>
            <b style={{color:'red'}}>{data.priceInfo.priceType==='ORIGINAL'?'':data.priceInfo.priceType}</b>
        </span>
    </div>
}

const Quantity = (data) => {
    return <div style={{display:'inline-block', verticalAlign:'middle', float:'right', minWidth:'15%'}}>
        <label htmlFor="exampleFormControlSelect1" style={{margin:'0px 10px 0px 0px', textTransform: "capitalize"}}>Quantity : </label>{data.quantity}
    </div>
}

const OrderInfo = (data) => {
    return <span>
        <div style={{minWidth:'100%', textAlign:'right'}}>
            Sub Total : ${new Utils().roundToTwo(data.order.PriceInfo.orderSubTotal)}<br/>
            Shipping : ${new Utils().roundToTwo(data.order.PriceInfo.orderShippingTotal)}<br/>
            Tax Amount : ${new Utils().roundToTwo(data.order.PriceInfo.orderTaxAmount)}<br/>
            <hr/>
            Order Total : ${new Utils().roundToTwo(data.order.PriceInfo.orderTotal)}<br/><br/>
        </div>
    </span>
}

const PersonalInfoBar = (data) => {
    return <span>
        <b><span style={{textTransform: "capitalize"}}>{data.PI.fname}</span>&nbsp;<span style={{textTransform: "capitalize"}}>{data.PI.lname}</span></b><br/>
        <span>{data.PI.email}</span><br/>
        <span>{data.PI.phoneNumber}</span>
    </span>
}

class OrderTrackingpage extends Component {

    constructor(props){
        super(props)
        this.openProductPage = this.openProductPage.bind(this)
        this.submitOrderRequest = this.submitOrderRequest.bind(this)
        this.state =  null
    }

    submitOrderRequest = (event) => {
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        //data.forEach(f=>console.log(f))
        // Access FormData fields with `data.get(fieldName)`
        this.props.getOrderRequested(
            data.get('orderNum'),
            data.get('email'),
            data.get('phoneNum')
        )
    }

    openProductPage = (e) => {
        var sku = e.target.innerHTML
        console.log(sku)
        if(sku && sku.length === 11){
            var product = sku.match(/(.{1,7})/g);
            console.log(product)
            this.props.history.push('/p/cart?id=' + product[0])
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.common.orderTracking){
            this.setState({
                order:nextProps.common.orderTracking
            })
        }
    }

     render() {
         var displayOrderDetails = this.state && this.state.order && Object.keys(this.state.order).length > 0;
       return(<div>                
                {!displayOrderDetails && <span>
                        <br/><br/><br/>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-8" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                                <br/>
                                <h5>Order Search</h5>
                                <hr/>
                                <form onSubmit={this.submitOrderRequest}>
                                    <br/>
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-8" style={{textAlign:'left'}}>
                                            <input type='input' name='orderNum' style={{width:'80%'}}  placeholder='Order Number' required/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-8" style={{textAlign:'left'}}>
                                            <input type='emal' name='email' style={{width:'80%'}} placeholder='Email' required/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-8" style={{textAlign:'left'}}>
                                            <input type='number' name='phoneNum' style={{width:'80%'}} placeholder='Phone Number' required min='6000000000' max='99999999999'/>
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="row justify-content-md-center">
                                        <div className="col col-lg-8" style={{textAlign:'center'}}>
                                            <input type='submit' value='Find My Order' name='Submit' style={{width:'50%'}}/>
                                        </div>
                                    </div>
                                    <br/><br/><br/>
                                </form>
                            </div>
                        </div>
                    </span>   
                }
               {displayOrderDetails &&
               <span>
               <br/><br/><br/>
               <div className="row justify-content-md-center">
                    <div className="col col-lg-8" style={{textAlign:'left'}}>
                        Hey <span style={{textTransform: "capitalize"}}>{this.state.order.PersonalInfo.fname}</span>&nbsp;<span style={{textTransform: "capitalize"}}>{this.state.order.PersonalInfo.lname}</span>,
                        <br/><br/><br/>
                        <h5>Your order is as below</h5>
                        Thanks for shopping! Your order is in-progress.<br/>we'll send you as email of the progress related to its shipping.
                        <br/><br/>
                        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
                            <div className="col col-lg-7" style={{textAlign:'left'}}>
                                <h5>Order Information</h5>
                                <b>Order Number : </b>{this.state.order.Order_id}
                                <br/><PersonalInfoBar PI={this.state.order.PersonalInfo}/>
                            </div>
                            <div className="col col-lg-1" style={{textAlign:'left'}}>
                            </div> 
                            <div className="col col-lg-4" style={{textAlign:'left'}}>
                                <br/>
                                <OrderInfo order={this.state.order} openProductPage={this.openProductPage}/>
                            </div>                                                            
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col col-lg-12" style={{textAlign:'left'}}>
                                <ItemList itemList={this.state.order.ItemList}/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/>
                </span>}
           </div>
       )
     }
}

function mapStateToProps(state){
    return {common:state.common};
  }


export default connect(mapStateToProps,{getOrderRequested})(withRouter(OrderTrackingpage));