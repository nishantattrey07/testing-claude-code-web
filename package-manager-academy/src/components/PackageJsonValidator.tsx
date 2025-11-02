'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react'

// Deep explanations for every field based on web research
const fieldExplanations: Record<string, {
  description: string
  required: boolean
  type: string
  example: string
  interviewTip: string
}> = {
  name: {
    description: 'The package name. Must be no more than 214 characters, only lowercase letters, URL-safe (hyphens and underscores allowed, no spaces). This is what users will use to install your package.',
    required: true,
    type: 'string',
    example: '"name": "my-awesome-package"',
    interviewTip: 'Know that npm package names must be unique across the registry. Scoped packages (@org/package) allow namespacing.'
  },
  version: {
    description: 'Current version following Semantic Versioning (SemVer). Format: major.minor.patch (e.g., 1.2.3). Breaking changes increment major, new features increment minor, bug fixes increment patch.',
    required: true,
    type: 'string',
    example: '"version": "1.0.0"',
    interviewTip: 'Understand SemVer deeply: ^ allows minor/patch updates, ~ allows only patch updates, exact version has no prefix.'
  },
  description: {
    description: 'Brief explanation of the project\'s purpose and function. Helps developers discover your package via npm search. Keep it concise and clear.',
    required: false,
    type: 'string',
    example: '"description": "A fast, zero-dependency package manager utility"',
    interviewTip: 'Good descriptions improve package discoverability in npm search results.'
  },
  main: {
    description: 'The entry point file when someone requires your package. Points to the CommonJS (CJS) module. Default is index.js if not specified.',
    required: false,
    type: 'string',
    example: '"main": "./dist/index.js"',
    interviewTip: 'For dual CJS/ESM packages, use "main" for CJS and "module" for ESM. Modern packages should also define "exports".'
  },
  module: {
    description: 'Entry point for ESM (ES Modules) build. Used by bundlers like webpack/Rollup for tree-shaking. This is not an official npm field but widely recognized.',
    required: false,
    type: 'string',
    example: '"module": "./dist/index.esm.js"',
    interviewTip: 'Bundlers prioritize "module" over "main" for tree-shaking benefits. Always provide both for compatibility.'
  },
  types: {
    description: 'Points to TypeScript declaration files (.d.ts). Tells TypeScript where to find type definitions for your package.',
    required: false,
    type: 'string',
    example: '"types": "./dist/index.d.ts"',
    interviewTip: 'Also called "typings". Essential for TypeScript users. Place types near your entry point.'
  },
  exports: {
    description: 'Modern way to define package entry points with fine-grained control. Supports conditional exports (import/require), subpath exports, and prevents access to non-exported files.',
    required: false,
    type: 'object',
    example: `"exports": {
  ".": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.js"
  }
}`,
    interviewTip: 'This is the future of package entry points. Allows dual CJS/ESM packages and encapsulation. Takes precedence over main/module.'
  },
  scripts: {
    description: 'Define custom commands to run at various lifecycle events. Includes pre/post hooks (pretest runs before test). Scripts have access to node_modules/.bin in PATH.',
    required: false,
    type: 'object',
    example: `"scripts": {
  "build": "tsc",
  "test": "jest",
  "prepublish": "npm run build"
}`,
    interviewTip: 'Lifecycle scripts (preinstall, postinstall, etc.) run automatically. Environment variables like npm_package_* are available in scripts.'
  },
  dependencies: {
    description: 'Packages required by your application in PRODUCTION. Installed when users install your package. These are essential for your app to function when deployed.',
    required: false,
    type: 'object',
    example: `"dependencies": {
  "express": "^4.18.0",
  "lodash": "~4.17.21"
}`,
    interviewTip: 'Interview Q: Why not put everything in dependencies? Answer: Larger install size, slower installs, security surface. Only production-needed packages here.'
  },
  devDependencies: {
    description: 'Packages only needed for LOCAL DEVELOPMENT and TESTING. Not installed in production (npm install --production). Includes test frameworks, build tools, linters.',
    required: false,
    type: 'object',
    example: `"devDependencies": {
  "typescript": "^5.0.0",
  "jest": "^29.0.0",
  "eslint": "^8.0.0"
}`,
    interviewTip: 'Interview Q: What happens if you remove devDependencies? Answer: Production works fine, but development tasks (testing, building, linting) fail.'
  },
  peerDependencies: {
    description: 'Specifies packages your package expects the HOST APPLICATION to have. Common in plugins/libraries. Prevents duplicate installations of frameworks like React.',
    required: false,
    type: 'object',
    example: `"peerDependencies": {
  "react": "^18.0.0"
}`,
    interviewTip: 'Interview Q: Why peerDependencies? Answer: Plugin pattern - your library works WITH a framework, not INCLUDES it. Prevents multiple React versions.'
  },
  optionalDependencies: {
    description: 'Dependencies that are nice to have but not critical. If installation fails, npm continues. Use for platform-specific or enhancement packages.',
    required: false,
    type: 'object',
    example: `"optionalDependencies": {
  "fsevents": "^2.3.0"
}`,
    interviewTip: 'Rare but useful for cross-platform packages. Your code must handle when these packages are missing (try/catch).'
  },
  engines: {
    description: 'Specify which versions of Node.js and npm your package works with. Warns users if they don\'t meet requirements.',
    required: false,
    type: 'object',
    example: `"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}`,
    interviewTip: 'This is advisory only unless you set "engine-strict": true in .npmrc. Good practice for preventing compatibility issues.'
  },
  workspaces: {
    description: 'Define workspace packages in monorepos. npm/yarn/pnpm will hoist shared dependencies and symlink local packages. Paths support globs.',
    required: false,
    type: 'array',
    example: `"workspaces": [
  "packages/*",
  "apps/*"
]`,
    interviewTip: 'Interview Q: How do workspaces work? Answer: Shared dependencies are hoisted to root, local packages are symlinked for easy cross-package development.'
  },
  repository: {
    description: 'Specify your source code repository. Makes it easy for contributors to find and contribute. Shown on npm package page.',
    required: false,
    type: 'object',
    example: `"repository": {
  "type": "git",
  "url": "https://github.com/user/repo.git"
}`,
    interviewTip: 'Good for open source packages. Users can click through to see source, report issues, contribute.'
  },
  keywords: {
    description: 'Array of keywords for npm search indexing. Helps developers discover your package. Choose relevant, searchable terms.',
    required: false,
    type: 'array',
    example: `"keywords": ["package-manager", "npm", "cli", "utility"]`,
    interviewTip: 'Think about what developers would search for. Improves package discoverability.'
  },
  author: {
    description: 'Package author information. Can be string or object with name, email, url. Shows on npm package page.',
    required: false,
    type: 'string | object',
    example: `"author": "Your Name <email@example.com>"`,
    interviewTip: 'Can also be object: {"name": "...", "email": "...", "url": "..."}'
  },
  license: {
    description: 'SPDX license identifier indicating how others can use your package. Common: MIT, Apache-2.0, GPL-3.0. Use "UNLICENSED" for private packages.',
    required: false,
    type: 'string',
    example: '"license": "MIT"',
    interviewTip: 'Interview Q: What if no license? Answer: Nobody can legally use your code. Always specify a license.'
  },
  private: {
    description: 'If true, prevents accidental publishing to npm registry. Essential for internal/private projects. npm will refuse to publish.',
    required: false,
    type: 'boolean',
    example: '"private": true',
    interviewTip: 'Safety mechanism for monorepo roots and internal tools. Set to true for apps (vs libraries).'
  },
  publishConfig: {
    description: 'Configuration used when publishing package. Can specify registry, access level (public/restricted), tag.',
    required: false,
    type: 'object',
    example: `"publishConfig": {
  "access": "public",
  "registry": "https://registry.npmjs.org/"
}`,
    interviewTip: 'Useful for scoped packages (@org/pkg) which default to restricted. Set access: public to publish publicly.'
  }
}

