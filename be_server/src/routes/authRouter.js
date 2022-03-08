const express = require('express');
const { celebrate, Segments } = require('celebrate');
const Joi = require('joi');
const authService = require('../services/AuthService');
const ErrorResponse = require('../services/ErrorResponse');
const requireAuth = require('../middlewares/requireAuth');



const authRouter = express.Router();


authRouter.post(
    '/signin',

    celebrate({
        [Segments.BODY]: Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }),

    async (req, res, next) => {
        try {
            res.json(await authService.validateCredentials(req.body.username, req.body.password));
        } catch(ex) {
            next(ErrorResponse(ex));
        }
    }
);

authRouter.post(
    '/isvalid',

    async(req, res, next) => {
        try{
            const {username} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const isValid = await authService.validateToken({username},token);
            res.json({result: isValid});
        } catch (ex) {
            res.json({result: false});
        }
    }
);

module.exports = authRouter;