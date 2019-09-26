import { pool } from './index';

export const getAuthorByName = async (name: string) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id FROM authors WHERE name = ?', [name], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getAuthorById = async (id: string) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT name FROM authors WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const getAuthorByEmail = async (email: string) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM authors WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const createAuthor = async (name: string, email: string, password: string) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO authors (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export default {
    getAuthorByName, getAuthorById, getAuthorByEmail, createAuthor
}