import express, { Response, Request } from 'express';
import compression from 'compression';
import { limiter } from '@middlewares/limiter';
import helmet from 'helmet';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet(), compression(), limiter, express.json());

app.get('/', (_request: Request, response: Response) => {
  return response.json({
    message: 'Hello, World!',
  });
});

export default app;
