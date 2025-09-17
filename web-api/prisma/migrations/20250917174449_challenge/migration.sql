/*
  Warnings:

  - You are about to drop the `duel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "business"."duel" DROP CONSTRAINT "duel_winner_id_fkey";

-- DropTable
DROP TABLE "business"."duel";

-- CreateTable
CREATE TABLE "business"."challenge" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "challenger_id" INTEGER NOT NULL,
    "challenged_id" INTEGER NOT NULL,
    "winner_id" INTEGER,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "business"."challenge" ADD CONSTRAINT "challenge_challenger_id_fkey" FOREIGN KEY ("challenger_id") REFERENCES "business"."player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business"."challenge" ADD CONSTRAINT "challenge_challenged_id_fkey" FOREIGN KEY ("challenged_id") REFERENCES "business"."player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business"."challenge" ADD CONSTRAINT "challenge_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "business"."player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
