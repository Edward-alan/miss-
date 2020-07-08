//  const jwt = require('jsonwebtoken')
 
//  let writePaths = [
//      `/use/login`,
//     //  '/use/register'
//  ]

//  module.exports = () =>{
//     return async (ctx,next) =>{
//         try{
//             if(writePaths.includes(ctx.request.path)){
//                 await next()
//             }else{
//                 const token = this.ctx.coolies.get('token');
//                 const info = jwt.verify(token,'gaolv');
//                 // console.log(token,info)
//                 this.ctx.info = info;
//                 await next()
//             }
//         }catch(e){
//             this.ctx.throw(401,'token已失效')
//         }
//     }
//  }
// module.exports = () => {
//     return async (ctx, next) => {
//         try{
//             await next()
//         }catch(e){
//             if(ctx.response.status >= 500){
//                 ctx.body = {
//                     code:0,
//                     msg:'网络错误'
//                 }
//             }else{
//                 ctx.body = {
//                     code:1,
//                     msg:'e.message'
//                 }
//             }
//         }
//     };
// };
