import Link from 'next/link'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'

const moduleData: Record<string, any> = {
  '0-foundation': {
    id: '0-foundation',
    title: 'Module 0: Foundation & Context',
    description: 'Understanding the problem space, SemVer, and package registry architecture',
    duration: '1-1.5 hours',
    difficulty: 'beginner',
    learningObjectives: [
      'Understand why package managers exist',
      'Master Semantic Versioning (SemVer)',
      'Learn how package registries work',
      'Understand dependency resolution',
    ],
    lessons: [
      {
        id: '01-problem-space',
        title: 'The Problem Space',
        description: 'Why do we need package managers?',
        duration: '15 min',
      },
      {
        id: '02-semver',
        title: 'Understanding SemVer',
        description: 'Deep dive into Semantic Versioning',
        duration: '25 min',
      },
      {
        id: '03-registry',
        title: 'Package Registries',
        description: 'How npm registry works',
        duration: '20 min',
      },
    ],
  },
  '1-npm': {
    id: '1-npm',
    title: 'Module 1: npm - The Foundation',
    description: 'Deep dive into npm, package.json, package-lock.json, and npm commands',
    duration: '3-4 hours',
    difficulty: 'beginner',
    learningObjectives: [
      'Master all npm commands',
      'Understand package.json in depth',
      'Learn package-lock.json mechanics',
      'Explore node_modules structure',
    ],
    lessons: [
      {
        id: '01-intro',
        title: 'Introduction to npm',
        description: 'History and overview of npm',
        duration: '20 min',
      },
      {
        id: '02-package-json',
        title: 'package.json Deep Dive',
        description: 'Every field explained',
        duration: '45 min',
      },
    ],
  },
}

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const currentModule = moduleData[moduleId]

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Module Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Module Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {currentModule.difficulty}
            </span>
            <span className="flex items-center gap-1 text-white/90">
              <Clock className="w-4 h-4" />
              {currentModule.duration}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{currentModule.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{currentModule.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
              <ul className="space-y-2">
                {currentModule.learningObjectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons</h2>
              <div className="space-y-4">
                {currentModule.lessons.map((lesson: any, index: number) => (
                  <Link
                    key={lesson.id}
                    href={`/modules/${moduleId}/${lesson.id}`}
                    className="block p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Start Module
                </button>
                <button className="w-full bg-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                  Take Quiz
                </button>
                <button className="w-full bg-white text-gray-700 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                  Download Notes
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">0%</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">0 of {currentModule.lessons.length} lessons completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { moduleId: '0-foundation' },
    { moduleId: '1-npm' },
    { moduleId: '2-yarn' },
    { moduleId: '3-pnpm' },
    { moduleId: '4-bun' },
  ]
}
