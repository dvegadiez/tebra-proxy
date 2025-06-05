import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT } from '../config';
import { auth } from '../middleware/auth';
import { corsOptions } from '../middleware/cors';
import { errorHandler } from '../middleware/errorHandler';
import calendarRouter from '../routes/calendar';
import appointmentsRouter from '../routes/appointments';
import providersRouter from '../routes/providers';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
// app.use(auth);

app.use('/calendar', calendarRouter);
app.use('/appointments', appointmentsRouter);
app.use('/providers', providersRouter);

// Error handler al final
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server escuchando en puerto ${PORT}`);
});

module.exports = app;
