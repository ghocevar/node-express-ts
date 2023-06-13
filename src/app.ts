import express, { Response, Request } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { limiter } from '@middlewares/limiter';
import { errorHandler } from '@middlewares/errorHandler';
import { NotFoundException } from '@errors/http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet(), compression(), limiter, express.json());

app.get('/', (_request: Request, response: Response) => {
  return response.json({
    message: 'Hello, World!',
  });
});

app.get('/:name', (request: Request, response: Response) => {
  const { name } = request.params;

  throw new NotFoundException(`User ${name} not found`);
});

app.use(errorHandler);

export default app;
