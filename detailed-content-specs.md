# Package Managers Course: Detailed Content Specifications
## Module-by-Module Content, Examples, and Exercises

---

## **MODULE 0: FOUNDATION & CONTEXT**

### **Lesson 0.1: The Problem Space**

#### Content Outline:
**Before Package Managers (The Dark Ages):**
```
The old way (pre-2010):
1. Download library.js from website
2. Copy to your project folder
3. Add <script src="library.js"></script>
4. Hope you downloaded the right version
5. Manually update when new version releases
6. Repeat for all dependencies
7. Deal with dependency conflicts manually
```

**Problems This Created:**
1. **No version control**: Which version did you download?
2. **No dependency tracking**: What does your project need?
3. **No updates**: How do you know when to update?
4. **Dependency hell**: Library A needs jQuery 1.x, Library B needs jQuery 2.x
5. **No reproducibility**: Different team members have different versions
6. **Security nightmare**: No way to track vulnerabilities

**The Package Manager Solution:**
```json
// Instead of managing files, declare what you need:
{
  "dependencies": {
    "react": "^18.2.0",
    "lodash": "^4.17.21"
  }
}

// One command installs everything:
npm install
```

#### Visual Diagram 1: "Evolution of Dependency Management"
```
[Manual Download] → [Package Manager] → [Advanced Package Manager]
     (2000s)             (npm 2010)         (Bun/pnpm 2020s)
     
Characteristics:
Manual:
- ❌ No automation
- ❌ Error-prone
- ❌ Time-consuming

npm:
- ✅ Automated
- ✅ Version tracking
- ⚠️ Sometimes slow
- ⚠️ Large disk usage

Modern:
- ✅ Lightning fast
- ✅ Space efficient
- ✅ Secure
- ✅ Developer-friendly
```

#### Code Example 0.1: Before and After
```javascript
// Before package managers (circa 2008)
// Your HTML file:
<!DOCTYPE html>
<html>
<head>
    <!-- Hope these CDN links don't break! -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
    <script src="manually-downloaded-library.js"></script>
</head>
<body>
    <script src="app.js"></script>
</body>
</html>

// After package managers (2010+)
// package.json:
{
  "dependencies": {
    "jquery": "^3.6.0",
    "lodash": "^4.17.21",
    "some-library": "^2.1.0"
  }
}

// Just run: npm install
// Everything is downloaded, versioned, and ready to use
```

---

### **Lesson 0.2: Semantic Versioning Deep Dive**

#### Content Outline:

**SemVer Format: MAJOR.MINOR.PATCH**
```
Example: 2.4.7

2 = MAJOR version (breaking changes)
4 = MINOR version (new features, backwards compatible)
7 = PATCH version (bug fixes, backwards compatible)
```

**Version Range Operators:**
```json
{
  "dependencies": {
    "exact-version": "1.2.3",        // Exactly 1.2.3
    "caret": "^1.2.3",               // >=1.2.3 <2.0.0 (most common)
    "tilde": "~1.2.3",               // >=1.2.3 <1.3.0
    "greater-than": ">1.2.3",        // Any version > 1.2.3
    "greater-or-equal": ">=1.2.3",   // Any version >= 1.2.3
    "less-than": "<2.0.0",           // Any version < 2.0.0
    "range": ">=1.2.3 <2.0.0",       // Combine operators
    "wildcard-minor": "1.2.x",       // Any 1.2.* version
    "wildcard-patch": "1.x",         // Any 1.*.* version
    "any": "*",                      // Latest (dangerous!)
    "latest": "latest",              // Latest (very dangerous!)
  }
}
```

**Understanding Caret (^) - The Default:**
```
^1.2.3 means:
- Allow MINOR and PATCH updates
- Don't allow MAJOR updates
- Install: >=1.2.3 <2.0.0

Examples:
^1.2.3  →  Can install: 1.2.3, 1.2.4, 1.3.0, 1.9.9
           Cannot install: 2.0.0, 0.9.9

^0.2.3  →  Special rule for 0.x versions!
           Can install: 0.2.3, 0.2.4
           Cannot install: 0.3.0
           (Breaking changes common in 0.x)

^0.0.3  →  Even more special!
           Can install: Only 0.0.3
           (Treat as unstable)
```

