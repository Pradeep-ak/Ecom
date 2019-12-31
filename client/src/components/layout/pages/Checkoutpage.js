import React, {Component}from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { initalLoad, updatePersonalInfo, updateShippingInfo, updateShippingType, updateBillingInfo, updatePaymentInfo } from '../../../action/checkoutAction'
import Utils from '../../../utils/utils'
import {Config} from '../../../utils/config'


const PaymentSection = (data) => {
    var paymentInfoFrom = data.paymentInfo && data.paymentInfo.type;
    var COD = (data.paymentInfo && data.paymentInfo.type)?true:false;

    return <span>
        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
            <div className="col col-lg-10" style={{textAlign:'left'}}>
                <h5>Payment Information</h5>
            </div>
            <div className="col col-lg-2" style={{textAlign:'right'}}>
            {paymentInfoFrom && <button type="button" className="btn btn-default btn-sm"  name='PaymentSectionEdit' onClick={data.edit}>
                                <span className="glyphicon glyphicon-edit"></span> Edit
                            </button>}
            </div>                                                                
        </div>
        {!paymentInfoFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.submit}>
                    <input type="radio" name="payment_type" value='COD' defaultChecked={COD}/> COD<br/><br/>
                    <div style={{minWidth:'50%', textAlign:'right'}}>
                        <input type="submit" name="Next" value="Next" style={{width:'30%'}}/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>}
        {paymentInfoFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                    <span>COD</span>
                <br/>
                <br/>
            </div>                                                              
        </div>}
    </span>
}

const BillingSection = (data) => {
    var indState = Config.IndianState;
    var billingAddrFrom = data.billingAdd && data.billingAdd.address && data.billingAdd.address.InnerHTML && 
    data.billingAdd.address.InnerHTML.length > 0;

    var shippingAddrFrom = data.shippingAdd && data.shippingAdd.address;

    var sameAsShippingAdd = (data.billingAdd && data.billingAdd.sameAsShippingAdd)?data.billingAdd.sameAsShippingAdd:false;

    if(sameAsShippingAdd && shippingAddrFrom){
        console.log('Copied Shipping Address')
        var address1 = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.address1)?data.shippingAdd.address.address1:undefined;
        var address2 =  (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.address2)?data.shippingAdd.address.address2:undefined;
        var city = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.city)?data.shippingAdd.address.city:undefined;
        var state = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.state)?data.shippingAdd.address.state:undefined;
        var country = 'India';
        var pincode = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.pincode)?data.shippingAdd.address.pincode:undefined;
        var additional = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.additional)?data.shippingAdd.address.additional:undefined;

    } else{
        console.log('Copied Billing Address')
        address1 = (data.billingAdd && data.billingAdd.address && data.billingAdd.address.address1)?data.billingAdd.address.address1:undefined;
        address2 =  (data.billingAdd && data.billingAdd.address && data.billingAdd.address.address2)?data.billingAdd.address.address2:undefined;
        city = (data.billingAdd && data.billingAdd.address && data.billingAdd.address.city)?data.billingAdd.address.city:undefined;
        state = (data.billingAdd && data.billingAdd.address && data.billingAdd.address.state)?data.billingAdd.address.state:undefined;
        country = 'India';
        pincode = (data.billingAdd && data.billingAdd.address && data.billingAdd.address.pincode)?data.billingAdd.address.pincode:undefined;
        additional = (data.billingAdd && data.billingAdd.address && data.billingAdd.address.additional)?data.billingAdd.address.additional:undefined;
    }

    return <span>
        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
            <div className="col col-lg-10" style={{textAlign:'left'}}>
                <h5>Billing Information</h5>
            </div>
            <div className="col col-lg-2" style={{textAlign:'right'}}>
            {billingAddrFrom && <button type="button" className="btn btn-default btn-sm" name='BillingTypeEdit' onClick={data.edit}>
                                <span className="glyphicon glyphicon-edit"></span> Edit
                            </button>}
            </div>                                                                
        </div>
        {!billingAddrFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.submit}>
                    <input type="checkbox" name="sameAsShippingAdd" value={sameAsShippingAdd} defaultChecked={sameAsShippingAdd} onChange={data.copyShippingaddr}/> Same As Shipping Address<br/><br/>
                    <input type="text" name="address1" value={address1} placeholder="Address1" style={{minWidth:'70%'}} maxLength='50' required onChange={data.onBillChange}/><br/><br/>
                    <span style={{minWidth:'20%'}}>  </span>
                    <input type="text" name="address2" value={address2} placeholder="Address2" style={{minWidth:'70%'}} maxLength='50' onChange={data.onBillChange}/><br/><br/>
                    <input type="text" name="city" value={city} placeholder="City" style={{minWidth:'30%'}} maxLength='10' required onChange={data.onBillChange}/><br/><br/>
                    <select name="state" className="form-control" value={state} style={{width:'50%'}} onChange={data.onBillChange}>
                        {Object.keys(indState).map((e,i)=>{
                            return <option key={i} value={e}>{indState[e]}</option>
                        })}
                    </select><br/>
                    <input type="text" name="country" value={country} placeholder="India" style={{minWidth:'50%'}} readOnly onChange={data.onBillChange}/><br/><br/>
                    <input type="number" name="pincode" value={pincode} placeholder="Pincode" style={{minWidth:'30%'}} min='99999' max='999999' required onChange={data.onBillChange} /><br/><br/>
                    <input type="text" name="additional" value={additional} placeholder="Near By Land Marks"style={{minWidth:'70%'}} maxLength='50' onChange={data.onBillChange}/><br/><br/>
                    <div style={{minWidth:'50%', textAlign:'right'}}>
                        <input type="submit" name="Next" value="Next" style={{width:'30%'}}/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>}
        {billingAddrFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                    <span dangerouslySetInnerHTML={{ __html: data.billingAdd.address.InnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>}
    </span>
}


const ShippingTypeSection = (data) => {
    var shippingTypeFrom = data.shippingAdd && data.shippingAdd.shippingMethods;
    var shippingType = (data.shippingAdd && data.shippingAdd.shippingMethods)?data.shippingAdd.shippingMethods:undefined;

    return <span>
        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
            <div className="col col-lg-10" style={{textAlign:'left'}}>
                <h5>Shipping Type</h5>
            </div>
            <div className="col col-lg-2" style={{textAlign:'right'}}>
            {shippingTypeFrom && <button type="button" className="btn btn-default btn-sm" name='ShippingTypeEdit' onClick={data.edit}>
                                <span className="glyphicon glyphicon-edit"></span> Edit
                            </button>}
            </div>                                                                
        </div>
        {!shippingTypeFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.submit}>
                    {data.shippingOption.map((e,i)=>{
                        return <span key={i}>
                            <input type="radio" value={e.id} name="shippingType"/> {e.label} <br/>
                        </span>
                    })}
                    <div style={{minWidth:'50%', textAlign:'right'}}>
                        <input type="submit" name="Next" value="Next" style={{width:'30%'}}/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>}
        {shippingTypeFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                    <span> {(data.shippingOption.filter(e=>e.id === shippingType))[0].label} </span>
                <br/>
                <br/>
            </div>                                                              
        </div>}
    </span>

}

