export interface UserProgress {
  userId: string
  completedModules: string[]
  completedLessons: string[]
  completedLabs: string[]
  quizScores: Record<string, number>
  currentModule?: string
  currentLesson?: string
  skillLevel: 'novice' | 'intermediate' | 'advanced' | 'expert'
  certificateEarned: boolean
}
