'use strict';
import { Router } from 'express';
import Controller from '../controllers/Controller';
import { celebrate, Segments, Joi } from 'celebrate';

const routes = Router();

routes.post(
  '/complexity',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      text: Joi.string().required(),
    }),
  }),
  Controller.getLexicalWordsDensity
);

routes.post(
  '/lexical-word/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      words: Joi.array().required(),
    }),
  }),
  Controller.addLexicalWords
);

export default routes;
