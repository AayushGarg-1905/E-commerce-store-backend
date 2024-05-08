const md5 = require('md5');
const { randomUUID } = require('crypto');
const hashPassword = (password)=>{
    return md5(password);
}

const getAccessToken = ()=>{
    return randomUUID();
}

module.exports = {
    hashPassword,
    getAccessToken
}