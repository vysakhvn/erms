const express = require('express');
const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const employeeService = require('../services/EmployeeService');
const ErrorResponse = require('../services/ErrorResponse');
const requireAuth = require('../middlewares/requireAuth');

const employeeRouter = express.Router();


employeeRouter.get(
    '/',
    requireAuth,
    celebrate({
        [Segments.QUERY]: {
            id: Joi.string().optional(),
            email: Joi.string().optional(),
            name: Joi.string().optional(),
            address: Joi.string().optional(),
            age: Joi.number().positive().integer().optional(),
            mobile: Joi.string().optional(),
        }
    }),
    async (req, res, next) => {
        try {
            res.json(await employeeService.listEmployees(req.query));
        } catch(ex) {
            next(ErrorResponse(ex));
        }
    }
);


employeeRouter.post(
    '/',
    requireAuth,
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required(),
            email: Joi.string().email().required(),
            name: Joi.string().min(1).required(),
            address: Joi.string().optional(),
            age: Joi.number().positive().integer().optional(),
            mobile: Joi.string().allow(null).min(10).max(15).optional(),
        }),
    }),

    async (req, res, next) => {
        try {
            res.json(await employeeService.addEmployee(req.body));
        } catch(ex) {
            next(ErrorResponse(ex));
        }
    }
);

employeeRouter.put(
    '/:id',
    requireAuth,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
        [Segments.BODY]: Joi.object().keys({
            id: Joi.string().optional(),
            email: Joi.string().email().optional(),
            name: Joi.string().min(1).optional(),
            address: Joi.string().optional(),
            age: Joi.number().integer().optional(),
            mobile: Joi.string().allow(null).min(10).max(15).optional(),
        }),
    }),

    async (req, res, next) => {
        try {
            const employeeId = req.params.id;
            res.json(await employeeService.updateEmployee(employeeId,req.body));
        } catch(ex) {
            next(ErrorResponse(ex));
        }
    }
);

employeeRouter.delete(
    '/:id',
    requireAuth,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),

    async (req, res, next) => {
        try {
            const employeeId = req.params.id;
            res.json(await employeeService.removeEmployee(employeeId));
        } catch(ex) {
            next(ErrorResponse(ex));
        }
    }
)

module.exports = employeeRouter;