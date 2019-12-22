import axios from 'axios'

export const fetchProduct = path => {
    console.log(path)
    return axios.get('/api'+path.pathname+path.search);
  }

  export const addToBag = (sku_id) => dispatch => {
    axios.post('/api/o/additem',{
      sku_id
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
      resp.data.cart.forEach(element => {
        totalItem = totalItem + element.quantity
      });
      dispatch({
        type:'CART_UPDATED',
        payload:{
          totalItem:totalItem
        }
      });
    }).catch(err=>{
      dispatch({
        type:'INFO_ALERT',
        payload:{
          type:'error',
          alertMsg:'Unable to add the item to bag'
        }
      });
    })
  }