import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import db from '../../db';
import config from '../../config';

export const CreateToken = async (payload: IPayload) => {
    let tokenId: any = await db.AccessTokens.addToken(payload.userid);
    payload.accesstokenid = tokenId.insertId; 
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret);
    await db.AccessTokens.updateToken(payload.accesstokenid, token);
    return token;
};

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid]: any = await db.AccessTokens.getToken(payload.accesstokenid, token);
    if (!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return payload;
    }
}

export interface IPayload {
    [key: string]: any;
    userid: string;
    unique?: string;
}