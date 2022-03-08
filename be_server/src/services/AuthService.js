const user = require('../db/models/User');
const Exception = require('./Exception');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authConfig = {
    secret: process.env.AUTH_SECRET,
    algorithm: process.env.AUTH_ALGORITHM,
}

class AuthService {
    async validateCredentials(username, password) {
        const dbRecord = await user.findUserByName(username);

        if (!dbRecord) {
            throw Exception(Exception.Types.UNAUTHORIZED, 'Username or Password is incorrect');
        } else {
            const isVaildPassword = await bcrypt.compare(password,dbRecord.pass);
            if (!isVaildPassword) {
                throw Exception(Exception.Types.UNAUTHORIZED, 'Username or Password is incorrect');
            }
            const expiry = '60m';
            const token = jwt.sign({username, email: dbRecord.email}, authConfig.secret, { algorithm: authConfig.algorithm, expiresIn: expiry });
            return { message: "Login Successfull", token: token, username};
        }
    }

    async validateToken(userConfig, token) {
        try {
            const {username} = jwt.verify(token, authConfig.secret);
            
            if ( userConfig.username === username ) {
                return true
            }
            return false

        } catch(ex) {
            return false;
        }
    }

}

module.exports = new AuthService();