import { Router } from 'express';

import DecodeController from './controllers/DecodeController';

const routes = new Router();

routes.get('/decode', DecodeController.index);
routes.post('/decode', DecodeController.store);

export default routes;
