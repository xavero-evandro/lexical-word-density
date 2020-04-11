import express from 'express';
import routes from '../src/routes/routes';
import logger from '../config/logger';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors());
app.use(routes);
app.use(errors());

logger.info('app started');

export default app;
