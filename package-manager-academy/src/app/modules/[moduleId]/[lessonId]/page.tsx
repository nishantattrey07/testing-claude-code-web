import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react'

const lessonsContent: Record<string, Record<string, any>> = {
  '0-foundation': {
    '01-problem-space': {
      id: '01-problem-space',
      title: 'The Problem Space: Why Package Managers?',
      moduleId: '0-foundation',
      duration: '15 min',
      content: `
# The Problem Space: Why Do We Need Package Managers?

Before diving into the specifics of npm, Yarn, pnpm, and Bun, let's understand the fundamental problem they solve.

## The Challenge of Dependencies

Imagine you're building a web application. You need:
- React for UI
- Express for the backend
- Lodash for utilities
- Axios for HTTP requests

Each of these libraries has its own dependencies, and those dependencies have their own dependencies. This creates a **dependency tree**.

### Without a Package Manager

In the early days of web development, managing dependencies meant:

1. **Manually downloading** files from websites
2. **Tracking versions** in a spreadsheet or README
3. **Manually updating** when new versions released
4. **Resolving conflicts** when two libraries needed different versions of the same dependency
5. **Sharing** the exact setup with team members

**This was chaos.**

## The Solution: Package Managers

Package managers automate this entire process:

### What Package Managers Do

1. **Install dependencies** - Download and setup libraries
2. **Manage versions** - Track what version of each package you're using
3. **Resolve dependencies** - Figure out which versions work together
4. **Lock versions** - Ensure everyone on your team uses the exact same versions
5. **Update packages** - Handle updates safely
6. **Remove unused code** - Clean up when you're done

### The Core Problem They Solve

> **Reproducibility**: Everyone who works on your project should get the exact same dependencies, no matter when or where they install.

## Key Concepts

### 1. package.json

This file declares:
- What packages you need
- What versions you want
- Scripts to run your app
- Metadata about your project

\`\`\`json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "express": "^4.18.2"
  }
}
\`\`\`

### 2. Lock Files

Lock files (package-lock.json, yarn.lock, pnpm-lock.yaml) specify:
- **Exact** versions installed
- **Complete** dependency tree
- **Checksums** to verify integrity

### 3. node_modules

The folder where packages are stored. This can get **massive** - a simple React app might have 1,000+ packages in node_modules!

## Why Multiple Package Managers?

If npm (the first major JavaScript package manager) solved the problem, why do we have Yarn, pnpm, and Bun?

Each addresses different concerns:

- **npm**: The original, maintained by npm Inc. (now GitHub)
- **Yarn**: Created by Facebook for better performance and reliability
- **pnpm**: Optimizes disk space with clever symlinking
- **Bun**: All-in-one solution with extreme speed

## What's Next?

Now that we understand *why* package managers exist, we need to understand **how** they work. The foundation is **Semantic Versioning** (SemVer).

In the next lesson, we'll dive deep into SemVer - the system that makes dependency management possible.
      `,
    },
    '02-semver': {
      id: '02-semver',
      title: 'Understanding Semantic Versioning',
      moduleId: '0-foundation',
      duration: '25 min',
      content: `
# Understanding Semantic Versioning (SemVer)

Semantic Versioning is the **foundation** of modern package management. Without it, dependency management would be impossible.

## The Format: MAJOR.MINOR.PATCH

Every version number has three parts:

\`\`\`
2.4.7
↑ ↑ ↑
│ │ └─ PATCH version (bug fixes)
│ └─── MINOR version (new features, backward compatible)
└───── MAJOR version (breaking changes)
\`\`\`

### The Rules

1. **MAJOR** version when you make incompatible API changes
2. **MINOR** version when you add functionality in a backward compatible manner
3. **PATCH** version when you make backward compatible bug fixes

## Real Example: React

Let's trace React's version history:

- **React 15.6.2** → **16.0.0**: Fiber rewrite (breaking changes) = MAJOR
- **React 16.0.0** → **16.3.0**: New Context API (new feature) = MINOR
- **React 16.3.0** → **16.3.1**: Bug fixes = PATCH

## Version Ranges

In package.json, you rarely specify exact versions. Instead, you use **ranges**:

### Caret (^) - Most Common

\`\`\`json
{
  "dependencies": {
    "react": "^18.2.0"
  }
}
\`\`\`

**Meaning**: Allow MINOR and PATCH updates, but not MAJOR.

**Will match**:
- ✅ 18.2.0
- ✅ 18.2.1
- ✅ 18.3.0
- ✅ 18.9.5
- ❌ 19.0.0 (MAJOR change)

### Tilde (~) - Patch Only

\`\`\`json
{
  "dependencies": {
    "lodash": "~4.17.21"
  }
}
\`\`\`

**Meaning**: Allow only PATCH updates.

**Will match**:
- ✅ 4.17.21
- ✅ 4.17.22
- ❌ 4.18.0 (MINOR change)
- ❌ 5.0.0 (MAJOR change)

### Exact Version

\`\`\`json
{
  "dependencies": {
    "some-unstable-package": "1.2.3"
  }
}
\`\`\`

**Meaning**: Only this exact version.

### Wildcard (*)

\`\`\`json
{
  "dependencies": {
    "dangerous-package": "*"
  }
}
\`\`\`

**Meaning**: Any version (⚠️ **NEVER USE THIS IN PRODUCTION**)

## Why SemVer Matters for Package Managers

When you run \`npm install\`, the package manager needs to:

1. Read your package.json
2. See you want "react": "^18.2.0"
3. Check the npm registry for all versions of react
4. Find the **highest version** that matches ^18.2.0
5. Download and install it

Without SemVer, this would be impossible!

## Pre-release Versions

Sometimes you'll see versions like:

- \`1.0.0-alpha\`
- \`1.0.0-beta.1\`
- \`2.0.0-rc.3\`

These are **pre-release** versions:
- **alpha**: Early, possibly unstable
- **beta**: Feature complete, being tested
- **rc** (release candidate): Nearly ready for release

## Common Mistakes

### Mistake #1: Trusting SemVer Blindly

**Problem**: Not all packages follow SemVer correctly.

\`\`\`json
{
  "dependencies": {
    "some-package": "^2.0.0"
  }
}
\`\`\`

The maintainer might push 2.1.0 with breaking changes. Your app breaks.

**Solution**: Use lock files and test updates before deploying.

### Mistake #2: Using * or >= Without Limits

\`\`\`json
{
  "dependencies": {
    "package": "*"  // ❌ BAD
  }
}
\`\`\`

**Problem**: Tomorrow, version 99.0.0 could be released and break everything.

## Interactive Exercise

Try to determine what versions match these ranges:

**Question 1**: What versions match \`^1.2.3\`?
- A) 1.2.3, 1.2.4, 1.3.0, 2.0.0
- B) 1.2.3, 1.2.4, 1.3.0
- C) Only 1.2.3
- **Answer**: B

**Question 2**: What versions match \`~1.2.3\`?
- A) 1.2.3, 1.2.4
- B) 1.2.3, 1.3.0
- C) 1.2.3, 2.0.0
- **Answer**: A

## Key Takeaways

1. SemVer uses MAJOR.MINOR.PATCH format
2. Breaking changes = MAJOR bump
3. New features (compatible) = MINOR bump
4. Bug fixes = PATCH bump
5. ^ allows MINOR/PATCH updates
6. ~ allows only PATCH updates
7. Lock files ensure exact versions are installed

## What's Next?

Now that you understand how versions work, we need to understand **where** packages come from. In the next lesson, we'll explore the npm registry and how package managers fetch code from the internet.
      `,
    },
    '03-registry': {
      id: '03-registry',
      title: 'Package Registries Explained',
      moduleId: '0-foundation',
      duration: '20 min',
      content: `
# Package Registries: Where Packages Live

A **package registry** is a centralized database of packages. When you run \`npm install react\`, where does it come from? The **npm registry**.

## The npm Registry

URL: **https://registry.npmjs.org**

This is the default registry for npm, Yarn, pnpm, and Bun. It contains over **2 million packages**.

### How It Works

1. **Publishing**: Developers publish packages to the registry
2. **Storage**: Packages are stored as tarballs (.tgz files)
3. **Metadata**: Each package has metadata (versions, dependencies, etc.)
4. **Distribution**: CDN serves packages globally

### Registry API

The registry is just a REST API:

\`\`\`bash
# Get package info
curl https://registry.npmjs.org/react

# Get specific version
curl https://registry.npmjs.org/react/18.2.0
\`\`\`

## What's in a Package?

When you install a package, you get:

1. **Source code** - The actual JavaScript files
2. **package.json** - Metadata and dependencies
3. **README.md** - Documentation
4. **LICENSE** - Legal terms
5. **Additional files** - Types, tests, etc.

## Alternative Registries

### 1. Private Registries

Companies often host their own registries for internal packages:

- **Verdaccio** - Open source private registry
- **npm Enterprise** - Hosted solution
- **GitHub Packages** - Integrated with GitHub
- **JFrog Artifactory** - Enterprise solution

\`\`\`bash
# Configure custom registry
npm config set registry https://my-company.registry.com
\`\`\`

### 2. Registry Mirrors

For faster downloads in certain regions:

\`\`\`bash
# Use a mirror
npm config set registry https://registry.npmmirror.com
\`\`\`

## Package Scopes

Scopes create namespaces:

\`\`\`json
{
  "dependencies": {
    "@react/core": "1.0.0",
    "@mycompany/utils": "2.3.1"
  }
}
\`\`\`

Benefits:
- Avoid name conflicts
- Group related packages
- Private packages under your organization

## Security Considerations

### 1. Package Integrity

Lock files include **checksums** to verify packages weren't tampered with:

\`\`\`json
// package-lock.json
{
  "packages": {
    "node_modules/react": {
      "version": "18.2.0",
      "integrity": "sha512-/3IjMdb2L9QbBdWiW5e3P2/npwMBaU9mHCSCUzNln0ZCYbcfTsGbTJrU/kGemdH2IWmB2ioZ+zkxtmq6g09fGQ=="
    }
  }
}
\`\`\`

### 2. Audit

Check for known vulnerabilities:

\`\`\`bash
npm audit
\`\`\`

## What's Next?

Now you understand:
✅ Why package managers exist
✅ How versions work (SemVer)
✅ Where packages come from (registries)

Next, we'll dive deep into **npm** - the original and most widely used JavaScript package manager.
      `,
    },
  },
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>
}) {
  const { moduleId, lessonId } = await params
  const lesson = lessonsContent[moduleId]?.[lessonId]

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <Link href={`/modules/${moduleId}`} className="text-blue-600 hover:underline">
            Return to Module
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/modules/${moduleId}`}
              className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Module
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              {lesson.duration}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: lesson.content.split('\n').map((line: string) => {
              if (line.startsWith('# ')) {
                return `<h1 class="text-4xl font-bold text-gray-900 mb-6">${line.substring(2)}</h1>`
              }
              if (line.startsWith('## ')) {
                return `<h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${line.substring(3)}</h2>`
              }
              if (line.startsWith('### ')) {
                return `<h3 class="text-2xl font-semibold text-gray-800 mt-6 mb-3">${line.substring(4)}</h3>`
              }
              if (line.startsWith('```')) {
                const lang = line.substring(3)
                return lang ? `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang}">` : '</code></pre>'
              }
              if (line.startsWith('- ')) {
                return `<li class="ml-4">${line.substring(2)}</li>`
              }
              if (line.startsWith('> ')) {
                return `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">${line.substring(2)}</blockquote>`
              }
              if (line.trim() === '') {
                return '<br/>'
              }
              return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`
            }).join('') }} />
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href={`/modules/${moduleId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Lesson
          </Link>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
          <Link
            href={`/modules/${moduleId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
          >
            Next Lesson
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
