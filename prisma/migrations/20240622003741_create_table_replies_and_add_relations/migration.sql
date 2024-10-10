-- CreateTable
CREATE TABLE "replies" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tweet_id" UUID NOT NULL,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
