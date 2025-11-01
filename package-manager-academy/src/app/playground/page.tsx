import Link from 'next/link'
import { Code, Terminal, Package, ArrowLeft } from 'lucide-react'

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Interactive Playground</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-500 transition">
            <Code className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">package.json Validator</h3>
            <p className="text-gray-600 mb-4">
              Validate and analyze your package.json files with real-time feedback.
            </p>
            <button className="text-blue-600 hover:underline">Coming Soon →</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-500 transition">
            <Terminal className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Terminal</h3>
            <p className="text-gray-600 mb-4">
              Practice package manager commands in a safe, simulated environment.
            </p>
            <button className="text-blue-600 hover:underline">Coming Soon →</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-500 transition">
            <Package className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dependency Visualizer</h3>
            <p className="text-gray-600 mb-4">
              Visualize dependency trees and understand how packages are resolved.
            </p>
            <button className="text-blue-600 hover:underline">Coming Soon →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