const ShippingSection = (data) => {
    var indState = Config.IndianState;
    var shippingAddrFrom = data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.InnerHTML && 
    data.shippingAdd.address.InnerHTML.length > 0;

    var address1 = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.address1)?data.shippingAdd.address.address1:undefined;
    var address2 =  (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.address2)?data.shippingAdd.address.address2:undefined;
    var city = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.city)?data.shippingAdd.address.city:undefined;
    var state = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.state)?data.shippingAdd.address.state:undefined;
    var country = 'India';
    var pincode = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.pincode)?data.shippingAdd.address.pincode:undefined;
    var additional = (data.shippingAdd && data.shippingAdd.address && data.shippingAdd.address.additional)?data.shippingAdd.address.additional:undefined;

    return <span>
        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
            <div className="col col-lg-10" style={{textAlign:'left'}}>
                <h5>Shipping Information</h5>
            </div>
            <div className="col col-lg-2" style={{textAlign:'right'}}>
            {shippingAddrFrom && <button type="button" className="btn btn-default btn-sm" name='ShippingSectionEdit' onClick={data.edit}>
                                <span className="glyphicon glyphicon-edit"></span> Edit
                            </button>}
            </div>                                                                
        </div>
        {!shippingAddrFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.submit}>
                    <input type="text" name="address1" defaultValue={address1} placeholder="Address1" style={{minWidth:'70%'}} maxLength='50' required /><br/><br/>
                    <span style={{minWidth:'20%'}}>  </span>
                    <input type="text" name="address2" defaultValue={address2} placeholder="Address2" style={{minWidth:'70%'}} maxLength='50'/><br/><br/>
                    <input type="text" name="city" defaultValue={city} placeholder="City" style={{minWidth:'30%'}} maxLength='10' required /><br/><br/>
                    <select name="state" className="form-control" defaultValue={state} style={{width:'50%'}}>
                        {Object.keys(indState).map((e,i)=>{
                            return <option key={i} value={e}>{indState[e]}</option>
                        })}
                    </select><br/>
                    <input type="text" name="country" value={country} placeholder="India" style={{minWidth:'50%'}} readOnly/><br/><br/>
                    <input type="number" name="pincode" defaultValue={pincode} placeholder="Pincode" style={{minWidth:'30%'}} maxLength='6' min="100000" max="999999" required /><br/><br/>
                    <input type="text" name="additional" defaultValue={additional} placeholder="Near By Land Marks"style={{minWidth:'70%'}}  maxLength='50'/><br/><br/>
                    <div style={{minWidth:'50%', textAlign:'right'}}>
                        <input type="submit" name="Next" value="Next" style={{width:'30%'}}/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>}
        {shippingAddrFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                    <span dangerouslySetInnerHTML={{ __html: data.shippingAdd.address.InnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>}
    </span>
}

const PersonalSection = (data) => {
    var personalFrom = data.personalInfo && data.personalInfo.PersonalDataInnerHTML && 
    data.personalInfo.PersonalDataInnerHTML.length > 0;
    var fname = data.personalInfo.fname;
    var lname = data.personalInfo.lname;
    var email = data.personalInfo.email;
    var phoneNumber = data.personalInfo.phoneNumber;

    return <span>
        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
            <div className="col col-lg-10" style={{textAlign:'left'}}>
                <h5>Personal Information</h5>
            </div>
            <div className="col col-lg-2" style={{textAlign:'right'}}>
            {personalFrom && <button type="button" className="btn btn-default btn-sm" name='PersonalSectionEdit' onClick={data.edit}>
                                <span className="glyphicon glyphicon-edit"></span> Edit
                            </button>}
            </div>                                                                
        </div>
        {!personalFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.submit}>
                    <input type="text" name="FirstName" defaultValue={fname} placeholder="First Name" style={{minWidth:'30%'}} required maxLength='20'/>
                    <span style={{minWidth:'20%'}}>  </span>
                    <input type="text" name="LastName" defaultValue={lname} placeholder="Last Name"style={{minWidth:'30%'}} required maxLength='20'/><br/><br/>
                    <input type="email" name="emailId" defaultValue={email} placeholder="Email ID" style={{minWidth:'70%'}} required maxLength='40'/><br/><br/>
                    <input type="tel" name="phoneNum" defaultValue={phoneNumber} placeholder="Phone Number" style={{minWidth:'50%'}} pattern="+91-[0-9]{10}" required maxLength='14'/><span> Format: +91-XXXXXXXXXX</span><br/><br/>
                    <div style={{minWidth:'50%', textAlign:'right'}}>
                        <input type="submit" name="Next" value="Next" style={{width:'30%'}}/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>}
        {personalFrom && <div className="row justify-content-md-center">
            <div className="col col-lg-12" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                    <span dangerouslySetInnerHTML={{ __html: data.personalInfo.PersonalDataInnerHTML}} />
                <br/>
                <br/>
            </div>                                                              
        </div>}
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


class Checkoutpage extends Component {

    constructor(props){
        super(props)
        this.submitPersonaldata = this.submitPersonaldata.bind(this)
        this.submitShippingAddr = this.submitShippingAddr.bind(this)
        this.submitShippingType = this.submitShippingType.bind(this)
        this.submitBillingAddr = this.submitBillingAddr.bind(this)
        this.submitPayment = this.submitPayment.bind(this)
        this.loadCart = this.loadCart.bind(this)
        this.editpanel = this.editpanel.bind(this)
        this.copyShippingAddr = this.copyShippingAddr.bind(this)
        this.onBillChange = this.onBillChange.bind(this)
        this.loadReview = this.loadReview.bind(this)
        this.state =  null
    }

    loadCart = event =>{
        this.props.history.push('/cart')
    }

    loadReview = event =>{
        this.props.history.push('/review')
    }

    editpanel = e => {
        console.log('Edit the Panel: ' + e.target.name)
        var order =  this.state.order;
        switch(e.target.name){
            case 'PersonalSectionEdit':
                order.PersonalInfo.PersonalDataInnerHTML = '';
                this.setState({order:order})
                break;
            case 'ShippingSectionEdit':
                order.ShippingInfo.address.InnerHTML = '';
                this.setState({order:order})
                break;
            case 'ShippingTypeEdit':
                order.ShippingInfo.shippingMethods = '';
                this.setState({order:order})
                break;        
            case 'BillingTypeEdit':
                order.BillingInfo.address.InnerHTML = '';
                this.setState({order:order})
                break;                        
            case 'PaymentSectionEdit':
                order.PaymentInfo.type = false;
                this.setState({order:order})
                break;      
            default:
                break;
        }
    }

    onBillChange = e => {
        var order =  this.state.order;
        if(!order.BillingInfo){
            order.BillingInfo = {}
       }
       if(!order.BillingInfo.address){
            order.BillingInfo.address = {}
       }
       console.log('onBillChange')
       order.BillingInfo.address[e.target.name] = e.target.value;
       this.setState({order:order})
    }

    copyShippingAddr = e => {
        console.log('copyShippingaddr')
       var order =  this.state.order;
       if(!order.BillingInfo){
            order.BillingInfo = {}
       }
       if(order.BillingInfo.sameAsShippingAdd){
        order.BillingInfo.sameAsShippingAdd = false;
       }else{
        order.BillingInfo.sameAsShippingAdd=true;
       }
       this.setState({order:order})
    }

    submitPayment = event =>{
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        // Access FormData fields with `data.get(fieldName)`
        this.props.updatePaymentInfo({'paymentType':data.get('payment_type')})
        // console.log(data.get('COD'))
    }

    submitBillingAddr = event =>{
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        // Access FormData fields with `data.get(fieldName)`
        this.props.updateBillingInfo({
            SASA:data.get('sameAsShippingAdd'),
            addr1:data.get('address1'),
            addr2:data.get('address2'),
            city:data.get('city'),
            state:data.get('state'),
            country:data.get('country'),
            pincode:data.get('pincode'),
            additional:data.get('additional')
        });
    }

    submitShippingType = event =>{
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.updateShippingType({shippingType:data.get('shippingType')});
        // Access FormData fields with `data.get(fieldName)`
    }

    submitShippingAddr = event =>{
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.updateShippingInfo({
            addr1:data.get('address1'),
            addr2:data.get('address2'),
            city:data.get('city'),
            state:data.get('state'),
            country:data.get('country'),
            pincode:data.get('pincode'),
            additional:data.get('additional')
        });
    }


    submitPersonaldata = event =>{
        // Prevent default behavior
        event.preventDefault();
        const data = new FormData(event.target);
        this.props.updatePersonalInfo({
            fname:data.get('FirstName'),
            lname:data.get('LastName'),
            email:data.get('emailId'),
            pnumber:data.get('phoneNum')
        });
        // Access FormData fields with `data.get(fieldName)`
    }

    componentDidMount = () => {
        this._asyncRequest = initalLoad().then(
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
                    <div className="col col-lg-8">
                        <PersonalSection personalInfo={this.state.order.PersonalInfo} submit={this.submitPersonaldata} edit={this.editpanel}/>
                        <br/>
                        <ShippingSection shippingAdd={this.state.order.ShippingInfo} submit={this.submitShippingAddr}  edit={this.editpanel}/>
                        <br/>
                        <ShippingTypeSection shippingAdd={this.state.order.ShippingInfo} submit={this.submitShippingType} shippingOption={this.state.order.shippingOption}  edit={this.editpanel}/>
                        <br/>
                        <BillingSection  billingAdd={this.state.order.BillingInfo} shippingAdd={this.state.order.ShippingInfo} submit={this.submitBillingAddr}  edit={this.editpanel} copyShippingaddr={this.copyShippingAddr} onBillChange={this.onBillChange} />
                        <br/>
                        <PaymentSection  paymentInfo={this.state.order.PaymentInfo} submit={this.submitPayment}  edit={this.editpanel}/>

                        <br/><br/>

                        {(this.state.order.review === true) && <button type="button" onClick={this.loadReview}>
                                    Review
                                </button>
                        }
                        <br/>
                    </div>
                    <div className="col col-lg-1">
                        
                    </div>
                    <div className="col col-lg-3">
                        <div className="row justify-content-md-center" style={{borderBottom:'black solid 1px'}}>
                            <div className="col col-lg-10" style={{textAlign:'left'}}>
                                <h5>Order Information</h5>
                            </div>
                            <div className="col col-lg-2" style={{textAlign:'right'}}>
                                <button type="button" className="btn btn-default btn-sm" onClick={this.loadCart}>
                                    <span className="glyphicon glyphicon-edit"></span> Edit
                                </button>
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


export default connect(mapStateToProps,{
    updatePersonalInfo, 
    updateShippingInfo, 
    updateShippingType, 
    updateBillingInfo, 
    updatePaymentInfo})(withRouter(Checkoutpage));
