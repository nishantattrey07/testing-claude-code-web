import Link from 'next/link'
import { Package, BookOpen, Code, Terminal, Zap } from 'lucide-react'

const modules = [
  {
    id: '0-foundation',
    title: 'Module 0: Foundation & Context',
    description: 'Understanding the problem space, SemVer, and package registry architecture',
    duration: '1-1.5 hours',
    difficulty: 'beginner',
    icon: BookOpen,
    color: 'bg-blue-500',
  },
  {
    id: '1-npm',
    title: 'Module 1: npm - The Foundation',
    description: 'Deep dive into npm, package.json, package-lock.json, and npm commands',
    duration: '3-4 hours',
    difficulty: 'beginner',
    icon: Package,
    color: 'bg-red-500',
  },
  {
    id: '2-yarn',
    title: 'Module 2: Yarn - The Speed Challenger',
    description: 'Explore Yarn classic and Berry, workspaces, and PnP',
    duration: '2-3 hours',
    difficulty: 'intermediate',
    icon: Code,
    color: 'bg-blue-600',
  },
  {
    id: '3-pnpm',
    title: 'Module 3: pnpm - The Disk Space Saver',
    description: 'Learn about pnpm symlinks, content-addressable storage, and efficiency',
    duration: '2-3 hours',
    difficulty: 'intermediate',
    icon: Terminal,
    color: 'bg-yellow-500',
  },
  {
    id: '4-bun',
    title: 'Module 4: Bun - The All-in-One',
    description: 'Explore Bun as a runtime, bundler, and package manager',
    duration: '2-3 hours',
    difficulty: 'intermediate',
    icon: Zap,
    color: 'bg-orange-500',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Package Manager Academy</h1>
                <p className="text-gray-600">Master npm, Yarn, pnpm & Bun</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Learn Package Managers
            <span className="text-blue-600"> Inside Out</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A comprehensive, interactive course designed for senior developers who want to master
            JavaScript package managers from the ground up.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/modules/0-foundation"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Learning
            </Link>
            <Link
              href="/playground"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600">10</div>
            <div className="text-gray-600 mt-2">Modules</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600 mt-2">Lessons</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600">20+</div>
            <div className="text-gray-600 mt-2">Labs</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600">15-20h</div>
            <div className="text-gray-600 mt-2">Total Time</div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">Course Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Link
                key={module.id}
                href={`/modules/${module.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-start gap-4">
                  <div className={`${module.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {module.duration}
                      </span>
                      <span className="capitalize">{module.difficulty}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 Package Manager Academy. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  )
}
