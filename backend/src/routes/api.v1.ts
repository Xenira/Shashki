import * as bodyParser from 'body-parser';
import { Router } from 'express';
// Import used controllers
// import * as ctrlEWS from '../controllers/*.controller';

const router: Router = Router();
const jsonParser = bodyParser.json();

// router.get('/path', jsonParser, ctrl.getFunction);
// router.post('/path', jsonParser, ctrl.postFunction);
// router.put('/path', jsonParser, ctrl.putFunction);
// router.delete('/path', jsonParser, ctrl.deleteFunction);

export default router;
