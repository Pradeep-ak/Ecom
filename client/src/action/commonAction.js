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
            type:'Info',
            alertMsg:resp.data.msg
          }
        });
        //Update cart count.
        var totalItem=0
        resp.data.cart.ItemList.forEach(element => {
          totalItem = totalItem + element.quantity
        });
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
            type:'Info',
            alertMsg:resp.data.msg
          }
        });
        //Update cart count.
        var totalItem=0
        resp.data.cart.ItemList.forEach(element => {
          totalItem = totalItem + element.quantity
        });
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
            alertMsg:'Unable to remove item from cart.'
          }
        });
      })
}