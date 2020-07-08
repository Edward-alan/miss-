/**
 * 封装axios
 */
import axios from 'axios'
import qs from 'querystring'
// import router from '../router'

//跳转登录页
const toLogin =()=>{
    router.push({
        path:'/login'
    })
}


//错误信息处理
const errorHandle = (status,other)=>{
    switch(status){
        case 400:
            console.log('信息校验失败');
            break;
        case 401:
            console.log('认证失败');
            break;
        case 403:
            toLogin();
            //token过时了
            //清除token储存
            localStorage.removeItem('token')
            console.log("token校验失败");
            break;
        case 404:
            console.log('请求的资源不存在');
            break;
        default:
            console.log(other);
            break;
    }
}


//创建axios实例
var instance = axios.create({timeout:5000});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//instance.defaults.headers.common['Authorization'] = localStorage.gitItem('token);//token在vuex里

instance.interceptors.request.use(function (config){
    console.log(config)
    //判断post请求需要增加qs转化
    if(config.method == 'post'){
        config.data = qs.stringify(config.data)
    }
    return config;
},function(error){
    return Promise.reject(error);
})

instance.interceptors.response.use(
    //请求成功
    res => res.status === 200? Promise.resolve(res) : Promise.reject(res),
    //请求失败
    error => {
        const {response} = error;
        if(response){
            errorHandle(response.status.response.data.message);
            return Promise.reject(response);
        }else{
            console.log('断网了');
        }
    }
);

export default instance

