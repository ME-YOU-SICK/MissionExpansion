import { notFound } from 'next/navigation';
import { QuizWorkspace } from '@/components/features/quiz/QuizWorkspace';
import { mockQuizzes } from '@/lib/utils/mockQuizData';

interface QuizPageProps {
  params: {
    quizId: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const quiz = mockQuizzes.find((item) => item.id === params.quizId);

  if (!quiz) {
    notFound();
  }

  return (
    <section className="h-[calc(100vh-2rem)] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 via-black to-slate-900 p-2">
      <QuizWorkspace quiz={quiz} />
    </section>
  );
}