**Understanding Tilde (~):**
```
~1.2.3 means:
- Allow only PATCH updates
- Don't allow MINOR or MAJOR updates
- Install: >=1.2.3 <1.3.0

Examples:
~1.2.3  →  Can install: 1.2.3, 1.2.4, 1.2.99
           Cannot install: 1.3.0, 2.0.0
```

#### Interactive Exercise 0.2: SemVer Calculator
```
User inputs:
- Version range: ^2.3.1
- Available versions: [2.3.0, 2.3.1, 2.3.5, 2.4.0, 3.0.0]

Output:
✓ 2.3.1 (matches, minimum version)
✓ 2.3.5 (matches, patch update)
✓ 2.4.0 (matches, minor update)
✗ 2.3.0 (below minimum)
✗ 3.0.0 (major version change blocked)

Installed version: 2.4.0 (highest matching version)
```

#### Lab 0.2: SemVer Scenarios
```
Scenario 1: Security Patch
- Current: react@18.2.0
- Security fix in: 18.2.1
- Your package.json: "react": "^18.2.0"
- Question: Will npm install get the fix? YES
- Why? Patch updates are allowed with ^

Scenario 2: Breaking Change
- Current: axios@0.27.2
- Breaking changes in: 1.0.0
- Your package.json: "axios": "^0.27.2"
- Question: Will you get 1.0.0? NO
- Why? Major version change blocked

Scenario 3: The Danger of "*"
- Your package.json: "some-lib": "*"
- Yesterday: installed 1.5.0 (stable)
- Today: 2.0.0 released (breaking changes)
- Question: What happens? BREAKS YOUR BUILD
- Lesson: Never use "*" or "latest"
```

---

### **Lesson 0.3: The Registry**

#### Content Outline:

**What is the npm Registry?**
- Largest software registry in the world
- Over 2 million packages
- Billions of downloads per week
- Hosted at registry.npmjs.org
- Free and open (for public packages)

**Registry Architecture:**
```
[Developer] --publish--> [npm Registry]
                              ↓
                        [CDN/Mirrors]
                              ↓
                        [Your Computer]
                              ↓
                        [node_modules]
```

**How Packages are Stored:**
```
Package: react@18.2.0

Registry stores:
1. Metadata (package.json)
2. Tarball (.tgz file)
3. README
4. Dependencies list
5. Download statistics
6. Version history
```

#### API Example: Fetching Package Info
```bash
# Get package metadata
curl https://registry.npmjs.org/react

# Response (simplified):
{
  "name": "react",
  "description": "React is a JavaScript library for building user interfaces.",
  "dist-tags": {
    "latest": "18.2.0",
    "next": "18.3.0-next.1"
  },
  "versions": {
    "18.2.0": {
      "name": "react",
      "version": "18.2.0",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "dist": {
        "tarball": "https://registry.npmjs.org/react/-/react-18.2.0.tgz",
        "shasum": "...",
        "integrity": "sha512-..."
      }
    }
  }
}
```

#### Lab 0.3: Explore the Registry
```bash
# Task 1: Inspect a package
npm view lodash

# Task 2: See all versions
npm view lodash versions

# Task 3: Download a package tarball
npm pack lodash

# Task 4: Extract and examine
tar -xzf lodash-4.17.21.tgz
cd package/
ls -la
# You'll see: package.json, README, source files
```

---

## **MODULE 1: NPM - THE FOUNDATION**

### **Lesson 1.1: npm Commands Mastery**

#### Command Deep Dive:

**npm init**
```bash
# Interactive mode
npm init
# Answer questions: name, version, description, etc.

# Skip questions (use defaults)
npm init -y

# With specific scope
npm init @scope/package-name

# Using initializers
npm init react-app my-app
# Equivalent to: npx create-react-app my-app

# What it creates:
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

**npm install (the most important command)**
```bash
# Install everything from package.json
npm install
npm i  # shorthand

