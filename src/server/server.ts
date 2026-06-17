import express from 'express';
import apiRouter from './routes';
import "dotenv/config";

const app = express();

const basePath = (process.env.NODE_ENV === 'production') ? '/recipes' : '';

app.use(basePath, express.static('public'));
app.use(`/${basePath}`, apiRouter);

app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
