export interface Module {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  lessons: Lesson[]
  prerequisites?: string[]
  learningObjectives: string[]
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  slug: string
  duration: string
  content: string
  exercises?: Exercise[]
  quiz?: Quiz
}

export interface Exercise {
  id: string
  type: 'code' | 'terminal' | 'quiz' | 'lab'
  title: string
  description: string
  instructions: string[]
  solution?: string
  hints?: string[]
  validation?: (answer: string) => boolean
}

export interface Quiz {
  id: string
  questions: Question[]
  passingScore: number
}

export interface Question {
  id: string
  type: 'multiple-choice' | 'code-completion' | 'short-answer' | 'ordering'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export interface Lab {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  objectives: string[]
  steps: LabStep[]
  environment: 'terminal' | 'editor' | 'playground'
  startingFiles?: Record<string, string>
  solution?: Record<string, string>
}

export interface LabStep {
  id: string
  title: string
  instructions: string
  hints?: string[]
  validation?: {
    type: 'command' | 'file-exists' | 'file-content' | 'custom'
    criteria: any
  }
}