# Install specific package
npm install lodash
npm install lodash@4.17.21  # specific version
npm install lodash@latest   # latest version (dangerous!)

# Install as devDependency
npm install --save-dev jest
npm install -D jest  # shorthand

# Install globally
npm install -g typescript

# Install from different sources
npm install user/repo              # GitHub
npm install user/repo#branch       # GitHub branch
npm install git+https://...        # Git URL
npm install https://example.com/package.tgz  # Tarball URL
npm install file:../local-package  # Local filesystem

# Install with specific flags
npm install --production          # Skip devDependencies
npm install --legacy-peer-deps    # Ignore peer dependency conflicts
npm install --force               # Force reinstall
npm install --dry-run            # Simulate without installing
```

**npm uninstall**
```bash
# Remove package
npm uninstall lodash
npm remove lodash  # alias
npm rm lodash      # short alias
npm un lodash      # even shorter

# Remove and update package.json
npm uninstall --save lodash
npm uninstall --save-dev jest

# Remove global package
npm uninstall -g typescript
```

**npm update**
```bash
# Update all packages (respecting ranges)
npm update

# Update specific package
npm update lodash

# Update to latest (ignoring semver)
npm install lodash@latest

# Check what's outdated first
npm outdated
# Output:
# Package  Current  Wanted  Latest
# lodash   4.17.20  4.17.21 4.17.21
```

**npm list**
```bash
# Show dependency tree
npm list
npm ls  # shorthand

# Show only top-level
npm ls --depth=0

# Show specific package
npm ls lodash

# Show global packages
npm ls -g --depth=0

# JSON output
npm ls --json
```

**npm view (inspect package)**
```bash
# View package info
npm view react

# Specific field
npm view react version
npm view react dependencies
npm view react dist.tarball

# All versions
npm view react versions

# View installed vs registry
npm outdated react
```

**npm search**
```bash
# Search registry
npm search testing framework

# Limit results
npm search testing --searchlimit=10
```

#### Lab 1.1: Command Challenges
```bash
# Challenge 1: Create a new project
# 1. Initialize with default values
# 2. Install react and react-dom
# 3. Install jest as dev dependency
# 4. List your dependencies
# 5. Check if anything is outdated

# Challenge 2: Dependency Detective
# 1. Install express
# 2. Use npm ls to see what express depends on
# 3. How many total packages were installed?
# 4. Find the deeply nested dependency tree

