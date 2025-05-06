import readline from "readline";

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

      findAppointments();
    }
  );
}

findAppointments();
