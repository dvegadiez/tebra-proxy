import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { TebraService } from '../services/TebraService';
import { AppointmentsByDateDTO } from '../types/tebra';
import { parseGetAppointmentResponse } from '../utils/parseXmlResponse';
import { getAvailability } from '../utils/schedule';

const router = Router();

router.post('/', catchAsync(async (req, res) => {
  const dto: AppointmentsByDateDTO = req.body;
  const xml = await TebraService.getAppointmentsByDate(dto);
  const json = await parseGetAppointmentResponse(xml);
  const calendar = getAvailability(json.appointments);

  res.type('application/json').send(calendar);
}));

export default router;

  