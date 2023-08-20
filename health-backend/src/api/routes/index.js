import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import user from './user.js';
import doctor from './doctor.js';
import hospital from './hospital.js';
import auth from './auth.js';

const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use('/', auth);
router.use('/user', user);
router.use('/doctor', doctor);
router.use('/hospital', hospital);

export default router;