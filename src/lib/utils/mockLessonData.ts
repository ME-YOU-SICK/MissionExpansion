export type VocabularyTerm = {
  term: string;
  definition: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  vocabulary: VocabularyTerm[];
  concepts: string[];
};

export const mockLessons: Lesson[] = [
  {
    id: 'psychology-behavioral',
    title: 'Behavioral Psychology Foundations',
    description:
      'Master the vocabulary that explains how behavior is shaped through reinforcement, stimuli, and conditioning patterns.',
    vocabulary: [
      {
        term: 'Reinforcement',
        definition: 'A consequence that increases the likelihood a behavior will occur again.'
      },
      {
        term: 'Conditioning',
        definition: 'A learning process where behavior becomes associated with stimuli or consequences.'
      },
      {
        term: 'Stimulus',
        definition: 'An external trigger that provokes a behavioral or cognitive response.'
      },
      {
        term: 'Extinction',
        definition: 'The gradual weakening of a learned behavior when reinforcement stops.'
      }
    ],
    concepts: [
      'Behavioral psychology focuses on observable actions instead of internal mental states.',
      'Habits can be designed by controlling environmental triggers and reward loops.'
    ]
  }
];
