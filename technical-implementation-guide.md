# Package Managers Course: Interactive Website Technical Specifications
## Complete Implementation Guide for Claude Code

---

## **PROJECT OVERVIEW**

**Name**: PackageManager.dev (or similar)
**Tech Stack**: Next.js 14+, TypeScript, Tailwind CSS, MDX
**Goal**: Interactive learning platform for package managers
**Target**: Deploy on Vercel/Netlify
**Timeline**: 3-5 months (280-400 hours)

---

## **PROJECT STRUCTURE**

```
package-manager-academy/
├── public/
│   ├── images/
│   ├── diagrams/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   └── page.tsx
│   │   ├── modules/
│   │   │   ├── [moduleId]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [lessonId]/
│   │   │   │       └── page.tsx
│   │   ├── labs/
│   │   │   └── [labId]/
│   │   │       └── page.tsx
│   │   ├── playground/
│   │   │   ├── package-json/
│   │   │   ├── dependency-tree/
│   │   │   ├── benchmarks/
│   │   │   └── version-calculator/
│   │   ├── interview/
│   │   │   ├── questions/
│   │   │   ├── practice/
│   │   │   └── mock/
│   │   └── reference/
│   │       ├── cheatsheets/
│   │       ├── configs/
│   │       └── glossary/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── content/
│   │   │   ├── ModuleCard.tsx
│   │   │   ├── LessonContent.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   └── Diagram.tsx
│   │   ├── interactive/
│   │   │   ├── Terminal.tsx
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── DependencyTree.tsx
│   │   │   ├── PackageJsonValidator.tsx
│   │   │   └── VersionCalculator.tsx
│   │   ├── learning/
│   │   │   ├── Quiz.tsx
│   │   │   ├── Lab.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── Certificate.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Tabs.tsx
│   │       └── Dialog.tsx
│   ├── lib/
│   │   ├── content/
│   │   │   ├── modules.ts
│   │   │   ├── labs.ts
│   │   │   └── questions.ts
│   │   ├── utils/
│   │   │   ├── semver.ts
│   │   │   ├── packageJson.ts
│   │   │   └── dependency-resolver.ts
│   │   ├── sandbox/
│   │   │   └── execute-command.ts
│   │   └── progress/
│   │       └── tracker.ts
│   ├── content/
│   │   ├── modules/
│   │   │   ├── 0-foundation/
│   │   │   │   ├── index.mdx
│   │   │   │   ├── 01-problem-space.mdx
│   │   │   │   ├── 02-semver.mdx
│   │   │   │   └── 03-registry.mdx
│   │   │   ├── 1-npm/
│   │   │   ├── 2-yarn/
│   │   │   ├── 3-pnpm/
│   │   │   └── 4-bun/
│   │   ├── labs/
│   │   │   └── [lab-configs].ts
│   │   └── questions/
│   │       └── [question-banks].ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       ├── module.ts
│       ├── lab.ts
│       └── question.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## **PHASE 1: PROJECT SETUP & FOUNDATION**

### **Step 1.1: Initialize Project**

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest package-manager-academy --typescript --tailwind --app --src-dir

cd package-manager-academy

# Install core dependencies
npm install @mdx-js/loader @mdx-js/react @next/mdx
npm install gray-matter rehype-highlight remark-gfm
npm install zustand # State management
npm install clsx tailwind-merge # Utility classes
npm install lucide-react # Icons

# Install dev dependencies
npm install -D @types/mdx @tailwindcss/typography
```

### **Step 1.2: Configure Next.js for MDX**

```typescript
// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-highlight')],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

module.exports = withMDX(nextConfig)
```

### **Step 1.3: Set Up Tailwind Configuration**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... full color scale
          900: '#0c4a6e',
        },
        // Custom colors for different package managers
        npm: '#CB3837',
        yarn: '#2C8EBB',
        pnpm: '#F9AD00',
        bun: '#FBF0DF',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

### **Step 1.4: Create Type Definitions**

```typescript
// src/types/module.ts
export interface Module {
  id: string
  title: string
  description: string
  duration: string // e.g., "2-3 hours"
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
  content: string // MDX content
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
  options?: string[] // For multiple choice
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

// src/types/progress.ts
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
```

---

## **PHASE 2: CORE COMPONENTS**

