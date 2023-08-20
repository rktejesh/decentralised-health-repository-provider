import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import Connection from './fabric.js';

export default async (app) => {
  await mongooseLoader();
  await new Connection().init();
  expressLoader(app);
}