export default function PackageJsonValidator() {
  const [jsonInput, setJsonInput] = useState(`{
  "name": "example-package",
  "version": "1.0.0",
  "description": "An example package",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"test\\""
  },
  "dependencies": {},
  "devDependencies": {}
}`)
  const [analysis, setAnalysis] = useState<any>(null)
  const [selectedField, setSelectedField] = useState<string | null>(null)

  const validateJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)

      const fields = Object.keys(parsed)
      const recognizedFields = Object.keys(fieldExplanations)
      const unknownFields = fields.filter(f => !recognizedFields.includes(f))

      const errors = []
      const warnings = []
      const info = []

      // Check required fields
      if (!parsed.name) errors.push('Missing required field: "name"')
      if (!parsed.version) errors.push('Missing required field: "version"')

      // Validate name
      if (parsed.name && (parsed.name.length > 214 || /[A-Z\s]/.test(parsed.name))) {
        errors.push('Name must be ≤214 chars, lowercase, no spaces')
      }

      // Validate version
      if (parsed.version && !/^\d+\.\d+\.\d+/.test(parsed.version)) {
        errors.push('Version must follow SemVer format (e.g., 1.0.0)')
      }

      // Warnings
      if (!parsed.description) warnings.push('Consider adding "description" for better discoverability')
      if (!parsed.license) warnings.push('Consider adding "license" field')
      if (!parsed.repository) warnings.push('Consider adding "repository" for open source')

      // Info
      if (parsed.main && !parsed.exports) {
        info.push('Consider using "exports" field for modern package entry points')
      }
      if (parsed.dependencies && Object.keys(parsed.dependencies).length > 20) {
        warnings.push('Large number of dependencies. Consider if all are needed.')
      }
      if (unknownFields.length > 0) {
        info.push(`Unknown fields detected: ${unknownFields.join(', ')}`)
      }

      setAnalysis({
        valid: errors.length === 0,
        fields,
        errors,
        warnings,
        info,
        parsed
      })
    } catch (e: any) {
      setAnalysis({
        valid: false,
        errors: [`Invalid JSON: ${e.message}`],
        warnings: [],
        info: []
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Editor */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            package.json Content
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-96 font-mono text-sm p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your package.json here..."
          />
        </div>
        <button
          onClick={validateJson}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Validate & Analyze
        </button>
      </div>

      {/* Right: Analysis */}
      <div className="space-y-4">
        {analysis && (
          <>
            <div className={`p-4 rounded-lg ${analysis.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {analysis.valid ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-semibold ${analysis.valid ? 'text-green-900' : 'text-red-900'}`}>
                  {analysis.valid ? 'Valid package.json' : 'Invalid package.json'}
                </span>
              </div>
            </div>

            {/* Errors */}
            {analysis.errors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-red-900 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Errors ({analysis.errors.length})
                </h3>
                {analysis.errors.map((error: string, i: number) => (
                  <div key={i} className="text-sm text-red-700 bg-red-50 p-3 rounded border border-red-200">
                    {error}
                  </div>
                ))}
              </div>
            )}

            {/* Warnings */}
            {analysis.warnings.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-yellow-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Warnings ({analysis.warnings.length})
                </h3>
                {analysis.warnings.map((warning: string, i: number) => (
                  <div key={i} className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded border border-yellow-200">
                    {warning}
                  </div>
                ))}
              </div>
            )}

            {/* Info */}
            {analysis.info.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Info ({analysis.info.length})
                </h3>
                {analysis.info.map((info: string, i: number) => (
                  <div key={i} className="text-sm text-blue-700 bg-blue-50 p-3 rounded border border-blue-200">
                    {info}
                  </div>
                ))}
              </div>
            )}

            {/* Field Explorer */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Detected Fields - Click to Learn More</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.fields && analysis.fields.map((field: string) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      selectedField === field
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            {/* Field Details */}
            {selectedField && fieldExplanations[selectedField] && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 space-y-4">
                <h4 className="text-lg font-bold text-gray-900">&quot;{selectedField}&quot;</h4>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
                    <p className="text-sm text-gray-700 mt-1">{fieldExplanations[selectedField].description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Required</span>
                      <p className="text-sm text-gray-900 mt-1">
                        {fieldExplanations[selectedField].required ? '✅ Yes' : '❌ No'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">Type</span>
                      <p className="text-sm text-gray-900 mt-1 font-mono">
                        {fieldExplanations[selectedField].type}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase">Example</span>
                    <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded mt-1 overflow-x-auto">
                      {fieldExplanations[selectedField].example}
                    </pre>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                    <span className="text-xs font-semibold text-yellow-800 uppercase flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Interview Tip
                    </span>
                    <p className="text-sm text-yellow-900 mt-1 font-medium">
                      {fieldExplanations[selectedField].interviewTip}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
