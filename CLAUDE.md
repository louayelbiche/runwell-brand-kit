# @runwell/brand-kit - Claude Instructions

> **CLAUDE-PM ORCHESTRATED**
> This project is managed by the claude-PM agent-of-agents system.
> Master registry: `/Users/balencia/Documents/Code/claude-PM/foundation/agents/registry.json`
> Project mapping: `/Users/balencia/Documents/Code/claude-PM/infrastructure/config/project-agent-map.json`
>
> All code changes → `/code` (Coder agent)
> All deployments → `/deploy` (Deployment agent)
> Complex tasks → `/orchestrate` (auto-routes to appropriate agents)

---



## Overview

Design kit for Runwell Systems providing consistent colors, typography, spacing, and theming. Dual-brand system with External (teal/M3) for client-facing apps and Internal (purple) for team tools.

## Package Info

| Attribute | Value |
|-----------|-------|
| **Package** | @runwell/brand-kit |
| **Version** | 1.2.0 |
| **Type** | npm package (ESM) |
| **Registry** | npm public |

## Quick Commands

```bash
# Install dependencies
npm install

# Build all outputs
npm run build

# Build tokens only
npm run build:tokens

# Clean build artifacts
npm run clean

# Publish to npm
npm publish
```

## Project Structure

```
runwell-brand-kit/
├── src/
│   ├── tokens/             # Source design tokens
│   │   ├── core.json       # Spacing, typography, radius
│   │   ├── external.json   # Teal/M3 brand colors
│   │   └── internal.json   # Purple brand colors
│   ├── tailwind/           # Tailwind presets
│   ├── mui/                # MUI theme definitions
│   └── types/              # TypeScript definitions
├── scripts/
│   └── build.ts            # Token build script (Style Dictionary)
├── dist/                   # Build output
│   ├── css/                # CSS variables
│   ├── json/               # JSON tokens
│   ├── tailwind/           # Tailwind presets
│   ├── mui/                # MUI themes
│   └── types/              # Type definitions
└── package.json
```

## Key Files

| File | Purpose |
|------|---------|
| `src/tokens/core.json` | Core tokens (spacing, typography, radius) |
| `src/tokens/external.json` | External brand (teal/M3) |
| `src/tokens/internal.json` | Internal brand (purple) |
| `scripts/build.ts` | Style Dictionary build script |

## Brand System

### External Brand (Client-Facing)
- Primary: Teal (#006c51)
- Material Design 3 compliant
- Used by: inventory-intelligence, sales-agent-demo, runwell-website

### Internal Brand (Team Tools)
- Primary: Purple (#7c3aed)
- Used by: runwell-health-monitor, demo-portal, command-center

## Output Formats

| Format | Path | Usage |
|--------|------|-------|
| CSS Variables | `dist/css/*.css` | Direct CSS import |
| Tailwind Presets | `dist/tailwind/*.preset.js` | Tailwind config |
| MUI Themes | `dist/mui/*.js` | Material UI ThemeProvider |
| JSON Tokens | `dist/json/*.json` | Programmatic access |
| TypeScript | `dist/types/*.d.ts` | Type definitions |

## Usage Examples

### CSS Variables
```css
@import '@runwell/brand-kit/css/external.light.css';

.button {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
```

### Tailwind
```typescript
// tailwind.config.ts
import externalPreset from '@runwell/brand-kit/tailwind/external.preset';

export default {
  presets: [externalPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

### MUI
```tsx
import { lightTheme } from '@runwell/brand-kit/mui/external';

<ThemeProvider theme={lightTheme}>
  <App />
</ThemeProvider>
```

## Build System

Uses Style Dictionary for token transformation:

```bash
# Build flow
npm run build:tokens  # Generate all output formats
npm run build:esm     # Compile TypeScript
npm run build:types   # Generate declarations
```

## Versioning

Follow semver for npm releases:
- MAJOR: Breaking changes to token names/structure
- MINOR: New tokens, new output formats
- PATCH: Value adjustments, bug fixes

## Consumers

Projects using this package:
- inventory-intelligence
- sales-agent-demo
- runwell-health-monitor
- demo-portal
- command-center
- runwell-website

## Universal Rules

See [Universal Development Rules](/Users/balencia/Documents/Code/claude-PM/foundation/rules/universal-rules.md) for documentation, port management, database protocols, and deployment patterns.

## Related Documentation

- [README.md](README.md) - Public documentation
- [Project Registry](/Users/balencia/Documents/Code/claude-PM/foundation/PROJECT-REGISTRY.md)
- [Brand Guidelines](/Users/balencia/Documents/Code/claude-PM/projects/runwell-internal/foundation/brand-guidelines.v2.md)
