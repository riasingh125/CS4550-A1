export default [
  {
    _id: "q101",
    course: "123",
    title: "Quiz 1: Introduction",
    published: false,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "After submission",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    points: 10,
    dueDate: "2025-12-30T23:59:00",
    availableDate: "2025-12-20T00:00:00",
    untilDate: "2026-01-05T23:59:00",
    questions: [
      { _id: "q1-1", type: "MCQ", title: "What is React?", points: 5 },
      { _id: "q1-2", type: "TF", title: "Next.js supports SSR.", points: 5 }
    ]
  },

  {
    _id: "q102",
    course: "123",
    title: "Quiz 2: Components & Props",
    published: true,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 30,
    multipleAttempts: true,
    howManyAttempts: 3,
    showCorrectAnswers: "After each attempt",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    points: 15,
    dueDate: "2026-01-10T23:59:00",
    availableDate: "2026-01-02T00:00:00",
    untilDate: "2026-01-15T23:59:00",
    questions: [
      { _id: "q2-1", type: "MCQ", title: "What is a prop?", points: 5 },
      { _id: "q2-2", type: "MCQ", title: "Are props immutable?", points: 5 },
      { _id: "q2-3", type: "TF", title: "Props can be changed by children.", points: 5 }
    ]
  },

  {
    _id: "q201",
    course: "234",
    title: "Quiz A: SQL Basics",
    published: true,
    quizType: "Graded Quiz",
    assignmentGroup: "Exams",
    shuffleAnswers: false,
    timeLimit: 45,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "After quiz closes",
    accessCode: "SQL2024",
    oneQuestionAtATime: true,
    webcamRequired: true,
    lockQuestionsAfterAnswering: true,
    points: 20,
    dueDate: "2025-12-29T23:59:00",
    availableDate: "2025-12-18T00:00:00",
    untilDate: "2026-01-02T23:59:00",
    questions: [
      { _id: "qA-1", type: "MCQ", title: "What does SELECT do?", points: 10 },
      { _id: "qA-2", type: "MCQ", title: "What is a primary key?", points: 10 }
    ]
  },

  {
    _id: "q301",
    course: "345",
    title: "Quiz 1: Algorithms Intro",
    published: false,
    quizType: "Practice Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: true,
    howManyAttempts: -1,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    points: 5,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    questions: []
  }
];