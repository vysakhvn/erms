const db = require('../dbClient');

class User {
    async findUserByName(username) {
        return db.user.findFirst({
            where: {
                name: username,
            }
        });
    }

    async createUser(email, username, password) {
        return db.user.create({
            data: {
                email,
                name: username,
                pass: password,
            },
        });
    }
}

module.exports = new User();