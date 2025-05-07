-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UsState" ADD VALUE 'AL';
ALTER TYPE "UsState" ADD VALUE 'AK';
ALTER TYPE "UsState" ADD VALUE 'AZ';
ALTER TYPE "UsState" ADD VALUE 'AR';
ALTER TYPE "UsState" ADD VALUE 'CA';
ALTER TYPE "UsState" ADD VALUE 'CO';
ALTER TYPE "UsState" ADD VALUE 'CT';
ALTER TYPE "UsState" ADD VALUE 'DE';
ALTER TYPE "UsState" ADD VALUE 'GA';
ALTER TYPE "UsState" ADD VALUE 'HI';
ALTER TYPE "UsState" ADD VALUE 'ID';
ALTER TYPE "UsState" ADD VALUE 'IL';
ALTER TYPE "UsState" ADD VALUE 'IN';
ALTER TYPE "UsState" ADD VALUE 'IA';
ALTER TYPE "UsState" ADD VALUE 'KS';
ALTER TYPE "UsState" ADD VALUE 'KY';
ALTER TYPE "UsState" ADD VALUE 'LA';
ALTER TYPE "UsState" ADD VALUE 'ME';
ALTER TYPE "UsState" ADD VALUE 'MD';
ALTER TYPE "UsState" ADD VALUE 'MA';
ALTER TYPE "UsState" ADD VALUE 'MI';
ALTER TYPE "UsState" ADD VALUE 'MN';
ALTER TYPE "UsState" ADD VALUE 'MS';
ALTER TYPE "UsState" ADD VALUE 'MO';
ALTER TYPE "UsState" ADD VALUE 'MT';
ALTER TYPE "UsState" ADD VALUE 'NE';
ALTER TYPE "UsState" ADD VALUE 'NV';
ALTER TYPE "UsState" ADD VALUE 'NH';
ALTER TYPE "UsState" ADD VALUE 'NJ';
ALTER TYPE "UsState" ADD VALUE 'NM';
ALTER TYPE "UsState" ADD VALUE 'ND';
ALTER TYPE "UsState" ADD VALUE 'OH';
ALTER TYPE "UsState" ADD VALUE 'OK';
ALTER TYPE "UsState" ADD VALUE 'OR';
ALTER TYPE "UsState" ADD VALUE 'PA';
ALTER TYPE "UsState" ADD VALUE 'RI';
ALTER TYPE "UsState" ADD VALUE 'SC';
ALTER TYPE "UsState" ADD VALUE 'SD';
ALTER TYPE "UsState" ADD VALUE 'TN';
ALTER TYPE "UsState" ADD VALUE 'TX';
ALTER TYPE "UsState" ADD VALUE 'UT';
ALTER TYPE "UsState" ADD VALUE 'VT';
ALTER TYPE "UsState" ADD VALUE 'VA';
ALTER TYPE "UsState" ADD VALUE 'WA';
ALTER TYPE "UsState" ADD VALUE 'WV';
ALTER TYPE "UsState" ADD VALUE 'WI';
ALTER TYPE "UsState" ADD VALUE 'WY';
