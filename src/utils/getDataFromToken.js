import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodeToken.id;
    } catch (error) {
        throw new Error("Data could not be extracted from token ", error);
    }
};