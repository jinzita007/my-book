import axios from 'axios'
import router from '../router'
import store from '../store/index.js'

axios.default.timeout = 5000

// axios拦截响应
/*axios.interceptors.response.use(response => {
    if (!response.data.session) {
       
        router.replace({
            path: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    }
    //console.log(response.data.session);
    return response
    //console.log(response)
    
}, err => {
    return Promise.reject(err)
})*/
axios.interceptors.response.use(response => {
    // 处理响应数据
    if (!response.data.session === true) {
        //console.log(!response.data.session);
        router.replace({
            path: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    } 
    
    //console.log(response.data);
    return response;
    
}, error => {
    // 处理响应失败
    return Promise.reject(error);
})


export default axios