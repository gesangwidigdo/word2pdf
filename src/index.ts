import express, { Request, Response } from 'express';
import router from './router/router';

const app = express();
app.use(express.json());
app.use(router);
// app.use(express.static('public'));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});