import axios from 'axios';
import {
  TEBRA_SOAP_URL,
  TEBRA_CUSTOMER_KEY,
  TEBRA_USER,
  TEBRA_PASSWORD
} from '../config';

export class SoapClient {
  static async call(action: string, body: string): Promise<string> {
    const headers = {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': action
    };
    const envelope = `${body}`;
    const { data } = await axios.post(TEBRA_SOAP_URL!, envelope, { headers });
    return data as string;
  }
}

// Envelope builder helper
export function buildEnvelope(bodyInner: string): string {
  return `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
    <soapenv:Body>
      ${bodyInner}
    </soapenv:Body>
  </soapenv:Envelope>`;
}

// Common header snippet
export function requestHeader(): string {
  return `
    <sch:RequestHeader>
      <sch:CustomerKey>${TEBRA_CUSTOMER_KEY}</sch:CustomerKey>
      <sch:Password>${TEBRA_PASSWORD}</sch:Password>
      <sch:User>${TEBRA_USER}</sch:User>
    </sch:RequestHeader>`;
}
