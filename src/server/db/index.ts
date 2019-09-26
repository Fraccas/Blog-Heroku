import * as mysql from 'mysql';
import config from '../config';

import Blogs from './blogs';
import Authors from './authors';
import AccessTokens from './accesstokens';

export const pool = mysql.createPool(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
}

export default {
    Blogs, Authors, AccessTokens
}