# Challenge 3: Version Manipulation
# 1. Install lodash@4.17.20
# 2. Check what versions are available
# 3. Update to latest within range
# 4. Install specific version 4.17.21
# 5. Try to install 3.x.x (intentionally old)
```

---

### **Lesson 1.2: package.json Mastery**

#### Complete Field Breakdown:

**Essential Fields:**
```json
{
  // IDENTITY
  "name": "my-awesome-package",
  // Rules: lowercase, no spaces, URL-safe
  // Can be scoped: @myorg/package-name
  
  "version": "1.0.0",
  // Must follow semantic versioning
  
  "description": "A package that does awesome things",
  // Shows up in npm search results
  
  // ENTRY POINTS
  "main": "index.js",
  // Default entry point (CommonJS)
  // Used by: require('package-name')
  
  "module": "dist/index.esm.js",
  // ES Module entry point
  // Used by: import pkg from 'package-name'
  
  "types": "dist/index.d.ts",
  // TypeScript definitions
  
  "exports": {
    // Modern way to define entry points
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./utils": {
      "import": "./dist/utils.esm.js",
      "require": "./dist/utils.cjs.js"
    }
  },
  
  // SCRIPTS
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint .",
    "format": "prettier --write .",
    "prepare": "husky install",  // Runs after npm install
    "prepublishOnly": "npm run build",  // Runs before npm publish
    "pretest": "npm run lint",  // Runs before npm test
    "posttest": "npm run coverage"  // Runs after npm test
  },
  
  // DEPENDENCIES
  "dependencies": {
    // Production dependencies
    "express": "^4.18.2",
    "lodash": "^4.17.21"
  },
  
  "devDependencies": {
    // Development-only dependencies
    "typescript": "^5.0.0",
    "jest": "^29.5.0",
    "@types/node": "^18.0.0"
  },
  
  "peerDependencies": {
    // Required to be installed by the consumer
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  
  "peerDependenciesMeta": {
    // Mark peer dependencies as optional
    "react-dom": {
      "optional": true
    }
  },
  
  "optionalDependencies": {
    // Install if possible, but don't fail if not
    "fsevents": "^2.3.2"  // macOS only
  },
  
  "bundledDependencies": [
    // Include these deps in your published tarball
    "internal-tool"
  ],
  
  // RUNTIME REQUIREMENTS
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  
  "os": ["darwin", "linux"],  // OS restrictions
  "cpu": ["x64", "arm64"],    // CPU restrictions
  
  // WORKSPACES (Monorepo)
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  
  // PUBLISHING
  "private": true,  // Prevent accidental publishing
  
  "files": [
    // What to include when publishing
    "dist/",
    "README.md",
    "LICENSE"
  ],
  
  "publishConfig": {
    "access": "public",  // For scoped packages
    "registry": "https://registry.npmjs.org/"
  },
  
  // METADATA
  "keywords": ["awesome", "utility", "helper"],
  "author": "Your Name <email@example.com>",
  "contributors": [
    "Contributor 1 <email@example.com>",
    "Contributor 2 <email@example.com>"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  },
  "bugs": {
    "url": "https://github.com/user/repo/issues"
  },
  "homepage": "https://github.com/user/repo#readme",
  
  // BROWSER-SPECIFIC
  "browser": {
    // Override modules for browser
    "fs": false,  // Disable Node.js modules
    "./lib/server.js": "./lib/browser.js"  // Use browser version
  },
  
  // CONFIGURATION
  "config": {
    // Custom configuration
    "port": 3000
  }
}
```

#### Deep Dive: Dependency Types

**1. dependencies - Production Code**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "^4.17.21"
  }
}

// Rule: Anything your application NEEDS to run in production
// Examples: frameworks, utilities, libraries
// Installed with: npm install (always)
```

**2. devDependencies - Development Tools**
```json
{
  "devDependencies": {
    "typescript": "^5.0.0",
    "jest": "^29.5.0",
    "eslint": "^8.0.0",
    "prettier": "^2.8.0",
    "@types/node": "^18.0.0"
  }
}

// Rule: Tools used during development, not needed in production
// Examples: test frameworks, linters, type definitions, build tools
// Installed with: npm install (development)
// Skipped with: npm install --production
```

**3. peerDependencies - Plugin Pattern**
```json
// In a React component library:
{
  "name": "my-react-components",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}

// Means: "I need React, but I expect the consumer to provide it"
// Why? Avoid having multiple versions of React
// npm 7+: Automatically installs peer dependencies
// npm 3-6: Just warned you to install them
```

**Real-World Peer Dependency Example:**
```json
// Your app:
{
  "dependencies": {
    "react": "^18.2.0",
    "my-react-components": "^1.0.0"  // Has React as peer dep
  }
}

// Result: Only one copy of React is installed
// Both your app and my-react-components use the same React instance

// Without peer dependencies:
// - my-react-components would bundle its own React
// - You'd have TWO copies of React
// - React would break (it doesn't support multiple instances)
```

**4. optionalDependencies - Graceful Failure**
```json
{
  "optionalDependencies": {
    "fsevents": "^2.3.2"  // macOS file watching
  }
}

// Rule: Nice to have, but not required
// If installation fails, npm continues
// Your code must handle absence:

// In your code:
let fsevents;
try {
  fsevents = require('fsevents');
} catch (e) {
  // Fallback to polling or other method
}
```

