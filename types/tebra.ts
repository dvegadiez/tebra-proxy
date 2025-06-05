

export interface PatientDTO {
  AddressLine1: string;
  DateofBirth: string;
  EmailAddress: string;
  FirstName: string;
  Gender: string;
  LastName: string;
  MobilePhone: string;
}

export interface AppointmentDTO {
  ProviderID: number;
  PatientID: number;
  StartTime: string;
  EndTime: string;
}

export interface AppointmentsByDateDTO {
  EndDate: string;
  ResourceName: string;
  StartDate: string;
  TimeZoneOffsetFromGMT: string;
}   

export interface ProviderData {
  ID: number;
  FullName: string;
  Active: boolean;
}

export interface PatientData {
  AddressLine1: string;
  DateofBirth: string;
  EmailAddress: string;
  FirstName: string;
  LastName: string;
  MobilePhone: string;
}

export interface NewAppointmentDTO {
  AddressLine1: string;
  DateofBirth: string;
  EmailAddress: string;
  FirstName: string;
  Gender: string;
  LastName: string;
  MobilePhone: string;
  ProviderID: number;
  StartDate: string;
  EndDate: string;
}

export interface AppointmentData {
  appointmentId: number;
  appointmentStatus: string;
  endTime: string;
  patientSummary: {
    firstName: string;
    lastName: string;
  };
  providerId: number;
  startTime: string;
}

export interface GetProvidersResult {
  errorResponse: ErrorResponse
  securityResponse: SecurityResponse
  providers: ProviderData[];
}

export interface CreatePatientResult {
  errorResponse: ErrorResponse
  securityResponse: SecurityResponse
  patientId: number;
}

export interface CreateAppointmentResult {
  errorResponse: ErrorResponse
  securityResponse: SecurityResponse
  appointment: AppointmentData;
}

export interface GetAppointmentsResult {
  errorResponse: ErrorResponse
  securityResponse: SecurityResponse
  appointments: CalendarData[];
}

export interface CalendarData {
  id: number;
  appointmentStatus: string;
  appointmentDuration: string;
  endDate: string;
  resourceID1: number;
  resourceName1: string;
  startDate: string;
}


interface ErrorResponse {
  isError: boolean
  errorMessage?: string
  stackTrace?: string
}

interface SecurityResponse {
  authenticated: boolean
  authorized: boolean
  customerId: number
  customerKeyValid: boolean
  practicesAuthorized: number[]
  securityResult: string
  securityResultSuccess: boolean
}

