const user = require('../db/models/User');
const Exception = require('./Exception');
const bcrypt = require('bcrypt');

class UserService {
    async createNewUser({email, username, password}) {
        try {
            const result = await user.createUser(
                email,
                username,
                await bcrypt.hash(password, 3),
            );
            return {message: 'success', data: result};
        } catch(ex) {
            if (ex.code === 'P2002') {
                throw Exception(Exception.Types.DATA_CONFLICT, 'email and/or username already in use');
            }
            throw Exception(Exception.Types.INTERNAL_SERVER_ERROR, ex);
        }
    }
}

module.exports = new UserService();