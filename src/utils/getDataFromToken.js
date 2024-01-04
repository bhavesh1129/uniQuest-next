import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (request) => {
    try {
        const token = await request.cookies.get('token')?.value || '';
        console.log('Token:', token);

        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('Decoded Token:', decodeToken);

        return decodeToken.id;
    } catch (error) {
        throw new Error("Data could not be extracted from token " + error.message);
    }
};
