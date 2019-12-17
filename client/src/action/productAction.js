import axios from 'axios'

export const fetchProduct = path => {
    console.log(path)
    return axios.get('/api'+path.pathname+path.search);
  }

  export const addToBag = (sku_id) => {
    axios.post('/api/o/additem',{
      sku_id
    }).then(resp=>{
      console.log(resp.data)
      console.log('Add to bag is Done.')
    }).catch(err=>{
      console.log('Add to bag is an error : ' + err.message)
    }).finally(()=>{
      console.log('Add to bag is Completed.')
    })
  }