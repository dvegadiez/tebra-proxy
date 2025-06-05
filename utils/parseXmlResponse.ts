import { log } from 'console';
import { CalendarData, CreateAppointmentResult, CreatePatientResult, GetAppointmentsResult, GetProvidersResult , ProviderData } from '../types/tebra';

import { parseStringPromise } from 'xml2js';


export async function parseGetProvidersResponse(xml: string): Promise<GetProvidersResult> {

  const parsed = await parseStringPromise(xml, {
    explicitArray: false,
    ignoreAttrs: true
  });

  const result = parsed['s:Envelope']['s:Body']['GetProvidersResponse']['GetProvidersResult'];

  // ErrorResponse
  const err = result.ErrorResponse;
  const errorResponse = {
    isError:    err.IsError === 'true',
    errorMessage: err.ErrorMessage || undefined,
    stackTrace:   err.StackTrace || undefined
  };

  // SecurityResponse
  const sec = result.SecurityResponse;
  const practices = sec.PracticesAuthorized.PracticeID;
  const practicesAuthorized = Array.isArray(practices)
    ? practices.map((x: string) => parseInt(x, 10))
    : [parseInt(practices, 10)];

  const securityResponse = {
    authenticated:        sec.Authenticated === 'true',
    authorized:           sec.Authorized === 'true',
    customerId:           parseInt(sec.CustomerId, 10),
    customerKeyValid:     sec.CustomerKeyValid === 'true',
    securityResult:       sec.SecurityResult,
    securityResultSuccess: sec.SecurityResultSuccess === 'true',
    practicesAuthorized
  };

  // Providers
  const pd = result.Providers.ProviderData;
  const providersArray = Array.isArray(pd) ? pd : [pd];
  const providers: ProviderData[] = providersArray.map((p: any) => ({
    ID:       parseInt(p.ID, 10),
    FullName: p.FullName,
    Active:   p.Active.toLowerCase() === 'true'
  }));

  return { errorResponse, securityResponse, providers };
}

export async function parseCreatePatientResponse(xml: string): Promise<CreatePatientResult> {

  const parsed = await parseStringPromise(xml, {
    explicitArray: false,
    ignoreAttrs: true
  });

  const result = parsed['s:Envelope']['s:Body']['CreatePatientResponse']['CreatePatientResult'];

  // ErrorResponse
  const err = result.ErrorResponse;
  const errorResponse = {
    isError:    err.IsError === 'true',
    errorMessage: err.ErrorMessage || undefined,
    stackTrace:   err.StackTrace || undefined
  };

  // SecurityResponse
  const sec = result.SecurityResponse;
  const practices = sec.PracticesAuthorized.PracticeID;
  const practicesAuthorized = Array.isArray(practices)
    ? practices.map((x: string) => parseInt(x, 10))
    : [parseInt(practices, 10)];

  const securityResponse = {
    authenticated:        sec.Authenticated === 'true',
    authorized:           sec.Authorized === 'true',
    customerId:           parseInt(sec.CustomerId, 10),
    customerKeyValid:     sec.CustomerKeyValid === 'true',
    securityResult:       sec.SecurityResult,
    securityResultSuccess: sec.SecurityResultSuccess === 'true',
    practicesAuthorized
  };

  // PatiendId
  const patientId = parseInt(result.PatientID, 10);

  return { errorResponse, securityResponse, patientId };
}

export async function parseCreateAppointmentResponse(xml: string): Promise<CreateAppointmentResult> {

  const parsed = await parseStringPromise(xml, {
    explicitArray: false,
    ignoreAttrs: true
  });

  const result = parsed['s:Envelope']['s:Body']['CreateAppointmentResponse']['CreateAppointmentResult'];

  // ErrorResponse
  const err = result.ErrorResponse;
  const errorResponse = {
    isError:    err.IsError === 'true',
    errorMessage: err.ErrorMessage || undefined,
    stackTrace:   err.StackTrace || undefined
  };

  // SecurityResponse
  const sec = result.SecurityResponse;
  const practices = sec.PracticesAuthorized.PracticeID;
  const practicesAuthorized = Array.isArray(practices)
    ? practices.map((x: string) => parseInt(x, 10))
    : [parseInt(practices, 10)];

  const securityResponse = {
    authenticated:        sec.Authenticated === 'true',
    authorized:           sec.Authorized === 'true',
    customerId:           parseInt(sec.CustomerId, 10),
    customerKeyValid:     sec.CustomerKeyValid === 'true',
    securityResult:       sec.SecurityResult,
    securityResultSuccess: sec.SecurityResultSuccess === 'true',
    practicesAuthorized
  };

  // Appointment
  const appointmentData = result.Appointment;
  const appointment = {
    appointmentId:     parseInt(appointmentData.AppointmentId, 10),
    appointmentStatus: appointmentData.AppointmentStatus,
    endTime:           appointmentData.EndTime,
    patientSummary: {
      firstName: appointmentData.PatientSummary.FirstName,
      lastName:  appointmentData.PatientSummary.LastName
    },
    providerId: parseInt(appointmentData.ProviderId, 10),
    startTime:  appointmentData.StartTime
  };

  return { errorResponse, securityResponse, appointment };
}

export async function parseGetAppointmentResponse(xml: string): Promise<GetAppointmentsResult> {
  console.log(xml);
  
  const parsed = await parseStringPromise(xml, {
    explicitArray: false,
    ignoreAttrs: true
  });

  const result = parsed['s:Envelope']['s:Body']['GetAppointmentsResponse']['GetAppointmentsResult'];
  // ErrorResponse
  const err = result.ErrorResponse;
  const errorResponse = {
    isError:    err.IsError === 'true',
    errorMessage: err.ErrorMessage || undefined,
    stackTrace:   err.StackTrace || undefined
  };

  // SecurityResponse
  const sec = result.SecurityResponse;
  const practices = sec.PracticesAuthorized.PracticeID;
  const practicesAuthorized = Array.isArray(practices)
    ? practices.map((x: string) => parseInt(x, 10))
    : [parseInt(practices, 10)];

  const securityResponse = {
    authenticated:        sec.Authenticated === 'true',
    authorized:           sec.Authorized === 'true',
    customerId:           parseInt(sec.CustomerId, 10),
    customerKeyValid:     sec.CustomerKeyValid === 'true',
    securityResult:       sec.SecurityResult,
    securityResultSuccess: sec.SecurityResultSuccess === 'true',
    practicesAuthorized
  };

  const pd = result.Appointments.AppointmentData;
  const appointmentsArray = Array.isArray(pd) ? pd : [pd];

  const appointments: CalendarData[] = appointmentsArray
    .filter((p: any) => p.ID) // Filter out empty appointments
    .map((p: any) => ({
      id: p.ID, 
      appointmentStatus: p.ConfirmationStatus,
      appointmentDuration: p.AppointmentDuration,
      endDate: p.EndDate,
      resourceID1: p.ResourceID1,
      resourceName1: p.ResourceName1,
      startDate: p.StartDate  
    }));


  return { errorResponse, securityResponse, appointments };
}