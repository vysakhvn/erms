const db = require('../dbClient');

class Employee {
    async findAllEmployees() {
        return db.employee.findMany();
    }

    async createEmployee(employeeData) {
        return db.employee.create({
            data: employeeData,
        });
    }

    async updateEmployee(empid, employeeData) {
        return db.employee.update({
            data: employeeData,
            where: {
                id: empid,
            }
        });
    }

    async removeEmployee(employeeId) {
        return db.employee.delete({
            where: {
                id: employeeId,
            },
        })
    }

    async findEmployees(searchTerms) {

        const searchBlock = {
            id: searchTerms.id ? {
                contains: searchTerms.id,
            } : undefined,
            email: searchTerms.email ?  {
                contains: searchTerms.email,
            } : undefined,
            name: searchTerms.name ?  {
                contains: searchTerms.name,
            } : undefined,
            address: searchTerms.address ?  {
                contains: searchTerms.address,
            } : undefined,
            mobile: searchTerms.mobile ?  {
                contains: searchTerms.mobile,
            } : undefined,
            age: searchTerms.age,
        };

        return db.employee.findMany({
            where: searchBlock,
        })
    }
}

module.exports = new Employee();