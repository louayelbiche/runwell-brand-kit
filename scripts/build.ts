import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Custom format: Tailwind preset
StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: ({ dictionary }) => {
    const colors: Record<string, any> = {};
    const spacing: Record<string, string> = {};
    const fontSize: Record<string, string> = {};
    const fontFamily: Record<string, string> = {};
    const borderRadius: Record<string, string> = {};

    dictionary.allTokens.forEach(token => {
      const path = token.path;

      if (path[0] === 'color' || path[0] === 'palette') {
        let current = colors;
        const colorPath = path[0] === 'palette' ? path.slice(1) : path.slice(1);
        colorPath.forEach((segment, i) => {
          if (i === colorPath.length - 1) {
            current[segment] = token.value;
          } else {
            current[segment] = current[segment] || {};
            current = current[segment];
          }
        });
      } else if (path[0] === 'spacing') {
        spacing[path[1]] = token.value;
      } else if (path[0] === 'fontSize') {
        fontSize[path[1]] = token.value;
      } else if (path[0] === 'fontFamily') {
        fontFamily[path[1]] = token.value;
      } else if (path[0] === 'radius') {
        borderRadius[path[1]] = token.value;
      }
    });

    const preset = {
      theme: {
        extend: {
          colors,
          spacing: Object.keys(spacing).length > 0 ? spacing : undefined,
          fontSize: Object.keys(fontSize).length > 0 ? fontSize : undefined,
          fontFamily: Object.keys(fontFamily).length > 0 ? fontFamily : undefined,
          borderRadius: Object.keys(borderRadius).length > 0 ? borderRadius : undefined,
        },
      },
    };

    // Clean undefined values
    Object.keys(preset.theme.extend).forEach(key => {
      if (preset.theme.extend[key as keyof typeof preset.theme.extend] === undefined) {
        delete preset.theme.extend[key as keyof typeof preset.theme.extend];
      }
    });

    return `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(preset, null, 2)};
`;
  },
});

// Custom format: MUI theme
StyleDictionary.registerFormat({
  name: 'mui/theme',
  format: ({ dictionary, options }) => {
    const mode = options?.mode || 'light';
    const brand = options?.brand || 'external';

    const colors: Record<string, string> = {};
    const palettes: Record<string, Record<string, string>> = {};

    dictionary.allTokens.forEach(token => {
      const path = token.path;

      if (path[0] === 'palette') {
        const paletteName = path[1];
        const tone = path[2];
        if (!palettes[paletteName]) palettes[paletteName] = {};
        palettes[paletteName][tone] = token.value;
      } else if (path[0] === 'color') {
        colors[path[1]] = token.value;
      }
    });

    const isExternal = brand === 'external';

    return `import { createTheme, type ThemeOptions } from '@mui/material/styles';

export const palettes = ${JSON.stringify(palettes, null, 2)} as const;

export const ${mode}ThemeOptions: ThemeOptions = {
  palette: {
    mode: '${mode}',
    primary: {
      main: '${colors.primary || (isExternal ? '#006C51' : '#7c3aed')}',
      light: '${colors.primaryLight || (isExternal ? '#25A37F' : '#a78bfa')}',
      dark: '${colors.primaryDark || (isExternal ? '#00513D' : '#6d28d9')}',
      contrastText: '${colors.onPrimary || '#FFFFFF'}',
    },
    secondary: {
      main: '${colors.secondary || colors.accent || (isExternal ? '#4C6359' : '#22d3ee')}',
      contrastText: '${colors.onSecondary || colors.onAccent || '#FFFFFF'}',
    },
    background: {
      default: '${colors.background || '#FBFDF9'}',
      paper: '${colors.surface || colors.surfaceContainer || '#EFF1EE'}',
    },
    text: {
      primary: '${colors.onBackground || colors.text || '#2C322F'}',
      secondary: '${colors.onSurfaceVariant || colors.textSecondary || '#5C5F5D'}',
    },
    error: {
      main: '${colors.error || '#BA1A1A'}',
      contrastText: '${colors.onError || '#FFFFFF'}',
    },
    warning: {
      main: '${colors.warning || '#F57C00'}',
      contrastText: '${colors.onWarning || '#FFFFFF'}',
    },
    success: {
      main: '${colors.success || '#2E7D32'}',
      contrastText: '${colors.onSuccess || '#FFFFFF'}',
    },
    info: {
      main: '${colors.info || '#1976D2'}',
      contrastText: '${colors.onInfo || '#FFFFFF'}',
    },
    divider: '${colors.outlineVariant || colors.border || '#C5C7C4'}',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
};

export const ${mode}Theme = createTheme(${mode}ThemeOptions);
export default ${mode}Theme;
`;
  },
});

