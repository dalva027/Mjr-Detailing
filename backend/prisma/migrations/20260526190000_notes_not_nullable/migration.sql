-- Update existing NULL notes to empty string
UPDATE "Appointment" SET "notes" = '' WHERE "notes" IS NULL;

-- Make the column non-nullable with a default
ALTER TABLE "Appointment" ALTER COLUMN "notes" SET NOT NULL;
ALTER TABLE "Appointment" ALTER COLUMN "notes" SET DEFAULT '';