#### Lab 1.2: package.json Engineering
```json
// Exercise: Fix this package.json

{
  "name": "My Awesome App",  // ❌ Wrong! No spaces, no capitals
  "version": "1.0",  // ❌ Wrong! Not valid semver
  "dependencies": {
    "react": "*",  // ❌ Dangerous! Use specific range
    "jest": "^29.0.0"  // ❌ Wrong! Jest should be devDependency
  },
  "devDependencies": {
    "express": "^4.18.0"  // ❌ Wrong! Express should be dependency
  },
  "scripts": {
    "start": "node server.js",
    "test": "jest",
    "deploy": "npm test && git push origin main"  // ❌ Security issue!
  }
}

// Corrected version:
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "test": "jest",
    "predeploy": "npm test",
    "deploy": "echo 'Deploy via CI/CD, not npm scripts'"
  }
}
```

---

### **Lesson 1.3: package-lock.json Deep Dive**

#### Why Lock Files Exist: The Problem
```
# Without lock file:
Developer A (Monday):
- package.json: "lodash": "^4.17.20"
- npm install
- Gets lodash@4.17.20

Developer B (Tuesday):
- Same package.json: "lodash": "^4.17.20"
- npm install
- Lodash released 4.17.21 overnight
- Gets lodash@4.17.21

Result: Different dependencies! 🐛
```

#### package-lock.json Structure
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "lockfileVersion": 3,  // Format version
  "requires": true,       // Has dependencies
  "packages": {
    // Root package
    "": {
      "name": "my-app",
      "version": "1.0.0",
      "dependencies": {
        "express": "^4.18.2"
      },
      "devDependencies": {
        "jest": "^29.5.0"
      }
    },
    
    // Installed packages
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-5/PsL6iGPdfQ/lKM1UuielYgv3BUoJfz1aUwU9vHZ+J7gyvwdQXFEBIEIaxeGf0GIcreATNyBExtalisDbuMqQ==",
      "dependencies": {
        "body-parser": "1.20.1",
        "cookie": "0.5.0",
        // ... more dependencies
      },
      "engines": {
        "node": ">= 0.10.0"
      }
    },
    
    "node_modules/body-parser": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.1.tgz",
      "integrity": "sha512-jWi7abTbYwajOytWCQc37VulmWiRae5RyTpaCyDcS5/lMdtwSz5lOpDE67srw/HYe35f1z3fDQw+3txg7gNtWw==",
      "dependencies": {
        "bytes": "3.1.2",
        "content-type": "~1.0.4",
        // ...
      }
    }
    // ... hundreds more packages
  }
}
```

#### Key Fields Explained:

**integrity hash:**
```
"integrity": "sha512-5/PsL6iGPdfQ/..."

// This is a SHA-512 hash of the package tarball
// Ensures the downloaded package hasn't been tampered with
// If hash doesn't match, npm refuses to install

// Format: algorithm-base64-hash
// Usually: sha512-... or sha1-...
```

**resolved URL:**
```
"resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz"

// Exact URL where the package was downloaded from
// Ensures you download from the same place
// Can point to:
//   - npm registry
//   - Private registry
//   - Git repository
//   - Local file
```

#### Lock File Versions:

**Lockfile Version 1 (npm 5-6):**
- Flat structure
- Less detailed

**Lockfile Version 2 (npm 7):**
- Both flat and nested structure
- More metadata
- Backwards compatible

**Lockfile Version 3 (npm 9+):**
- Optimized format
- Hidden lockfile field
- Improved performance

#### When Lock Files Update:
```bash
npm install           # Uses existing lock, updates if needed
npm install lodash    # Adds/updates lodash entry
npm update           # Updates packages within ranges
npm update lodash    # Updates specific package
npm install --package-lock-only  # Update lock without installing
```

#### Lock File Best Practices:

**DO:**
✓ Commit package-lock.json to git (for applications)
✓ Use npm ci in CI/CD (faster, strict)
✓ Review lock file changes in PRs
✓ Keep lock file in sync with package.json

**DON'T:**
✗ Edit lock file manually
✗ Delete lock file to "fix" issues (rarely helps)
✗ Commit lock files for libraries (see below)

**Libraries vs Applications:**
```
Application (end product):
- Commit package-lock.json ✓
- Users run your specific versions
- Example: web app, API server

