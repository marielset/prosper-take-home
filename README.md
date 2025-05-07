# Prosper Take-Home Project

## Tech Stack

This project is built with TypeScript, using Prisma as the ORM and PostgreSQL as the database. A seed script is included to populate the database with sample data.

## Setup Instructions

1. Create a PostgreSQL database and add the connection URL to your .env file under the DATABASE_URL variable.

2. Set up and seed the database by running the following commands:

npx prisma migrate dev --name init
npm install @prisma/client
npx prisma generate
npm run db:seed

You can optionally modify the starter-data.ts file to include additional patients or clinicians before seeding.

## Running the script

To run the main logic:

npx ts-node src/services/index.ts

This script will prompt you to enter a patient ID to search for available appointment slots. In a production-ready system, you'd typically search by patient name or other metadata, and the selected patient would then be associated with an ID behind the scenes.
