-- CreateTable
CREATE TABLE "alumni" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "grad_year" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "current_role" TEXT,
    "company" TEXT,
    "location" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "bio" TEXT,
    "image_url" TEXT,
    "linked_in" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alumni_pkey" PRIMARY KEY ("id")
);
