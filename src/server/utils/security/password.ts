import * as bcrypt from 'bcrypt';

export const HashPass = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export const ComparePass = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}