async function build() {
  console.log('Building @runwell/brand-tokens...\\n');

  const brands = ['external', 'internal'] as const;
  const modes = ['light', 'dark'] as const;

  // Ensure output directories exist
  const dirs = ['css', 'tailwind', 'mui', 'json'].map(d => join(rootDir, 'dist', d));
  for (const dir of dirs) {
    await mkdir(dir, { recursive: true });
  }

  for (const brand of brands) {
    for (const mode of modes) {
      console.log(`Building ${brand} ${mode}...`);

      const sd = new StyleDictionary({
        source: [
          join(rootDir, 'src/tokens/core/**/*.json'),
          join(rootDir, `src/tokens/${brand}/colors.json`),
          join(rootDir, `src/tokens/${brand}/semantic.${mode}.json`),
        ],
        platforms: {
          css: {
            transformGroup: 'css',
            buildPath: join(rootDir, 'dist/css/'),
            files: [{
              destination: `${brand}.${mode}.css`,
              format: 'css/variables',
              options: {
                selector: mode === 'dark' ? '.dark, [data-theme="dark"]' : ':root',
                outputReferences: true,
              },
            }],
          },
          json: {
            transformGroup: 'js',
            buildPath: join(rootDir, 'dist/json/'),
            files: [{
              destination: `${brand}.${mode}.json`,
              format: 'json/nested',
            }],
          },
        },
      });

      await sd.buildAllPlatforms();
    }

    // Build Tailwind preset (light mode tokens + full palette)
    console.log(`Building ${brand} Tailwind preset...`);
    const sdTailwind = new StyleDictionary({
      source: [
        join(rootDir, 'src/tokens/core/**/*.json'),
        join(rootDir, `src/tokens/${brand}/colors.json`),
        join(rootDir, `src/tokens/${brand}/semantic.light.json`),
      ],
      platforms: {
        tailwind: {
          transformGroup: 'js',
          buildPath: join(rootDir, 'dist/tailwind/'),
          files: [{
            destination: `${brand}.preset.js`,
            format: 'tailwind/preset',
          }],
        },
      },
    });
    await sdTailwind.buildAllPlatforms();

    // Build MUI themes
    for (const mode of modes) {
      console.log(`Building ${brand} MUI ${mode} theme...`);
      const sdMui = new StyleDictionary({
        source: [
          join(rootDir, 'src/tokens/core/**/*.json'),
          join(rootDir, `src/tokens/${brand}/colors.json`),
          join(rootDir, `src/tokens/${brand}/semantic.${mode}.json`),
        ],
        platforms: {
          mui: {
            transformGroup: 'js',
            buildPath: join(rootDir, 'dist/mui/'),
            files: [{
              destination: `${brand}.${mode}.ts`,
              format: 'mui/theme',
              options: { mode, brand },
            }],
          },
        },
      });
      await sdMui.buildAllPlatforms();
    }
  }

  // Create combined MUI entry files
  for (const brand of brands) {
    const muiIndex = `export { lightTheme, lightThemeOptions } from './${brand}.light.js';
export { darkTheme, darkThemeOptions } from './${brand}.dark.js';
export { palettes } from './${brand}.light.js';
`;
    await writeFile(join(rootDir, `dist/mui/${brand}.ts`), muiIndex);
  }

  // Create core.json with just core tokens
  console.log('Building core tokens...');
  const sdCore = new StyleDictionary({
    source: [join(rootDir, 'src/tokens/core/**/*.json')],
    platforms: {
      json: {
        transformGroup: 'js',
        buildPath: join(rootDir, 'dist/json/'),
        files: [{
          destination: 'core.json',
          format: 'json/nested',
        }],
      },
    },
  });
  await sdCore.buildAllPlatforms();

  console.log('\\nBuild complete!');
}

build().catch(console.error);
