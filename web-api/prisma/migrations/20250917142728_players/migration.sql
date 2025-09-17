/*
  Warnings:

  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business"."duel" DROP CONSTRAINT "duel_winner_id_fkey";

-- AlterTable
ALTER TABLE "business"."user" DROP COLUMN "user_name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "business"."player" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_user_id_key" ON "business"."player"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "business"."user"("email");

-- AddForeignKey
ALTER TABLE "business"."player" ADD CONSTRAINT "player_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "business"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business"."duel" ADD CONSTRAINT "duel_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "business"."player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
