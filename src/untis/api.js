import https from './http'
const base = {
    //baseUrl: '' //路径
    baseUrl:'/api',
    banner:'/banner'
}
const banner = {
    getData(){
        return https.get(base.baseUrl+base.banner,{params:{username:"wangxin"}})
    },
    postData(){
        return https.post(base.baseUrl+base.banner)
    }
}

export default{
    banner
}