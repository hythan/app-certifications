-- AlterTable
ALTER TABLE "Certifications" ALTER COLUMN "externalCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "externalCode" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "externalCode" DROP NOT NULL;
