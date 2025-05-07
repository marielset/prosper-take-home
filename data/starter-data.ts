import { MOCK_APPOINTMENT_DATA } from "./mock-appointment-data";
import { MOCK_SLOT_DATA } from "./mock-slot-data";

export const clinician = {
  id: "9c516382-c5b2-4677-a7ac-4e100fa35bdd",
  firstName: "Jane",
  lastName: "Doe",
  states: ["NY", "FL"],
  insurances: ["AETNA", "CIGNA"],
  clinicianType: "PSYCHOLOGIST",
  appointments: MOCK_APPOINTMENT_DATA,
  availableSlots: MOCK_SLOT_DATA,
  maxDailyAppointments: 2,
  maxWeeklyAppointments: 8,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const patient = {
  id: "3c4d8e60-2f75-4b2a-9f4c-4ec75a9f8b01",
  firstName: "Byrne",
  lastName: "Hollander",
  state: "NY",
  insurance: "AETNA",
  createdAt: new Date(),
  updatedAt: new Date(),
};
