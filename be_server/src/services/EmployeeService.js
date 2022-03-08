const employee = require('../db/models/Employee');
const Exception = require('./Exception');

class EmployeeService {

    async addEmployee(bodyParams) {
        const {id, name, email, age, address, mobile} = bodyParams;
        try {
            return await employee.createEmployee({id, name, email, age, address, mobile}); 
        } catch(ex) {
            if (ex.code === 'P2002') {
                throw Exception(Exception.Types.DUPLICATE_CONFLICT, 'Employee ID already exists');
            }
            throw Exception(Exception.Types.INTERNAL_SERVER_ERROR, 'DB Error: Data cannot be wrtten to DB');
        }
    }

    async updateEmployee(employeeId,bodyParams) {
        try {
            return await employee.updateEmployee(employeeId, bodyParams); 
        } catch(ex) {
            if (ex.code === 'P2002') {
                throw Exception(Exception.Types.DUPLICATE_CONFLICT, 'Employee ID already exists');
            }

            if (ex.code === 'P2025') {
                throw Exception(Exception.Types.RESOURCE_NOT_FOUND, 'Employee not found');
            }

            throw Exception(Exception.Types.INTERNAL_SERVER_ERROR, 'DB Error: Data cannot be wrtten to DB');
        }
    }

    async removeEmployee(id) {
        try {
            return await employee.removeEmployee(id); 
        } catch(ex) {
            if (ex.code === 'P2025') {
                throw Exception(Exception.Types.RESOURCE_NOT_FOUND, 'Employee not found');
            }
            throw Exception(Exception.Types.INTERNAL_SERVER_ERROR, 'DB Error: Data cannot be removed from DB');
        }
    }

    async findEmployees({id, email, name, age, address, mobile}) {
        try {
            return await employee.findAllEmployees({id, email, name, age, address, mobile}); 
        } catch(ex) {
            throw Exception(Exception.Types.INTERNAL_SERVER_ERROR, 'DB Error: Data cannot be accessed from DB');
        }
    }

    async listEmployees({id, email, name, age, address, mobile}) {
        try {
            return await employee.findEmployees({id, email, name, age, address, mobile}); 
        } catch(ex) {
            throw Exception(Exception.Types.INTERNAL_SERVER_ERROR, 'DB Error: Data cannot be accessed from DB');
        }
    }
}

module.exports = new EmployeeService();