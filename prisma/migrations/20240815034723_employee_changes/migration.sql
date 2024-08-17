-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(75) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT true,
    "roles" TEXT[] DEFAULT ARRAY['user']::TEXT[],

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
