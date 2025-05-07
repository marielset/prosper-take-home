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
  const assessmentPairsByClinician = await Promise.all(
    clinicians.map(async (c: Clinician) => ({
      firstName: c.firstName,
      lastName: c.lastName,
      slots: await mergeSlots(c.availableSlots, c),
    }))
  );
  return assessmentPairsByClinician;
}

async function mergeSlots(
  slots: AvailableAppointmentSlot[],
  clinician: Clinician
) {
  const filteredSlots = await filterUnusableDates(slots, clinician);
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

async function filterUnusableDates(
  slots: AvailableAppointmentSlot[],
  clinician: Clinician
) {
  if (slots.length === 0) return slots;
  const duration = clinician.clinicianType === ClinicianTypes[0] ? 60 : 90;
  const weeklyAppointmentCounts = {};
  const dailyAppointmentCounts = {};

  let current_comparison = slots[0];
  const newDateList = [current_comparison];
  for (const slot of slots) {
    if (
      slot.date.getTime() - current_comparison.date.getTime() >=
        duration * 60000 &&
      (await canAddDailyAppointment(
        clinician,
        dailyAppointmentCounts,
        slot.date
      )) &&
      (await canAddWeeklyAppointment(
        clinician,
        weeklyAppointmentCounts,
        slot.date
      ))
    ) {
      newDateList.push(slot);
      current_comparison = slot;
    }
  }
  return newDateList;
}

async function canAddDailyAppointment(
  clinician: Clinician,
  dailyCounts: Record<string, number>,
  appointmentDate: Date
) {
  const startOfTheDay = new Date(appointmentDate);
  startOfTheDay.setUTCHours(0, 0, 0, 0);
  if (!(startOfTheDay.getTime() in dailyCounts)) {
    const count = await checkDailyAppointments(startOfTheDay, clinician.id);
    dailyCounts[startOfTheDay.getTime()] = count;
  }

  return dailyCounts[startOfTheDay.getTime()] < clinician.maxDailyAppointments;
}

async function canAddWeeklyAppointment(
  clinician: Clinician,
  weeklyCounts: Record<string, number>,
  appointmentDate: Date
) {
  const startOfTheWeek = getStartOfTheWeek(appointmentDate);
  if (!(startOfTheWeek.getTime() in weeklyCounts)) {
    const count = await checkWeeklyAppointments(startOfTheWeek, clinician.id);
    weeklyCounts[startOfTheWeek.getTime()] = count;
  }
  return (
    weeklyCounts[startOfTheWeek.getTime()] < clinician.maxWeeklyAppointments
  );
}

async function checkWeeklyAppointments(
  startOfTheWeek: Date,
  clinicianId: string
) {
  const endOfTheWeek = new Date(startOfTheWeek);
  endOfTheWeek.setDate(startOfTheWeek.getDate() + 7);
  return await prisma.appointment.count({
    where: {
      clinicianId: clinicianId,
      scheduledFor: { gte: startOfTheWeek, lt: endOfTheWeek },
    },
  });
}

function getStartOfTheWeek(appointmentDate: Date) {
  const startOfTheWeek = new Date(appointmentDate);
  startOfTheWeek.setDate(appointmentDate.getDate() - appointmentDate.getDay());
  startOfTheWeek.setUTCHours(0, 0, 0, 0);
  return startOfTheWeek;
}

async function checkDailyAppointments(
  startOfTheDay: Date,
  clinicianId: string
) {
  const endOfTheDay = new Date(startOfTheDay);
  endOfTheDay.setUTCDate(endOfTheDay.getUTCDate() + 1);
  return await prisma.appointment.count({
    where: {
      clinicianId: clinicianId,
      scheduledFor: { gte: startOfTheDay, lt: endOfTheDay },
    },
  });
}

async function findPatient(id: string) {
  const patient = await prisma.patient.findUnique({
    where: { id: id },
  });
  return patient;
}

export { findAppointmentsForPatient, findPatient };
