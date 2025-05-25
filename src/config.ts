import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT,
  BASIC_AUTH_USER,
  BASIC_AUTH_PASS,
  ALLOWED_ORIGIN,

  TEBRA_SOAP_URL,
  TEBRA_CUSTOMER_KEY,
  TEBRA_USER,
  TEBRA_PASSWORD,
  PRACTICE_NAME,
} = process.env;