### **Component 2.1: Code Editor with Syntax Highlighting**

```typescript
// src/components/interactive/CodeEditor.tsx
'use client'

import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  defaultValue: string
  language: 'javascript' | 'typescript' | 'json' | 'bash'
  height?: string
  onChange?: (value: string) => void
  readOnly?: boolean
  theme?: 'vs-dark' | 'light'
}

export function CodeEditor({
  defaultValue,
  language,
  height = '400px',
  onChange,
  readOnly = false,
  theme = 'vs-dark',
}: CodeEditorProps) {
  const [value, setValue] = useState(defaultValue)

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setValue(value)
      onChange?.(value)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        value={value}
        theme={theme}
        onChange={handleEditorChange}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

// Usage example:
<CodeEditor
  defaultValue={`{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0"
  }
}`}
  language="json"
  onChange={(value) => validatePackageJson(value)}
/>
```

### **Component 2.2: Interactive Terminal**

```typescript
// src/components/interactive/Terminal.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

interface TerminalProps {
  onCommand?: (command: string) => Promise<string>
  readOnly?: boolean
  initialCommands?: string[]
}

export function Terminal({
  onCommand,
  readOnly = false,
  initialCommands = [],
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
      },
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.open(terminalRef.current)
    fitAddon.fit()

    xtermRef.current = term

    // Welcome message
    term.writeln('Welcome to Package Manager Interactive Terminal')
    term.writeln('Type commands to see output. Try: npm install react')
    term.write('\r\n$ ')

    let currentLine = ''

    term.onData((data) => {
      if (readOnly) return

      const code = data.charCodeAt(0)

      // Enter key
      if (code === 13) {
        term.write('\r\n')
        if (currentLine.trim()) {
          executeCommand(currentLine.trim())
          setCommandHistory((prev) => [...prev, currentLine.trim()])
        }
        currentLine = ''
        return
      }

      // Backspace
      if (code === 127) {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1)
          term.write('\b \b')
        }
        return
      }

      // Arrow up (history)
      if (data === '\x1b[A') {
        // Navigate history
        return
      }

      // Regular character
      currentLine += data
      term.write(data)
    })

    const executeCommand = async (command: string) => {
      if (onCommand) {
        const output = await onCommand(command)
        term.write(output + '\r\n')
      } else {
        term.write(`Command executed: ${command}\r\n`)
      }
      term.write('$ ')
    }

    // Run initial commands
    initialCommands.forEach((cmd) => {
      term.writeln(`$ ${cmd}`)
      executeCommand(cmd)
    })

    return () => {
      term.dispose()
    }
  }, [])

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 min-h-[400px]">
      <div ref={terminalRef} className="h-full" />
    </div>
  )
}

// Command executor for sandbox
// src/lib/sandbox/execute-command.ts
export async function executeCommand(command: string): Promise<string> {
  // Parse command
  const parts = command.split(' ')
  const [manager, action, ...args] = parts

  // Simulate npm/yarn/pnpm/bun commands
  if (manager === 'npm' || manager === 'yarn' || manager === 'pnpm' || manager === 'bun') {
    return simulatePackageManager(manager, action, args)
  }

  return `Command not recognized: ${command}`
}

function simulatePackageManager(
  manager: string,
  action: string,
  args: string[]
): string {
  // Simulate installations, updates, etc.
  if (action === 'install') {
    const pkg = args[0] || 'all packages'
    return `
📦 ${manager} ${action} ${pkg}

Fetching package metadata...
Resolving dependencies...
Downloading packages...

✓ Installed ${pkg} successfully
    `.trim()
  }

  // Add more simulations...
  return `Executed: ${manager} ${action} ${args.join(' ')}`
}
```

### **Component 2.3: Dependency Tree Visualizer**

