import readline from "readline";
import { findAppointmentsForPatient, findPatient } from "./findAppointments";
import { AvailableAppointmentSlot } from "../starter-code/appointment";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function findAppointments() {
  console.log(`\n--- Welcome to your appointment finder ---`);
  rl.question(
    `Enter a patient ID to fetch available slots, or type 'exit' to exit: \n`,
    async (answer) => {
      const id = answer.trim();
      if (id === "exit") {
        console.log("👋 Exiting...");
        rl.close();
        return;
      }
      const patient = await findPatient(id);
      console.log(patient);
      if (!patient) {
        console.log("Invalid patient ID, try again.");
      } else {
        const slots: AvailableAppointmentSlot[] =
          await findAppointmentsForPatient(patient);
        console.log(slots.slice(0, 5));
      }

      findAppointments();
    }
  );
}

findAppointments();
