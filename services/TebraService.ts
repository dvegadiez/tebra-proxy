import { log } from "console";
import {
  SoapClient,
  buildEnvelope,
  requestHeader,
} from "../services/SoapClient";
import {  PatientDTO, AppointmentDTO, AppointmentsByDateDTO} from "../types/tebra";


export class TebraService {

  static createPatient(payload: PatientDTO) {
    const fields = Object.entries(payload)
      .map(([k, v]) => `<sch:${k}>${v}</sch:${k}>`)
      .join("");
    const inner = `
      <sch:CreatePatient>
        <sch:request>
          ${requestHeader()}
          <sch:Patient>${fields}<sch:Practice><sch:PracticeID>1</sch:PracticeID></sch:Practice></sch:Patient>
        </sch:request>
      </sch:CreatePatient>`;
    return SoapClient.call(
      "http://www.kareo.com/api/schemas/KareoServices/CreatePatient",
      buildEnvelope(inner)
    );
  }

  static createAppointment(payload: AppointmentDTO) {
    const {PatientID, ProviderID, EndTime, StartTime} = payload;
    const inner = `
      <sch:CreateAppointment>
        <sch:request>
          ${requestHeader()}
          <sch:Appointment>
                    <sch:AppointmentMode>Telehealth</sch:AppointmentMode>
                    <sch:AppointmentStatus>Scheduled</sch:AppointmentStatus>
                    <sch:AppointmentType>P</sch:AppointmentType>
                    <sch:EndTime>${EndTime}</sch:EndTime>
                    <sch:IsRecurring>false</sch:IsRecurring>
                    <sch:PatientSummary>
                        <sch:PatientId>${PatientID}</sch:PatientId>
                    </sch:PatientSummary>
                    <sch:PracticeId>1</sch:PracticeId>
                    <sch:ProviderId>${ProviderID}</sch:ProviderId>
                    <sch:ServiceLocationId>1</sch:ServiceLocationId>
                    <sch:StartTime>${StartTime}</sch:StartTime></sch:Appointment>
        </sch:request>
      </sch:CreateAppointment>`;
    log("CreateAppointment inner", inner);
    return SoapClient.call(
      "http://www.kareo.com/api/schemas/KareoServices/CreateAppointment",
      buildEnvelope(inner)
    );
  }

  static getAppointmentsByDate(payload: AppointmentsByDateDTO) {
    const filter = Object.entries(payload)
      .map(([k, v]) => `<sch:${k}>${v}</sch:${k}>`)
      .join("");

    const inner = `
      <sch:GetAppointments>
        <sch:request>
          ${requestHeader()}
          <sch:Fields><sch:AppointmentDuration>true</sch:AppointmentDuration>
               <sch:ConfirmationStatus>true</sch:ConfirmationStatus>
               <sch:EndDate>true</sch:EndDate>
               <sch:ID>true</sch:ID>
               <sch:ResourceID1>true</sch:ResourceID1>
               <sch:ResourceName1>true</sch:ResourceName1>
               <sch:StartDate>true</sch:StartDate></sch:Fields><sch:Filter>${filter}</sch:Filter>
        </sch:request>
      </sch:GetAppointments>`;

      return SoapClient.call(
      "http://www.kareo.com/api/schemas/KareoServices/GetAppointments",
      buildEnvelope(inner)
    );
  }

  static getProviders() {
    const fields = Object.entries({"Active": "true", "FullName": "true", "ID": "true"})
      .map(([k, v]) => `<sch:${k}>${v}</sch:${k}>`)
      .join("");
    const inner = `
      <sch:GetProviders>
        <sch:request>
          ${requestHeader()}
          <sch:Fields>${fields}</sch:Fields>
        </sch:request>
      </sch:GetProviders>`;
    return SoapClient.call(
      "http://www.kareo.com/api/schemas/KareoServices/GetProviders",
      buildEnvelope(inner)
    );
  }
}
