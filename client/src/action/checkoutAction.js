import axios from 'axios'
import { HOME_INIT_REQUEST } from './'

export const initalLoad = () => {
    return axios.get('/api/o/checkout/order')
}

export const updatePersonalInfo = (data) => dispatch => {
    axios.put('/api/o/checkout/personalInfo', data).then(resp=>{
      //Update Message for Successfully.
      dispatch({
        type:'INFO_ALERT',
        payload:{
          display:true,
          type:'Info',
          alertMsg:'Updated Personal Infromation Successfully.'
        }
      });
      dispatch({
        type:'ORDER_UPDATED',
        payload:{
          order:resp.data
        }
      });
    }).catch(error => {
        console.log(error.response.status)
    if(error.response.status===400){
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:error.response.data.msg
            }
          });  
    } else {
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:'Unable to updated order'
            }
          });
    }
    });
  }

  export const updateShippingInfo = (data) => dispatch => {
    axios.put('/api/o/checkout/shippingInfo', data).then(resp=>{
      //Update Message for Successfully.
      dispatch({
        type:'INFO_ALERT',
        payload:{
          display:true,
          type:'Info',
          alertMsg:'Updated Shipping Infromation Successfully.'
        }
      });
      dispatch({
        type:'ORDER_UPDATED',
        payload:{
          order:resp.data
        }
      });
    }).catch(error => {
        console.log(error.response.status)
    if(error.response.status===400){
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:error.response.data.msg
            }
          });  
    } else {
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:'Unable to updated order'
            }
          });
    }
    });
  }

  export const updateShippingType = (data) => dispatch => {
    axios.put('/api/o/checkout/shippingType', data).then(resp=>{
      //Update Message for Successfully.
      dispatch({
        type:'INFO_ALERT',
        payload:{
          display:true,
          type:'Info',
          alertMsg:'Updated Shipping Type Successfully.'
        }
      });
      dispatch({
        type:'ORDER_UPDATED',
        payload:{
          order:resp.data
        }
      });
    }).catch(error => {
        console.log(error.response.status)
    if(error.response.status===400){
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:error.response.data.msg
            }
          });  
    } else {
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:'Unable to updated order'
            }
          });
    }
    });
  }

export const updateBillingInfo = (data) => dispatch => {
    axios.put('/api/o/checkout/billingInfo', data).then(resp=>{
      //Update Message for Successfully.
      dispatch({
        type:'INFO_ALERT',
        payload:{
          display:true,
          type:'Info',
          alertMsg:'Updated Billing Infromation Successfully.'
        }
      });
      dispatch({
        type:'ORDER_UPDATED',
        payload:{
          order:resp.data
        }
      });
    }).catch(error => {
        console.log(error.response.status)
    if(error.response.status===400){
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:error.response.data.msg
            }
          });  
    } else {
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:'Unable to updated order'
            }
          });
    }
    });
  }

  export const updatePaymentInfo = (data) => dispatch => {
    axios.put('/api/o/checkout/paymentInfo', data).then(resp=>{
      //Update Message for Successfully.
      dispatch({
        type:'INFO_ALERT',
        payload:{
          display:true,
          type:'Info',
          alertMsg:'Updated Payment Infromation Successfully.'
        }
      });
      dispatch({
        type:'ORDER_UPDATED',
        payload:{
          order:resp.data
        }
      });
    }).catch(error => {
        console.log(error.response.status)
    if(error.response.status===400){
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:error.response.data.msg
            }
          });  
    } else {
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:'Unable to updated order'
            }
          });
    }
    });
  }

  