```typescript
// src/components/interactive/DependencyTree.tsx
'use client'

import { useState, useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

interface PackageNode {
  name: string
  version: string
  dependencies?: Record<string, string>
}

interface DependencyTreeProps {
  packageJson: any
  manager: 'npm' | 'yarn' | 'pnpm' | 'bun'
  showHoisting?: boolean
}

export function DependencyTree({
  packageJson,
  manager,
  showHoisting = true,
}: DependencyTreeProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    // Build tree from package.json
    const { nodes: treeNodes, edges: treeEdges } = buildDependencyTree(
      packageJson,
      manager,
      showHoisting
    )
    setNodes(treeNodes)
    setEdges(treeEdges)
  }, [packageJson, manager, showHoisting])

  return (
    <div className="h-[600px] border rounded-lg bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}

function buildDependencyTree(
  packageJson: any,
  manager: string,
  showHoisting: boolean
): { nodes: Node[]; edges: Edge[] } {
  // Implementation to build tree structure
  // This would analyze dependencies and create nodes/edges
  // considering the specific package manager's behavior

  const nodes: Node[] = []
  const edges: Edge[] = []

  // Root node
  nodes.push({
    id: 'root',
    data: { label: packageJson.name || 'root' },
    position: { x: 250, y: 0 },
    style: {
      background: '#1e40af',
      color: 'white',
      border: '2px solid #1e3a8a',
    },
  })

  // Add dependency nodes
  Object.entries(packageJson.dependencies || {}).forEach(([name, version], index) => {
    const nodeId = `dep-${name}`
    nodes.push({
      id: nodeId,
      data: { label: `${name}@${version}` },
      position: { x: index * 200, y: 150 },
    })

    edges.push({
      id: `root-${nodeId}`,
      source: 'root',
      target: nodeId,
      animated: true,
    })
  })

  return { nodes, edges }
}
```

### **Component 2.4: Package.json Validator**

