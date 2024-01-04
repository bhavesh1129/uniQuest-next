import jwt from 'jsonwebtoken';

export const getDataFromToken = async (req) => {
    try {
        const token = req.cookies.token || '';
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodeToken.id;
    } catch (error) {
        throw new Error("Data could not be extracted from token " + error.message);
    }
};
export const dynamic = "force-dynamic"
