import { compare, hash } from "bcrypt";

const saltRounds = 10;

export async function encryptPassword(password){
    return await hash(password, saltRounds);
}

export async function comparePassword(password, hashPassword){
    return await compare(password, hashPassword);
}