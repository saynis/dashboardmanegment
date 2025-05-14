-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Users" (
    "userid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "ROLES" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
