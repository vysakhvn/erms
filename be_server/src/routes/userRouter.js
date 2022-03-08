const express = require('express');
const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const userService = require('../services/UserService');
const ErrorResponse = require('../services/ErrorResponse');

const userRouter = express.Router();


userRouter.post(
    '/user',

    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            password: Joi.string().min(6).required(),
        }),
    }),

    async (req, res, next) => {
        try {
            res.status(201).json(await userService.createNewUser(req.body));
        } catch(ex) {
            next(ErrorResponse(ex));
        }
    }
);

module.exports = userRouter;