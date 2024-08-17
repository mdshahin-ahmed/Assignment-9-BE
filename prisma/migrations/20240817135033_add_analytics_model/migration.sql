-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_label_key" ON "Analytics"("label");
