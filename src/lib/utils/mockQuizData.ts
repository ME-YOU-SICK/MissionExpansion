export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  nodeId: string;
  questions: QuizQuestion[];
};

export const mockQuizzes: Quiz[] = [
  {
    id: 'psychology-behavioral-quiz',
    title: 'Behavioral Psychology Gauntlet',
    nodeId: 'psychology-behavioral',
    questions: [
      {
        id: 'q-reinforcement',
        text: 'Which concept describes a consequence that increases future behavior frequency?',
        options: ['Stimulus', 'Reinforcement', 'Extinction', 'Habituation'],
        correctAnswer: 'Reinforcement',
        explanation: 'Reinforcement strengthens behavior by increasing the chance it appears again.'
      },
      {
        id: 'q-extinction',
        text: 'What is the most accurate definition of behavioral extinction?',
        options: [
          'A sudden increase in a behavior after reward',
          'A behavior disappearing over time when reinforcement stops',
          'A behavior triggered by a single cue forever',
          'A form of punishment with immediate effects'
        ],
        correctAnswer: 'A behavior disappearing over time when reinforcement stops',
        explanation: 'Extinction occurs when reinforcement is removed and the learned response gradually fades.'
      },
      {
        id: 'q-conditioning',
        text: 'Conditioning is best described as:',
        options: [
          'Learning through repeated association of stimuli and outcomes',
          'Innate behavior unrelated to environment',
          'Random trial with no pattern',
          'Only conscious decision-making'
        ],
        correctAnswer: 'Learning through repeated association of stimuli and outcomes',
        explanation: 'Conditioning links behavior and stimuli/consequences through repeated association.'
      },
      {
        id: 'q-stimulus',
        text: 'In behavioral models, a stimulus is:',
        options: [
          'The final exam score',
          'An external trigger that evokes response',
          'A memory that cannot be changed',
          'Only a punishment event'
        ],
        correctAnswer: 'An external trigger that evokes response',
        explanation: 'A stimulus is any cue/event that can trigger a behavior.'
      }
    ]
  }
];
