-- CreateEnum
CREATE TYPE "RoundStatusEnum" AS ENUM ('in_progress', 'completed', 'discontinued');

-- DropEnum
DROP TYPE "JourneyStatusEnum";

-- CreateTable
CREATE TABLE "candidates" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profile_data" JSONB,
    "notification_preferences" JSONB NOT NULL DEFAULT '{"email":true,"browser":false,"mobile":false}',

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "job_role" TEXT NOT NULL,
    "round_config" JSONB NOT NULL,
    "num_of_rounds" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_assessment_rounds" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "assessmentRoundsId" TEXT NOT NULL,
    "roundCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentRound" INTEGER NOT NULL DEFAULT 1,
    "status" "RoundStatusEnum" NOT NULL DEFAULT 'in_progress',
    "assessmentRoundData" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "candidate_assessment_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_submissions" (
    "id" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "attemptNumber" INTEGER NOT NULL,
    "submissionCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "SubmissionStatusEnum" NOT NULL DEFAULT 'created',
    "submissionData" JSONB NOT NULL DEFAULT '{}',
    "reviewStatus" JSONB NOT NULL DEFAULT '{"current_stage": "created", "stages": {"submitted": null, "ai_review": null, "technical_review": null, "feedback_preparation": null, "completed": null}, "expected_completion": null}',

    CONSTRAINT "assessment_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidates_email_key" ON "candidates"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidates_user_id_key" ON "candidates"("user_id");

-- CreateIndex
CREATE INDEX "idx_candidates_email" ON "candidates"("email");

-- CreateIndex
CREATE INDEX "idx_assessment_rounds_job_role" ON "assessments"("job_role");

-- CreateIndex
CREATE INDEX "idx_assessment_rounds_active" ON "assessments"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_assessment_rounds_roundCode_key" ON "candidate_assessment_rounds"("roundCode");

-- CreateIndex
CREATE INDEX "idx_journey_candidate" ON "candidate_assessment_rounds"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_submissions_submissionCode_key" ON "assessment_submissions"("submissionCode");

-- CreateIndex
CREATE INDEX "idx_submissions_round" ON "assessment_submissions"("roundId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_submissions_roundId_roundNumber_attemptNumber_key" ON "assessment_submissions"("roundId", "roundNumber", "attemptNumber");

-- AddForeignKey
ALTER TABLE "candidate_assessment_rounds" ADD CONSTRAINT "candidate_assessment_rounds_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_assessment_rounds" ADD CONSTRAINT "candidate_assessment_rounds_assessmentRoundsId_fkey" FOREIGN KEY ("assessmentRoundsId") REFERENCES "assessments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_submissions" ADD CONSTRAINT "assessment_submissions_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "candidate_assessment_rounds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
