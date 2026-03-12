import { notFound } from 'next/navigation';
import { LessonWorkspace } from '@/components/features/lessons/LessonWorkspace';
import { mockLessons } from '@/lib/utils/mockLessonData';

interface LessonPageProps {
  params: {
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = mockLessons.find((item) => item.id === params.lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <section className="h-[calc(100vh-9.5rem)] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950/60 via-black/20 to-slate-900/60 p-2">
      <LessonWorkspace lesson={lesson} />
    </section>
  );
}