```typescript
// src/components/interactive/PackageJsonValidator.tsx
'use client'

import { useState } from 'react'
import { CodeEditor } from './CodeEditor'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface ValidationResult {
  valid: boolean
  errors: Array<{
    field: string
    message: string
    severity: 'error' | 'warning'
  }>
  suggestions: string[]
}

export function PackageJsonValidator() {
  const [content, setContent] = useState(`{
  "name": "my-package",
  "version": "1.0.0"
}`)
  const [validation, setValidation] = useState<ValidationResult | null>(null)

  const validate = (value: string) => {
    try {
      const parsed = JSON.parse(value)
      const result = validatePackageJson(parsed)
      setValidation(result)
    } catch (e) {
      setValidation({
        valid: false,
        errors: [
          {
            field: 'JSON',
            message: 'Invalid JSON syntax',
            severity: 'error',
          },
        ],
        suggestions: [],
      })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Edit package.json</h3>
        <CodeEditor
          defaultValue={content}
          language="json"
          onChange={(value) => {
            setContent(value)
            validate(value)
          }}
        />
      </div>

      {validation && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {validation.valid ? (
              <>
                <CheckCircle className="text-green-500" />
                <span className="text-green-700 font-medium">
                  Valid package.json
                </span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500" />
                <span className="text-red-700 font-medium">
                  Invalid package.json
                </span>
              </>
            )}
          </div>

          {validation.errors.length > 0 && (
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-2 rounded ${
                    error.severity === 'error'
                      ? 'bg-red-50 text-red-800'
                      : 'bg-yellow-50 text-yellow-800'
                  }`}
                >
                  <AlertCircle className="mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <span className="font-medium">{error.field}:</span>{' '}
                    {error.message}
                  </div>
                </div>
              ))}
            </div>
          )}

          {validation.suggestions.length > 0 && (
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-medium text-blue-900 mb-2">Suggestions:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                {validation.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// src/lib/utils/packageJson.ts
export function validatePackageJson(pkg: any): ValidationResult {
  const errors: ValidationResult['errors'] = []
  const suggestions: string[] = []

  // Check required fields
  if (!pkg.name) {
    errors.push({
      field: 'name',
      message: 'Package name is required',
      severity: 'error',
    })
  } else if (!/^[a-z0-9-_.@/]+$/.test(pkg.name)) {
    errors.push({
      field: 'name',
      message: 'Package name must be lowercase and URL-safe',
      severity: 'error',
    })
  }

  if (!pkg.version) {
    errors.push({
      field: 'version',
      message: 'Version is required',
      severity: 'error',
    })
  } else if (!/^\d+\.\d+\.\d+/.test(pkg.version)) {
    errors.push({
      field: 'version',
      message: 'Version must follow semver (e.g., 1.0.0)',
      severity: 'error',
    })
  }

  // Check for common issues
  if (pkg.dependencies && pkg.dependencies['*']) {
    errors.push({
      field: 'dependencies',
      message: 'Using "*" for versions is dangerous',
      severity: 'warning',
    })
    suggestions.push('Use specific version ranges like "^1.0.0" instead of "*"')
  }

  // Check for misplaced dependencies
  if (pkg.dependencies && pkg.dependencies.jest) {
    errors.push({
      field: 'dependencies',
      message: 'jest should be in devDependencies',
      severity: 'warning',
    })
  }

  // Suggestions
  if (!pkg.description) {
    suggestions.push('Add a description for better discoverability')
  }

  if (!pkg.repository) {
    suggestions.push('Add repository URL for better documentation')
  }

  if (!pkg.license) {
    suggestions.push('Specify a license (e.g., MIT, ISC)')
  }

  return {
    valid: errors.filter((e) => e.severity === 'error').length === 0,
    errors,
    suggestions,
  }
}
```

---

## **PHASE 3: CONTENT MANAGEMENT**

### **MDX Content Structure**

```mdx
---
title: "Understanding SemVer"
module: "0-foundation"
lesson: "02"
duration: "20 minutes"
difficulty: "beginner"
---

# Understanding Semantic Versioning

Semantic Versioning (SemVer) is the foundation of dependency management in npm.

## The Format

Every version follows this format: **MAJOR.MINOR.PATCH**

```typescript
// Example
"2.4.7"
 ↑ ↑ ↑
 │ │ └─ PATCH (bug fixes)
 │ └─── MINOR (new features)
 └───── MAJOR (breaking changes)
```

<Callout type="info">
Understanding SemVer prevents dependency conflicts and breaking changes.
</Callout>

## Version Ranges

<CodeExample>
```json
{
  "dependencies": {
    "react": "^18.2.0"  // Caret range
  }
}
```
</CodeExample>

<InteractiveExample>
  <VersionCalculator defaultRange="^18.2.0" />
</InteractiveExample>

## Try It Yourself

<Exercise
  type="quiz"
  question="What versions match ^2.3.1?"
  options={[
    "2.3.1, 2.3.2, 2.4.0",
    "2.3.1, 2.3.2, 3.0.0",
    "Only 2.3.1",
  ]}
  correctAnswer={0}
  explanation="^ allows MINOR and PATCH updates, not MAJOR"
/>

## Next Steps

Now that you understand SemVer, let's explore how package managers resolve versions.

<NavigationButtons
  previous="/modules/0-foundation/01-problem-space"
  next="/modules/0-foundation/03-registry"
/>
```

### **Content Loading System**

```typescript
// src/lib/content/modules.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Module, Lesson } from '@/types/module'

const contentDirectory = path.join(process.cwd(), 'src/content/modules')

export function getModules(): Module[] {
  const moduleIds = fs.readdirSync(contentDirectory)

  return moduleIds
    .map((id) => {
      const modulePath = path.join(contentDirectory, id)
      const indexPath = path.join(modulePath, 'index.mdx')

      if (!fs.existsSync(indexPath)) return null

      const fileContents = fs.readFileSync(indexPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        id,
        title: data.title,
        description: data.description,
        duration: data.duration,
        difficulty: data.difficulty,
        lessons: getLessons(id),
        prerequisites: data.prerequisites || [],
        learningObjectives: data.learningObjectives || [],
      } as Module
    })
    .filter(Boolean) as Module[]
}

export function getLessons(moduleId: string): Lesson[] {
  const modulePath = path.join(contentDirectory, moduleId)
  const files = fs.readdirSync(modulePath)

  return files
    .filter((file) => file !== 'index.mdx' && file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(modulePath, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        id: file.replace('.mdx', ''),
        moduleId,
        title: data.title,
        slug: file.replace('.mdx', ''),
        duration: data.duration,
        content,
        exercises: data.exercises || [],
        quiz: data.quiz,
      } as Lesson
    })
}

export function getLesson(moduleId: string, lessonId: string): Lesson | null {
  const lessonPath = path.join(contentDirectory, moduleId, `${lessonId}.mdx`)

  if (!fs.existsSync(lessonPath)) return null

  const fileContents = fs.readFileSync(lessonPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    id: lessonId,
    moduleId,
    title: data.title,
    slug: lessonId,
    duration: data.duration,
    content,
    exercises: data.exercises || [],
    quiz: data.quiz,
  } as Lesson
}
```

---

## **PHASE 4: PROGRESS TRACKING**

```typescript
// src/lib/progress/tracker.ts
'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProgress } from '@/types/progress'

interface ProgressStore extends UserProgress {
  completeLesson: (lessonId: string) => void
  completeLab: (labId: string) => void
  updateQuizScore: (quizId: string, score: number) => void
  resetProgress: () => void
  getCompletionPercentage: () => number
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      userId: 'anonymous',
      completedModules: [],
      completedLessons: [],
      completedLabs: [],
      quizScores: {},
      skillLevel: 'novice',
      certificateEarned: false,

      completeLesson: (lessonId) => {
        set((state) => ({
          completedLessons: [...new Set([...state.completedLessons, lessonId])],
        }))
      },

      completeLab: (labId) => {
        set((state) => ({
          completedLabs: [...new Set([...state.completedLabs, labId])],
        }))
      },

      updateQuizScore: (quizId, score) => {
        set((state) => ({
          quizScores: { ...state.quizScores, [quizId]: score },
        }))
      },

      resetProgress: () => {
        set({
          completedModules: [],
          completedLessons: [],
          completedLabs: [],
          quizScores: {},
          skillLevel: 'novice',
          certificateEarned: false,
        })
      },

      getCompletionPercentage: () => {
        const state = get()
        // Calculate based on completed lessons, labs, etc.
        const total = 100 // Total items
        const completed = state.completedLessons.length + state.completedLabs.length
        return Math.round((completed / total) * 100)
      },
    }),
    {
      name: 'package-manager-progress',
    }
  )
)

