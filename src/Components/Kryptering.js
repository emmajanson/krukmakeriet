/* const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePassword(password, hash) {
    const samePassword = await bcrypt.compare(password, hash);
    return samePassword;
}

module.exports = { hashPassword, comparePassword }; */