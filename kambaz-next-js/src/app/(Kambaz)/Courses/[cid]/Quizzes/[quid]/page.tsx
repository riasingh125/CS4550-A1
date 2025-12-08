import { findQuizById } from "../client";
import QuizDetailsClient from "./QuizDetailsClient";

export default async function QuizDetailsPage({
  params,
}: {
  params: Promise<{ cid: string; quid: string }>;
}) {
  const { cid, quid } = await params;
  const quiz = await findQuizById(quid);

  return ( 
  <><>
      <h3>Ria Singh, Gabriella Mitchell, Rachel Kahn </h3>
      <p>CS 4550, Section 11597 (Friday Section) </p>
      <p>Github links: Frontend - https://github.com/riasingh125/CS4550-A1/tree/gabi </p>
      <p>Backend - https://github.com/riasingh125/kambaz-node-server-app/tree/quizzes </p>
    </><QuizDetailsClient cid={cid} quiz={quiz} /></>
  )
}