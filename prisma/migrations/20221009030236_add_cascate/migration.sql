-- DropForeignKey
ALTER TABLE "Certifications" DROP CONSTRAINT "Certifications_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Certifications" DROP CONSTRAINT "Certifications_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certifications" ADD CONSTRAINT "Certifications_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
