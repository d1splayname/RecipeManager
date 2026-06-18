import express from 'express';
import apiRouter from './routes';
import "dotenv/config";
import { BASE_PATH } from '../client/basePath';

const app = express();

app.use(express.json());

app.use(BASE_PATH, express.static('public'));
app.use(BASE_PATH, apiRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
