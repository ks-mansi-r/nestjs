import { registerAs } from "@nestjs/config";


export default registerAs('jwt',()=>{
    return {
        secret:process.env.JWT_SECRET||'348b6179e0f63c48557fc185451767c3116a533b95070b97550408ef70644c06',
        audience:process.env.JWT_TOKEN_AUDIENCE|| 'localhost:3000',
       issuer:process.env.JWT_TOKEN_ISSUER||'localhost:3000',
        accessTokenTtl:parseInt(process.env.ACCESS_TOKEN_TTL?? '3600', 10),
         refreshTokenTtl:parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400',10) 
   
    }
})