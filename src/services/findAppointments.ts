import { ClinicianTypes } from "../starter-code/clinician";
import { Patient } from "../starter-code/patient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findAppointmentsForPatient(patient: Patient) {
  const slots = await prisma.availableSlot.findMany({
    where: {
      clinician: {
        clinicianType: ClinicianTypes[1],
        // states: { has: patient.state },
        insurances: { has: patient.insurance },
      },
    },
    include: {
      clinician: true,
    },
  });
  return slots;
}

async function findPatient(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id: id },
  });
  return patient;
}

export { findAppointmentsForPatient, findPatient };
