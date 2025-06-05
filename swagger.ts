import swaggerJsdoc from "swagger-jsdoc";

//generate content for swagger.ts
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tebra Proxy API",
      version: "1.0.0",
      description: "API documentation for Tebra Proxy service",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        // PatientDTO: {
        //   properties: {
        //     AddressLine1: {type: "string", example: "123 Main St"},
        //     DateOfBirth: {type: "string", example: "1990-01-01"},
        //     EmailAddress: {type: "string", example: "user@domain.com"},
        //     FirstName: {type: "string", example: "John"},
        //     Gender: {type: "string", example: "Male"},
        //     LastName: {type: "string", example: "Doe"},
        //     MobilePhone: {type: "string", example: "7778889999"},
        //   }
        // }, 
        NewAppointmentDTO: {
          properties: {
            AddressLine1: {type: "string", example: "123 Main St"},
            DateofBirth: {type: "string", example: "1990-01-01"},
            EmailAddress: {type: "string", example: "user@domain.com"},
            FirstName: {type: "string", example: "Test"},
            Gender: {type: "string", example: "Male"},
            LastName: {type: "string", example: "Doe"},
            MobilePhone: {type: "string", example: "7778889999"},
            ProviderID: {type: "number", example: "1"},
            StartDate: {type: "string", example: "2025-05-29T15:00:00Z"},
            EndDate: {type: "string", example: "2025-05-29T15:30:00Z"},
          }
        }, 
        // AppointmentDTO: {
        //   properties: {
        //     ProviderID: {type: "number", example: "123"},
        //     PatientID: {type: "number", example: "456"},
        //     StartTime: {type: "string", example: "2023-10-01T10:00:00Z"},
        //     EndTime: {type: "string", example: "2023-10-01T11:00:00Z"},
        //   }
        // },
        AppointmentsByDateDTO: {
          properties: {
            StartDate: {type: "string", example: "2025-05-30T10:00:00Z"},
            ResourceName: {type: "string", example: "Ana Maria Dominguez"},
          }
        },
      },
    },
  },

  apis: ["./api/routes/*.ts"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);


export default swaggerSpec;
