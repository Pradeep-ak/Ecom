import axios from 'axios'

export const fetchMenu = () => {
    return axios.get('/api/h/menu');
}

export const cartTotal = () => {
    return axios.get('/api/o/cartTotal');
}

export const loadCartPage = () => {
    return axios.get('/api/o/cartDetails');
}

export const updateCart = (skuNumber, updatedQuantity) => dispatch => {
    axios.post('/api/o/updateItem',{
        sku_id:skuNumber,
        quantity:updatedQuantity
      }).then(resp=>{
        //Update Message for Successfully. 
        dispatch({
          type:'INFO_ALERT',
          payload:{
            display:true,
            type:'Info',
            alertMsg:resp.data.msg
          }
        });
        //Update cart count.
        var totalItem=0
        if(resp.data.cart.ItemList){
            resp.data.cart.ItemList.forEach(element => {
                totalItem = totalItem + element.quantity
              });
        }
        dispatch({
          type:'CART_UPDATED',
          payload:{
            totalItem:totalItem
          }
        });

        dispatch({
            type:'CART_DETAILS_UPDATED',
            payload:{
                type:'cart_details',
                cart:resp.data.cart
            }
          });
    }).catch(err=>{
        dispatch({
          type:'INFO_ALERT',
          payload:{
            type:'error',
            alertMsg:'Unable to update the item in cart'
          }
        });
      })
}

export const removeCartItem = (skuNumber) => dispatch => {
    axios.post('/api/o/removeItem',{
        sku_id:skuNumber
      }).then(resp=>{
        //Update Message for Successfully. 
        dispatch({
          type:'INFO_ALERT',
          payload:{
            display:true,
            type:'Info',
            alertMsg:resp.data.msg
          }
        });
        //Update cart count.
        var totalItem=0
        if(resp.data.cart.ItemList){
            resp.data.cart.ItemList.forEach(element => {
                totalItem = totalItem + element.quantity
              });
        }
        dispatch({
          type:'CART_UPDATED',
          payload:{
            totalItem:totalItem
          }
        });
        dispatch({
            type:'CART_DETAILS_UPDATED',
            payload:{
                type:'cart_details',
                cart:resp.data.cart
            }
          });
    }).catch(err=>{
        dispatch({
          type:'INFO_ALERT',
          payload:{
            display:true,
            type:'error',
            alertMsg:'Unable to remove item from cart.'
          }
        });
      })
}

export const removeAlert = () => dispatch => {
    console.log('Clear the alert message.')
    //Update Message for Successfully. 
    dispatch({
        type:'INFO_ALERT',
        payload:{
            display:false,
            type:'Info',
            alertMsg:''
        }
    });
}

export const refreshCartTotal = () => dispatch => {
    axios.get('/api/o/cartTotal').then(resp=>{
        //Update cart count.
        var totalItem=0
        if(resp.data.cart.ItemList){
            resp.data.cart.ItemList.forEach(element => {
                totalItem = totalItem + element.quantity
              });
        }
        dispatch({
          type:'CART_UPDATED',
          payload:{
            totalItem:totalItem
          }
        });
    }).catch(err=>{
        console.log(err)
    })
}

export const getOrderRequested = (orderId, email, phoneNum) => dispatch => {
    // console.log('get the Order Request....!!!!')
    axios.get('/api/ot/myorders',{
        params: {
            id: orderId,
            email:email,
            phone:phoneNum
        }
      }).then(resp=>{
        dispatch({
          type:'ORDER_TRACKING_UPDATED',
          payload:{
            orderTracking:resp.data.myOrder
          }
        });
    }).catch(error=>{
        console.log(error.response.status)
    if(error.response.status===404){
        dispatch({
            type:'INFO_ALERT',
            payload:{
              display:true,
              type:'error',
              alertMsg:'Could not find any order for a given details.'
            }
          });
        dispatch({
            type:'ORDER_TRACKING_UPDATED',
            payload:{
                orderTracking:{}
            }
        });  
    } else {
        console.log(error.msg)
    }
    });
}