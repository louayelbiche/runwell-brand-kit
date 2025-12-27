# @runwell/brand-tokens

Design tokens for Runwell Systems. Provides consistent colors, typography, spacing, and theming across all Runwell applications.

## Features

- **Dual-brand system**: External (teal/M3) for client-facing apps, Internal (purple) for team tools
- **Multiple output formats**: CSS variables, Tailwind presets, MUI themes, JSON tokens
- **Light & dark modes**: Full support for both color schemes
- **TypeScript types**: Full type definitions for type-safe usage
- **M3 compliant**: External brand follows Material Design 3 color system

## Installation

```bash
npm install @runwell/brand-tokens
```

## Quick Start

### CSS Variables

```css
/* External brand (client-facing) */
@import '@runwell/brand-tokens/css/external.light.css';

/* Dark mode */
@import '@runwell/brand-tokens/css/external.dark.css';

/* Internal brand (team tools) */
@import '@runwell/brand-tokens/css/internal.light.css';
```

```css
.button {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-full);
  font-family: var(--font-family-sans);
}
```

### Tailwind CSS

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import externalPreset from '@runwell/brand-tokens/tailwind/external.preset';
// OR
import internalPreset from '@runwell/brand-tokens/tailwind/internal.preset';

const config: Config = {
  presets: [externalPreset],
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
```

```tsx
// Use in components
<button className="bg-primary text-onPrimary px-6 py-3 rounded-full">
  Get Started
</button>
```

### Material UI (MUI)

```tsx
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@runwell/brand-tokens/mui/external';
// OR
import { lightTheme, darkTheme } from '@runwell/brand-tokens/mui/internal';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### JSON Tokens

```typescript
import externalTokens from '@runwell/brand-tokens/json/external.light.json';
import coreTokens from '@runwell/brand-tokens/json/core.json';

console.log(externalTokens.color.primary); // "#006c51"
console.log(coreTokens.spacing[4]); // "16px"
```

## Brand System

### External Brand (Teal/M3)

Used for: Website, demos, proposals, client-facing apps

| Role | Light Mode | Dark Mode |
|------|------------|-----------|
| Primary | `#006C51` | `#8AD6B8` |
| On Primary | `#FFFFFF` | `#003829` |
| Background | `#FBFDF9` | `#0F1512` |
| Surface | `#F8FAF6` | `#171D1A` |

### Internal Brand (Purple)

Used for: Admin panels, dashboards, team tools

| Role | Light Mode | Dark Mode |
|------|------------|-----------|
| Primary | `#7c3aed` | `#a78bfa` |
| Accent | `#22d3ee` | `#67e8f9` |
| Background | `#f8fafc` | `#0f172a` |
| Surface | `#ffffff` | `#1e293b` |

## Token Categories

### Core Tokens (Shared)

- **Spacing**: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5, 6, 8, 10, 12, 16, 20, 24, 32
- **Typography**: Inter (sans), JetBrains Mono (mono)
- **Font Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
- **Border Radius**: none, sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px), full
- **Shadows**: none, sm, md, lg, xl, 2xl

### Color Tokens

External brand uses M3 semantic roles:
- `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`
- `secondary`, `tertiary`, `error`, `success`, `warning`, `info`
- `background`, `surface`, `surfaceContainer`, `outline`

Internal brand uses simpler roles:
- `primary`, `primaryLight`, `primaryDark`, `accent`
- `background`, `surface`, `text`, `textSecondary`, `border`
- `success`, `warning`, `error`, `info`

## Runtime Theme Switching

```typescript
import { createThemeSwitcher } from '@runwell/brand-tokens';

const switcher = createThemeSwitcher({
  defaultBrand: 'external',
  defaultMode: 'light',
  persistKey: 'runwell-theme',
});

// Initialize on page load
switcher.init();

// Switch modes
switcher.toggleMode(); // light ↔ dark
switcher.setMode('dark');

// Switch brands
switcher.setBrand('internal');
```

## File Structure

```
dist/
├── css/
│   ├── external.light.css
│   ├── external.dark.css
│   ├── internal.light.css
│   └── internal.dark.css
├── tailwind/
│   ├── external.preset.js
│   └── internal.preset.js
├── mui/
│   ├── external.ts (exports lightTheme, darkTheme)
│   └── internal.ts (exports lightTheme, darkTheme)
└── json/
    ├── external.light.json
    ├── external.dark.json
    ├── internal.light.json
    ├── internal.dark.json
    └── core.json
```

## Development

```bash
# Install dependencies
npm install

# Build all outputs
npm run build

# Build only tokens (no TypeScript)
npm run build:tokens

# Clean dist folder
npm run clean
```

## License

MIT
