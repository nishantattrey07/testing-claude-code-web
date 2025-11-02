import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import PackageJsonValidator from '@/components/PackageJsonValidator'
import InteractiveQuiz, { type Question } from '@/components/InteractiveQuiz'

// Deep interview-style questions
const playgroundQuestions: Question[] = [
  {
    id: 'q1',
    question: 'What is the difference between Bun and Node.js at the engine level?',
    type: 'multiple-choice',
    options: [
      'Bun uses V8 engine, Node.js uses JavaScriptCore',
      'Bun uses JavaScriptCore (from WebKit), Node.js uses V8 (from Chrome)',
      'They both use V8 but different versions',
      'Bun uses SpiderMonkey, Node.js uses V8'
    ],
    correctAnswer: 1,
    explanation: 'Bun uses JavaScriptCore from WebKit (Safari\'s engine) which prioritizes faster startup and lower memory, while Node.js uses Google\'s V8 engine which prioritizes runtime optimization. This is why Bun is faster for serverless/edge deployments with cold starts.',
    difficulty: 'advanced',
    interviewContext: 'This is a common deep-dive interview question. Know that JavaScriptCore gives Bun 4× faster HTTP throughput and better cold-start performance.'
  },
  {
    id: 'q2',
    question: 'If you remove all devDependencies from package.json and reinstall, will your production app still work?',
    type: 'true-false',
    correctAnswer: true,
    explanation: 'YES! devDependencies are only needed for development tasks (testing, building, linting). Production apps only need dependencies. In fact, npm install --production specifically excludes devDependencies to keep production lean.',
    difficulty: 'beginner',
    interviewContext: 'Interviewers love this question. It tests if you understand the purpose of dependency separation. Common follow-up: "What breaks if you remove them?" Answer: Development tasks like npm run test or npm run build.'
  },
  {
    id: 'q3',
    question: 'What gets included in a Vite production bundle?',
    type: 'multiple-choice',
    options: [
      'Everything in node_modules and all project files',
      'Only imported/referenced code, small assets inlined as base64, large assets as separate files',
      'Only JavaScript files, no CSS or assets',
      'All files in the src/ directory'
    ],
    correctAnswer: 1,
    explanation: 'Vite only includes code that is actually imported/referenced. Assets <4KB (default) are inlined as base64 data URLs. Larger assets become separate files. node_modules dependencies are typically excluded (installed separately via package.json). This is why Vite is so efficient!',
    difficulty: 'intermediate',
    interviewContext: 'Know that Vite processes only what\'s needed. If you have 100 pages and modify 1, Vite only processes that page (vs webpack bundling everything).'
  },
  {
    id: 'q4',
    question: 'What is the difference between public/ and src/assets/ folders in a Vite project?',
    type: 'multiple-choice',
    options: [
      'No difference, they are aliases for each other',
      'public/ is for development, src/assets/ is for production',
      'public/ files are copied as-is with fixed URLs, src/assets/ files are processed and get hashed filenames',
      'public/ is for images, src/assets/ is for code'
    ],
    correctAnswer: 2,
    explanation: 'public/ files are copied to output as-is (robots.txt, favicon.ico) and referenced via /filename. src/assets/ files are processed by Vite, get hashed filenames (img.abc123.jpg) for cache-busting, and are only included if imported. Use public/ for files needing fixed URLs, src/assets/ for everything else.',
    difficulty: 'intermediate',
    interviewContext: 'This tests understanding of build tools. Interviewers might ask "When would you use public/ vs assets/?" Answer: public/ for robots.txt or files external systems reference, assets/ for images/fonts referenced in code.'
  },
  {
    id: 'q5',
    question: 'What is an "integrity" hash in package-lock.json and why does it matter?',
    type: 'multiple-choice',
    options: [
      'A version number for the package',
      'A SHA-512 cryptographic hash to verify package contents haven\'t been tampered with',
      'The download URL for the package',
      'A timestamp of when the package was published'
    ],
    correctAnswer: 1,
    explanation: 'The integrity field contains a SHA-512 hash of the package contents. When npm installs, it downloads the package, recalculates the hash, and compares it to the lockfile. If they don\'t match, installation fails - this prevents supply chain attacks and corrupted packages.',
    difficulty: 'advanced',
    interviewContext: 'Security-focused question. Know that npm moved from SHA-1 to SHA-512 for stronger security. This is how npm ensures packages weren\'t tampered with between publish and install.'
  },
  {
    id: 'q6',
    question: 'What are "phantom dependencies" and which package manager solves this problem?',
    type: 'multiple-choice',
    options: [
      'Dependencies that fail to install, solved by npm',
      'Dependencies not declared in package.json but accessible due to hoisting, solved by pnpm',
      'Old unused dependencies, solved by npm prune',
      'Dependencies with security vulnerabilities, solved by npm audit'
    ],
    correctAnswer: 1,
    explanation: 'Phantom dependencies are packages not in YOUR package.json but accessible because npm/yarn hoisted them to top-level node_modules (they came from another package\'s dependencies). pnpm solves this with symlinks - only declared dependencies are accessible. This prevents "works on my machine" bugs.',
    difficulty: 'advanced',
    interviewContext: 'Advanced architectural question. Interviewers testing monorepo or deep package manager knowledge ask this. Know that pnpm\'s strict mode prevents phantom deps, while npm/yarn\'s flat structure allows them.'
  },
  {
    id: 'q7',
    question: 'You have a React component library. Should React go in dependencies, devDependencies, or peerDependencies?',
    type: 'multiple-choice',
    options: [
      'dependencies - your library needs React to work',
      'devDependencies - React is only needed during development',
      'peerDependencies - you expect the host application to provide React',
      'Both dependencies and peerDependencies'
    ],
    correctAnswer: 2,
    explanation: 'peerDependencies! Your library works WITH React, not INCLUDES React. The host app provides React. This prevents multiple React versions (which causes bugs) and reduces bundle size. You might also add React to devDependencies for local testing.',
    difficulty: 'intermediate',
    interviewContext: 'Classic plugin pattern question. Know that peerDependencies say "I need React, but don\'t install it for me - expect the user to have it." Common for libraries/plugins that extend frameworks.'
  },
  {
    id: 'q8',
    question: 'What is the purpose of the "exports" field in package.json?',
    type: 'multiple-choice',
    options: [
      'To list what files should be included when publishing to npm',
      'To define package entry points with fine-grained control, supporting dual CJS/ESM and subpath exports',
      'To declare which functions your package exports',
      'To specify environment variables your package needs'
    ],
    correctAnswer: 1,
    explanation: 'The "exports" field is the modern way to define entry points. It supports conditional exports (different files for import vs require), subpath exports (/utils, /helpers), and encapsulation (prevents access to non-exported files). Takes precedence over "main" and "module".',
    difficulty: 'advanced',
    interviewContext: 'Modern package development question. Know that "exports" is the future - it enables dual CJS/ESM packages properly. Example: { ".": { "import": "./dist/index.mjs", "require": "./dist/index.js" } }'
  }
]

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Interactive Playground</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice with real tools and test your knowledge with interview-depth questions
          </p>
        </div>

        {/* Package.json Validator */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">package.json Validator & Explorer</h2>
            <p className="text-gray-600">
              Validate your package.json and learn what every field means - with real interview tips
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <PackageJsonValidator />
          </div>
        </section>

        {/* Interactive Quiz */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Deep Knowledge Quiz</h2>
            <p className="text-gray-600">
              Test your understanding with real interview-style questions. Can you answer them?
            </p>
          </div>
          <InteractiveQuiz
            questions={playgroundQuestions}
            title="Package Manager Deep Dive"
          />
        </section>

        {/* Coming Soon Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Tools Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">📦 Dependency Visualizer</h3>
              <p className="text-gray-600 text-sm">
                Visualize dependency trees, understand hoisting, and see phantom dependencies
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">💻 Interactive Terminal</h3>
              <p className="text-gray-600 text-sm">
                Practice npm, pnpm, yarn, and bun commands in a safe sandbox environment
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
