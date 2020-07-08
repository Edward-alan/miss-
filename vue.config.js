module.exports ={
    devServer:{
        proxy:{
            '/api' : {
                // target:'https://new.tsingmuth.com/admin/',
                target:'http://localhost:8080',
                ws: false,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            },
        } 
    }
}