import store from '../store/store'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
    //get请求
    GET: function (url, param = {}) {
        if(store.state.user){
            param['api_token'] = store.state.user.api_token;
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
            }).then(res => {
                resolve(res)
            })
        })
    }

}