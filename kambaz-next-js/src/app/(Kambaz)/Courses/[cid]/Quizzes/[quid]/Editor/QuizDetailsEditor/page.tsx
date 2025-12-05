/* eslint-disable @typescript-eslint/no-explicit-any */
import { findQuizById } from "../../../client";
import QuizDetailsEditorClient from "./QuizDetailsEditorClient";

export default async function QuizDetailsEditorPage({
  params,
}: {
  params: { cid: string; quid: string };
}) {
  const quiz = await findQuizById(params.quid);

  
  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <QuizDetailsEditorClient
      cid={params.cid}
      quiz={quiz}
    />
  );
}
