const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const comparePassword = (password, hashedPassword) => {
        const flag = bcrypt.compareSync(password, hashedPassword);
        return flag;
}
console.log(encryptPassword("virushka"))

module.exports = { encryptPassword, comparePassword }