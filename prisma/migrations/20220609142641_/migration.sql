/*
  Warnings:

  - A unique constraint covering the columns `[externalCode]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalCode` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "externalCode" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "externalCode" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certifications" (
    "id" SERIAL NOT NULL,
    "externalCode" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Courses_externalCode_key" ON "Courses"("externalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Certifications_externalCode_key" ON "Certifications"("externalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Students_externalCode_key" ON "Students"("externalCode");

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
