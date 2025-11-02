'use client'

import { BookOpen, Code, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react'
import InteractiveQuiz, { type Question } from '@/components/InteractiveQuiz'

export interface LessonContent {
  title: string
  description: string
  sections: Section[]
  quiz?: Question[]
  keyTakeaways: string[]
}

export interface Section {
  type: 'text' | 'code' | 'warning' | 'tip' | 'example' | 'interview-prep'
  title?: string
  content?: string
  code?: string
  language?: string
}

interface LessonContentDisplayProps {
  lesson: LessonContent
}

export function LessonContentDisplay({ lesson }: LessonContentDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-3">{lesson.title}</h1>
        <p className="text-blue-100 text-lg">{lesson.description}</p>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {lesson.sections.map((section, index) => (
          <div key={index}>
            {section.type === 'text' && (
              <div className="prose prose-lg max-w-none">
                {section.title && (
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    {section.title}
                  </h2>
                )}
                {section.content && <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>}
              </div>
            )}

            {section.type === 'code' && (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {section.title && (
                  <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      {section.title}
                    </span>
                  </div>
                )}
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-green-400">{section.code || section.content}</code>
                </pre>
              </div>
            )}

            {section.type === 'warning' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    {section.title && (
                      <h3 className="font-bold text-yellow-900 mb-1">{section.title}</h3>
                    )}
                    {section.content && <p className="text-yellow-800 whitespace-pre-line">{section.content}</p>}
                  </div>
                </div>
              </div>
            )}

            {section.type === 'tip' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    {section.title && (
                      <h3 className="font-bold text-blue-900 mb-1">{section.title}</h3>
                    )}
                    {section.content && <p className="text-blue-800 whitespace-pre-line">{section.content}</p>}
                  </div>
                </div>
              </div>
            )}

            {section.type === 'example' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    {section.title && (
                      <h3 className="font-bold text-green-900 mb-3">{section.title}</h3>
                    )}
                    {section.content && <p className="text-green-800 mb-3 whitespace-pre-line">{section.content}</p>}
                    {section.code && (
                      <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
                        <code>{section.code}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            )}

            {section.type === 'interview-prep' && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white p-2 rounded-lg flex-shrink-0">
                    <span className="text-xs font-bold">Q&A</span>
                  </div>
                  <div className="flex-1">
                    {section.title && (
                      <h3 className="font-bold text-purple-900 mb-3 text-lg">{section.title}</h3>
                    )}
                    {section.content && <p className="text-purple-900 whitespace-pre-line">{section.content}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      {lesson.keyTakeaways.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Key Takeaways
          </h3>
          <ul className="space-y-2">
            {lesson.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-indigo-900">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Test Your Knowledge</h3>
          <InteractiveQuiz questions={lesson.quiz} title={`${lesson.title} Quiz`} />
        </div>
      )}
    </div>
  )
}

// Example lesson data with deep content from web research
export const npmPackageJsonLesson: LessonContent = {
  title: 'package.json Deep Dive - Understanding Every Field',
  description: 'Master every field in package.json with real-world context and interview-ready knowledge',
  sections: [
    {
      type: 'text',
      title: 'What is package.json?',
      content: `package.json is the manifest file that defines your Node.js project. It's not just a list of dependencies - it's the complete metadata, configuration, and specification of your package.

Think of it as your project's passport: it tells package managers what your project is, what it needs, how to run it, and how others can use it.`
    },
    {
      type: 'interview-prep',
      title: 'Interview Question: "Explain the difference between dependencies and devDependencies"',
      content: `CORRECT ANSWER:

**dependencies** = Packages your app needs to RUN in PRODUCTION
- Installed when users install your package
- Example: express, lodash, react
- Installed with: npm install <package>

**devDependencies** = Packages only needed for DEVELOPMENT and TESTING
- NOT installed in production (npm install --production)
- Example: typescript, jest, eslint, webpack
- Installed with: npm install <package> --save-dev

COMMON FOLLOW-UP: "What happens if you remove all devDependencies?"
- Production works fine!
- Development tasks fail (npm test, npm run build, linting)
- Install size is smaller, faster deployments`
    },
    {
      type: 'code',
      title: 'Complete package.json Example with Comments',
      code: `{
  // REQUIRED FIELDS
  "name": "my-package",              // Must be ≤214 chars, lowercase, no spaces
  "version": "1.0.0",                // SemVer format: major.minor.patch

  // METADATA
  "description": "What your package does",
  "keywords": ["npm", "package"],    // For npm search
  "author": "Your Name <email@example.com>",
  "license": "MIT",                  // SPDX identifier
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },

  // ENTRY POINTS
  "main": "./dist/index.js",         // CommonJS entry (require())
  "module": "./dist/index.esm.js",   // ESM entry (import) - for bundlers
  "types": "./dist/index.d.ts",      // TypeScript declarations
  "exports": {                        // Modern! Replaces main/module
    ".": {
      "import": "./dist/index.mjs",  // ESM
      "require": "./dist/index.js"   // CJS
    }
  },

  // SCRIPTS
  "scripts": {
    "build": "tsc",                  // npm run build
    "test": "jest",                  // npm test
    "pretest": "npm run build"       // Runs automatically before test
  },

  // DEPENDENCIES
  "dependencies": {
    "express": "^4.18.0"             // ^ allows 4.x.x (not 5.0.0)
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  },
  "peerDependencies": {              // For plugins/libraries
    "react": "^18.0.0"               // Host must provide this
  },

  // CONFIGURATION
  "engines": {                        // Version requirements
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "private": true,                   // Prevents npm publish
  "workspaces": ["packages/*"]       // Monorepo configuration
}`
    },
    {
      type: 'warning',
      title: 'Common Mistakes',
      content: `1. Putting build tools in dependencies instead of devDependencies
   → Makes your package unnecessarily large!

2. Not using ^ or ~ in version ranges
   → Locks exact versions, prevents bug fixes

3. Missing "private": true in application package.json
   → Risk of accidentally publishing to npm

4. Using "main" without "exports" for modern packages
   → Miss out on conditional exports and encapsulation`
    },
    {
      type: 'example',
      title: 'Real-World Example: React Component Library',
      content: 'When building a React component library, you want React as a peerDependency, NOT a dependency. Here\'s why:',
      code: `{
  "name": "@myorg/ui-components",
  "version": "1.0.0",

  // WRONG! This bundles React, causing multiple React instances
  "dependencies": {
    "react": "^18.0.0"
  },

  // CORRECT! Host app provides React
  "peerDependencies": {
    "react": "^18.0.0"
  },

  // For local development/testing only
  "devDependencies": {
    "react": "^18.0.0",
    "@types/react": "^18.0.0"
  }
}`
    },
    {
      type: 'interview-prep',
      title: 'Interview Question: "What is the purpose of the exports field?"',
      content: `CORRECT ANSWER:

The "exports" field is the MODERN way to define package entry points. It provides:

1. **Conditional Exports**: Different files for import vs require
2. **Subpath Exports**: Control what can be imported (e.g., 'package/utils')
3. **Encapsulation**: Prevents access to non-exported files

Example:
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",    // ESM
      "require": "./dist/index.cjs"    // CommonJS
    },
    "./utils": "./dist/utils.js"       // Subpath export
  }
}

WHY IT MATTERS:
- Enables proper dual CJS/ESM packages
- Better than "main" + "module"
- Takes precedence over other entry point fields
- Prevents users from importing internal files`
    },
    {
      type: 'text',
      title: 'Version Ranges Deep Dive',
      content: `Understanding SemVer operators is CRITICAL for interviews:

^1.2.3 = >=1.2.3 <2.0.0  (minor + patch updates OK)
~1.2.3 = >=1.2.3 <1.3.0  (only patch updates OK)
1.2.3  = exactly 1.2.3   (no updates)
*      = any version     (dangerous!)
latest = latest version  (don't use in production!)

INTERVIEW TIP: Know that ^ is the default when you run npm install`
    },
    {
      type: 'tip',
      title: 'Pro Tip: Scripts and Lifecycle Hooks',
      content: `npm scripts support pre/post hooks automatically:

- pretest runs before test
- postinstall runs after installation
- prepublish runs before publishing

Environment variables available in scripts:
- npm_package_name
- npm_package_version
- npm_config_* (from .npmrc)

Example: "version": "1.0.0" → Available as $npm_package_version in scripts`
    }
  ],
  keyTakeaways: [
    'dependencies = production needs, devDependencies = development/testing only',
    'peerDependencies = for plugins/libraries that work WITH a framework',
    '"exports" field is the modern standard for entry points (supports dual CJS/ESM)',
    'Version ranges: ^ allows minor updates, ~ allows only patch updates',
    'Always set "private": true for applications (vs libraries)',
    'Scripts support pre/post hooks automatically (pretest, postinstall, etc.)',
    'package.json is not just dependencies - it\'s your project\'s complete specification'
  ],
  quiz: [
    {
      id: 'pj1',
      question: 'Where should TypeScript compiler be listed in package.json?',
      type: 'multiple-choice',
      options: [
        'dependencies',
        'devDependencies',
        'peerDependencies',
        'optionalDependencies'
      ],
      correctAnswer: 1,
      explanation: 'TypeScript compiler (tsc) is only needed during development for compiling code. In production, you run the compiled JavaScript, not TypeScript. It should be in devDependencies.',
      difficulty: 'beginner'
    },
    {
      id: 'pj2',
      question: 'What does ^4.18.0 mean in version ranges?',
      type: 'multiple-choice',
      options: [
        'Exactly version 4.18.0',
        'Any version 4.x.x, but not 5.0.0 or higher',
        'Any version including 5.0.0',
        'Only patch updates (4.18.x)'
      ],
      correctAnswer: 1,
      explanation: '^4.18.0 means >=4.18.0 but <5.0.0. It allows minor and patch updates (4.19.0, 4.18.1) but blocks major version changes (5.0.0) which could have breaking changes.',
      difficulty: 'intermediate',
      interviewContext: 'Very common question! Know the difference between ^ (caret) and ~ (tilde).'
    }
  ]
}
