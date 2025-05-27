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

/**
 * @openapi
 * /calendar:
 *   post:
 *     summary: Gets appointments by date
 *     requestBody:
 *       required: true
 *       content: 
 *        application/json: 
 *         schema:
 *           $ref: '#/components/schemas/AppointmentsByDateDTO'
 *     responses:
 *       '200':
 *         description: XML with appointments data
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *       '401':
 *         description: Unauthorized
 */
  