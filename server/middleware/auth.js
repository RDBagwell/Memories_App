import jwt from 'jsonwebtoken';

const auth = async (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    try {
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
            req.userId = decodedData?.id;
        } else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth