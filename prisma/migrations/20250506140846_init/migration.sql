-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('ASSESSMENT_SESSION_1', 'ASSESSMENT_SESSION_2', 'THERAPY_INTAKE', 'THERAPY_SIXTY_MINS');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('UPCOMING', 'OCCURRED', 'NO_SHOW', 'RE_SCHEDULED', 'CANCELLED', 'LATE_CANCELLATION');

-- CreateEnum
CREATE TYPE "ClinicianType" AS ENUM ('THERAPIST', 'PSYCHOLOGIST');

-- CreateEnum
CREATE TYPE "UsState" AS ENUM ('NY', 'NC', 'FL');

-- CreateEnum
CREATE TYPE "InsurancePayer" AS ENUM ('AETNA', 'BCBS', 'CIGNA');

-- CreateTable
CREATE TABLE "AvailableSlot" (
    "id" TEXT NOT NULL,
    "clinicianId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "length" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AvailableSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "clinicianId" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "appointmentType" "AppointmentType" NOT NULL,
    "status" "AppointmentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "state" "UsState" NOT NULL,
    "insurance" "InsurancePayer" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinician" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "states" "UsState"[],
    "insurances" "InsurancePayer"[],
    "clinicianType" "ClinicianType" NOT NULL,
    "maxDailyAppointments" INTEGER NOT NULL,
    "maxWeeklyAppointments" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clinician_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AvailableSlot" ADD CONSTRAINT "AvailableSlot_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "Clinician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clinicianId_fkey" FOREIGN KEY ("clinicianId") REFERENCES "Clinician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
