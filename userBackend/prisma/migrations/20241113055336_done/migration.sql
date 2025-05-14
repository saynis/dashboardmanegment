-- CreateTable
CREATE TABLE "Books" (
    "bookid" SERIAL NOT NULL,
    "bookname" TEXT NOT NULL,
    "booktype" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "bookimage" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "authorname" TEXT NOT NULL,
    "publisherYear" INTEGER NOT NULL,
    "addition" INTEGER NOT NULL,
    "authorid" INTEGER,
    "Langs" TEXT NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("bookid")
);

-- CreateTable
CREATE TABLE "Authors" (
    "authorid" SERIAL NOT NULL,
    "authorname" TEXT NOT NULL,
    "birthdate" INTEGER NOT NULL,
    "deathdate" INTEGER,
    "nationality" TEXT NOT NULL,
    "authorimage" TEXT NOT NULL,
    "sex" TEXT NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("authorid")
);

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Authors"("authorid") ON DELETE SET NULL ON UPDATE CASCADE;
