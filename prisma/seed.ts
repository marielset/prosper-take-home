import {
  AppointmentStatus,
  AppointmentType,
  PrismaClient,
} from "@prisma/client";
import { patient, clinician } from "../data/starter-data";
import { ClinicianType, InsurancePayer, UsState } from "@prisma/client/wasm";

const prisma = new PrismaClient();

async function main() {
  await prisma.patient.upsert({
    where: { id: patient.id },
    update: {},
    create: {
      ...patient,
      state: patient.state as keyof typeof UsState,
      insurance: patient.insurance as keyof typeof InsurancePayer,
    },
  });

  await prisma.clinician.upsert({
    where: { id: clinician.id },
    update: {},
    create: {
      ...clinician,
      insurances: clinician.insurances.map(
        (i) => InsurancePayer[i as keyof typeof InsurancePayer]
      ),
      states: clinician.states.map((s) => UsState[s as keyof typeof UsState]),
      clinicianType: clinician.clinicianType as keyof typeof ClinicianType,
      availableSlots: {
        create: clinician.availableSlots,
      },
      appointments: {
        create: clinician.appointments.map((appointment) => ({
          scheduledFor: appointment.scheduledFor,
          appointmentType:
            appointment.appointmentType as keyof typeof AppointmentType,
          status: appointment.status as keyof typeof AppointmentStatus,
          patient: {
            connect: { id: appointment.patientId },
          },
        })),
      },
    },
  });
}

main()
  .then(() => {
    console.log("Seeding complete");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Seeding error:", e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
