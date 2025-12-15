/*
  Warnings:

  - You are about to drop the column `resolvedAt` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Incident` table. All the data in the column will be lost.
  - The `status` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED');

-- CreateEnum
CREATE TYPE "IncidentPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_teamId_fkey";

-- DropIndex
DROP INDEX "Incident_createdAt_status_idx";

-- DropIndex
DROP INDEX "Incident_teamId_severity_idx";

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "resolvedAt",
DROP COLUMN "severity",
DROP COLUMN "teamId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "priority" "IncidentPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "IncidentStatus" NOT NULL DEFAULT 'OPEN';

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
