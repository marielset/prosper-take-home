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
  const filteredSlots = filterUnusableDates(slots, 90);
  const assessmentPairs = filteredSlots.reduce(
    (pairAcc, slotA, i, arr) => {
      for (let j = i + 1; j < arr.length; j++) {
        const slotB = arr[j];
        const differenceInDays = slotB.date.getDate() - slotA.date.getDate();

        if (differenceInDays >= 1 && differenceInDays <= 7) {
          pairAcc.push({ appointmentA: slotA.date, appointmentB: slotB.date });
        }
      }
      return pairAcc;
    },
    [] as { appointmentA: Date; appointmentB: Date }[]
  );
  return assessmentPairs;
}

function filterUnusableDates(
  slots: AvailableAppointmentSlot[],
  duration: number
) {
  if (slots.length === 0) return slots;
  let current_comparison = slots[0];
  const newDateList = [current_comparison];
  slots.forEach((slot) => {
    if (
      slot.date.getTime() - current_comparison.date.getTime() >=
      duration * 60000
    ) {
      newDateList.push(slot);
      current_comparison = slot;
    }
  });
  return newDateList;
}

async function findPatient(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id: id },
  });
  return patient;
}

export { findAppointmentsForPatient, findPatient };
