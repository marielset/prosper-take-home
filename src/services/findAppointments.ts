import { AvailableAppointmentSlot } from "../starter-code/appointment";
import { Clinician, ClinicianTypes } from "../starter-code/clinician";
import { Patient } from "../starter-code/patient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findAppointmentsForPatient(patient: Patient) {
  const clinicians = await prisma.clinician.findMany({
    where: {
      clinicianType: ClinicianTypes[1],
      // states: { has: patient.state }, // add this back when you've filled in states
      insurances: { has: patient.insurance },
    },
    include: {
      availableSlots: { take: 15, orderBy: { date: "asc" } }, // remove take 6 when done
      appointments: true,
    },
  });
  const assessmentPairsByClinician = clinicians.map((c: Clinician) => ({
    firstName: c.firstName,
    lastName: c.lastName,
    slots: mergeSlots(c.availableSlots),
  }));
  return assessmentPairsByClinician;
}

function mergeSlots(slots: AvailableAppointmentSlot[]) {
  const assessmentPairs = slots.reduce(
    (pairAcc, slotA, i, arr) => {
      for (let j = i + 1; j < arr.length; j++) {
        const slotB = arr[j];
        const differenceInDays =
          new Date(slotB.date).getDate() - new Date(slotA.date).getDate();

        if (differenceInDays > 1 && differenceInDays <= 7) {
          pairAcc.push({ appointmentA: slotA.date, appointmentB: slotB.date });
        }
      }
      return pairAcc;
    },
    [] as { appointmentA: Date; appointmentB: Date }[]
  );
  return assessmentPairs;
}

async function findPatient(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id: id },
  });
  return patient;
}

export { findAppointmentsForPatient, findPatient };