Library (consumed by others):
- Don't commit package-lock.json ✗
- Users should use their own versions
- Example: React, Lodash, your npm package
```

#### Lab 1.3: Lock File Forensics
```bash
# Exercise 1: Lock File Surgery
# 1. Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Install with npm install
npm install

# 3. Check what versions were installed
npm ls --depth=0

# 4. Now delete just node_modules (keep lock file)
rm -rf node_modules

# 5. Install again
npm install

# 6. Compare versions
npm ls --depth=0
# Result: IDENTICAL! That's the lock file working

# Exercise 2: Lock File Conflicts
# Simulate a merge conflict:
# 1. Branch A: npm install react@17.0.0
# 2. Branch B: npm install react@18.0.0
# 3. Merge and see conflict
# 4. Resolution: Choose one version, delete conflict markers
# 5. Run npm install to regenerate lock file
```

---

## **[CONTINUED IN NEXT RESPONSE - This file is getting long]**

## **INTERVIEW QUESTION BANK - MODULE 1 (npm)**

### Junior Level Questions:

**Q1: What is the difference between npm install and npm ci?**
```
Answer:
npm install:
- Reads package.json
- Updates package-lock.json if needed
- Can install different versions than lock file
- Slower
- Use in development

npm ci:
- Reads package-lock.json ONLY
- Requires lock file to exist
- Deletes node_modules first
- Installs exact versions
- Faster (10-50% faster)
- Use in CI/CD

Example:
# Development:
npm install

# CI/CD pipeline:
npm ci
```

**Q2: When should you use --save-dev vs --save?**
```
Answer:
--save-dev (devDependencies):
- Development tools only
- Not needed in production
- Examples: jest, eslint, typescript, webpack

--save (dependencies):
- Production code
- Required to run the application
- Examples: express, react, lodash

Note: --save is default in npm 5+, so just:
npm install express        # Goes to dependencies
npm install -D jest        # Goes to devDependencies
```

**Q3: What does the ^ symbol mean in package versions?**
```
Answer:
^ = Allow minor and patch updates, but not major

^1.2.3 means:
- ✓ Can install: 1.2.3, 1.2.4, 1.3.0, 1.9.9
- ✗ Cannot install: 2.0.0

Why? Semantic versioning promises:
- MAJOR = breaking changes
- MINOR = new features (backwards compatible)
- PATCH = bug fixes (backwards compatible)

^ ensures you get updates but avoid breaking changes
```

### Mid Level Questions:

**Q4: Explain the npm install process step-by-step**
```
Answer:
1. Read package.json
   - Parse dependencies
   - Identify what needs to be installed

2. Check package-lock.json (if exists)
   - Use locked versions
   - Skip resolution for known packages

3. Resolve dependency tree
   - Fetch package metadata from registry
   - Resolve version conflicts
   - Build ideal tree structure

4. Check npm cache (~/.npm/)
   - Skip downloads for cached packages
   - Verify integrity hashes

5. Download tarballs
   - Fetch from registry (or use cache)
   - Verify integrity
   - Extract to temp directory

6. Build node_modules
   - Place packages with hoisting
   - Create .bin executables
   - Handle nested dependencies

7. Run lifecycle scripts
   - preinstall (before install)
   - install (each package)
   - postinstall (after install)

8. Update package-lock.json
   - Write exact versions installed
   - Save integrity hashes
   - Record resolved URLs

9. Write metadata
   - Update timestamps
   - Save audit data
```

**Q5: What is hoisting and why does it cause phantom dependencies?**
```
Answer:
Hoisting: npm flattens the dependency tree to avoid duplication

Example without hoisting:
node_modules/
├── package-a/
│   └── node_modules/
│       └── lodash/  (duplicate!)
└── package-b/
    └── node_modules/
        └── lodash/  (duplicate!)

With hoisting:
node_modules/
├── lodash/  (shared!)
├── package-a/
└── package-b/

Phantom Dependencies Problem:
// Your code:
import _ from 'lodash'  // Works!

// But package.json:
{
  "dependencies": {
    "package-a": "1.0.0"  // Depends on lodash
    // lodash not listed!
  }
}

