import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { TebraService } from '../services/TebraService';
import { NewAppointmentDTO } from '../types/tebra';
import { parseCreateAppointmentResponse, parseCreatePatientResponse } from '../utils/parseXmlResponse';

const router = Router();

router.post('/new', catchAsync(async (req, res) => {
  const dto: NewAppointmentDTO = req.body;
  const { AddressLine1, DateOfBirth, EmailAddress, FirstName, Gender, LastName, MobilePhone, StartDate: StartTime, EndDate: EndTime, ProviderID } = dto;
  const patientXml = await TebraService.createPatient({
    AddressLine1,DateOfBirth,EmailAddress,FirstName,Gender,LastName,MobilePhone});
  const { patientId: PatientID } = await parseCreatePatientResponse(patientXml);
  const appointmentXml = await TebraService.createAppointment({
    PatientID, ProviderID, StartTime, EndTime });  
  const json = await parseCreateAppointmentResponse(appointmentXml);
  
  res.type('application/json').send(json);
}));

export default router;

/**
 * @openapi
 * /appointments/new:
 *   post:
 *     summary: Create a new appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewAppointmentDTO'
 *     responses:
 *       '200':
 *         description: JSON with appointments data
 */