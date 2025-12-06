/* eslint-disable @typescript-eslint/no-explicit-any */
import { findQuizById } from "../../client";
import QuizPreview from "./QuizPreviewClient";

export default async function QuizPreviewPage({
  params,
}: {
  params: { cid: string; quid: string };
}) {
  const quiz = await findQuizById(params.quid);

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return <QuizPreview quiz={quiz} />;
}
//
