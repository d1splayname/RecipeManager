import express from 'express';
import apiRouter from './routes';
import "dotenv/config";

const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