// Component usage
// src/components/learning/Progress.tsx
export function ProgressIndicator() {
  const { getCompletionPercentage, completedLessons } = useProgress()
  const percentage = getCompletionPercentage()

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Course Progress</span>
        <span className="font-semibold">{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-600">
        {completedLessons.length} lessons completed
      </p>
    </div>
  )
}
```

---

## **PHASE 5: DEPLOYMENT**

### **Vercel Deployment**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### **Environment Variables**

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://packagemanager.dev
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **Performance Optimization**

```typescript
// next.config.js additions
const nextConfig = {
  images: {
    domains: ['registry.npmjs.org'],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  swcMinify: true,
}
```

---

## **COMPLETE FEATURE CHECKLIST**

### Core Features
- [ ] Module navigation system
- [ ] Lesson content rendering (MDX)
- [ ] Code syntax highlighting
- [ ] Interactive code editor
- [ ] Terminal emulator
- [ ] Progress tracking
- [ ] Quiz system
- [ ] Lab exercises

### Interactive Tools
- [ ] package.json validator
- [ ] Dependency tree visualizer
- [ ] Version range calculator
- [ ] Lock file comparator
- [ ] Benchmark tool

### Content
- [ ] All module content (0-9)
- [ ] All labs
- [ ] All interview questions
- [ ] Cheat sheets
- [ ] Glossary

### UX Features
- [ ] Search functionality
- [ ] Dark/light mode
- [ ] Mobile responsive
- [ ] Keyboard shortcuts
- [ ] Print-friendly docs

### Advanced
- [ ] Certificate generation
- [ ] Community forum
- [ ] Code sharing
- [ ] Mock interviews

---

## **DEVELOPMENT TIMELINE**

**Week 1-2**: Project setup, core components
**Week 3-4**: Content system, MDX rendering
**Week 5-6**: Interactive features (editor, terminal)
**Week 7-8**: Progress tracking, quizzes
**Week 9-10**: Content creation (Modules 0-4)
**Week 11-12**: Content creation (Modules 5-9)
**Week 13-14**: Testing, polish, deployment

---

## **SUCCESS METRICS TO TRACK**

```typescript
// Analytics events to implement
trackEvent('lesson_completed', { lessonId, timeSpent })
trackEvent('lab_started', { labId })
trackEvent('lab_completed', { labId, timeSpent, attempts })
trackEvent('quiz_attempted', { quizId, score })
trackEvent('certificate_earned', { userId, date })
trackEvent('tool_used', { tool: 'validator', action: 'validate' })
```

---

This technical specification provides everything needed to build the interactive learning platform using Claude Code or any modern web development workflow.