// This is a phantom dependency
// It works because lodash was hoisted
// But if package-a removes lodash, your code breaks
// Solution: Always explicitly declare dependencies

Tools that prevent this:
- pnpm (strict mode)
- Yarn PnP (no node_modules)
```

### Senior Level Questions:

**Q6: How would you optimize npm install in CI/CD?**
```
Answer:
Strategy 1: Use npm ci
- Always faster than npm install
- Ensures reproducible builds
- Deletes node_modules first (clean slate)

Strategy 2: Cache node_modules
# GitHub Actions example:
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

Strategy 3: Layer caching in Docker
# Dockerfile optimization:
COPY package*.json ./
RUN npm ci
COPY . .
# Now package changes don't invalidate npm cache

Strategy 4: Consider alternate package managers
- pnpm: faster, uses less disk
- Bun: even faster, if compatible

Strategy 5: Paralelize when possible
# Install in parallel stages if independent

Benchmark results:
npm install:     60s
npm ci:          30s (50% faster)
npm ci + cache:  10s (6x faster)
pnpm install:     5s (12x faster)
```

**Q7: Explain peer dependencies and provide a real-world use case**
```
Answer:
Peer dependencies solve the "shared dependency" problem

Use Case: React Plugin Library

Without peer dependencies:
// Your package.json:
{
  "dependencies": {
    "react": "^18.0.0"  // ❌ Bundles own React
  }
}

// User's app:
{
  "dependencies": {
    "react": "^18.0.0",     // User's React
    "your-plugin": "^1.0.0"  // Your React (duplicate!)
  }
}

Result:
- Two copies of React installed
- Larger bundle size
- React breaks (doesn't support multiple instances)

With peer dependencies:
// Your package.json:
{
  "peerDependencies": {
    "react": "^18.0.0"  // ✓ Expects user to provide
  }
}

// User's app:
{
  "dependencies": {
    "react": "^18.0.0",     // Shared React
    "your-plugin": "^1.0.0"  // Uses shared React
  }
}

Result:
- One copy of React
- Smaller bundle
- React works correctly

npm behavior:
- npm 3-6: Just warned user
- npm 7+: Auto-installs peer deps

Best practices:
1. Use for plugins/extensions
2. Document peer dependency requirements
3. Test against all supported versions
4. Use peerDependenciesMeta for optional peers
```

### Architect Level Questions:

**Q8: Design a caching strategy for npm in a large organization**
```
Answer:
Requirements Analysis:
- 1000+ developers
- Multiple projects
- Fast builds
- Security and compliance
- Bandwidth optimization

Architecture:

[Developers] → [Caching Proxy] → [npm Registry]
                     ↓
              [Local Cache]
                     ↓
              [S3/Blob Storage]

Components:

1. Private Registry (Verdaccio/Nexus/Artifactory)
   - Caches npm packages
   - Hosts private packages
   - Access control
   - Audit logs

2. CDN Layer
   - Geographic distribution
   - Reduce latency
   - Handle traffic spikes

3. Build Server Cache
   - Persistent cache between builds
   - Shared across projects
   - Cache invalidation strategy

4. Developer Machine Cache
   - Local ~/.npm cache
   - Fast for repeated installs

Implementation:
# Set registry in .npmrc (project level)
registry=https://npm.company.com/

# Or environment variable
NPM_CONFIG_REGISTRY=https://npm.company.com/

# Configure caching proxy
# Verdaccio config:
storage: ./storage
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    cache: true
    maxage: 30m

packages:
  '@company/*':
    access: $authenticated
    publish: $authenticated
  '**':
    access: $all
    proxy: npmjs

Monitoring:
- Cache hit rates
- Bandwidth savings
- Build time improvements
- Package download stats

Security:
- Scan packages for vulnerabilities
- Block malicious packages
- Audit all downloads
- Enforce package policies

Cost savings:
- Reduced npm registry API calls
- Lower bandwidth costs
- Faster builds (developer time)
- Typical savings: 60-80% reduction in external calls
```

