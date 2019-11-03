import axios from 'axios'

export const fetchDepartment = path => {
    //console.log(path.pathname)
    return axios.get('/api/'+path.pathname);
}