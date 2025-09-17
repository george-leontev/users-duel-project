-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "business";

-- CreateTable
CREATE TABLE "business"."user" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business"."duel" (
    "id" SERIAL NOT NULL,
    "winner_id" INTEGER NOT NULL,

    CONSTRAINT "duel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business"."duel" ADD CONSTRAINT "duel_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "business"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
