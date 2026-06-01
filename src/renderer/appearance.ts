import type { ITheme } from "@xterm/xterm";

const SETTINGS_KEY = "myanso:appearance";

const FALLBACK_MONO_FONTS = [
  "Menlo",
  "SF Mono",
  "Monaco",
  "Consolas",
  "Cascadia Mono",
  "DejaVu Sans Mono",
  "Liberation Mono",
  "Ubuntu Mono",
  "Noto Sans Mono",
];

const MYANMAR_FALLBACK_FONTS = [
  "Noto Sans Myanmar",
  "Myanmar Sangam MN",
  "Myanmar MN",
];

export const VIEW_MODE_LINE_HEIGHT = {
  compact: 1.15,
  default: 1.25,
  presentation: 1.4,
} as const;

export type ViewMode = keyof typeof VIEW_MODE_LINE_HEIGHT;

export type AnsiPalette = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type ThemeId =
  | "myanso-dark"
  | "myanso-light"
  | "solarized-dark"
  | "solarized-light"
  | "dracula"
  | "nord"
  | "gruvbox-dark"
  | "tokyo-night"
  | "catppuccin-mocha"
  | "one-dark"
  | "monokai"
  | "github-dark"
  | "github-light"
  | "rose-pine"
  | "ayu-dark"
  | "everforest-dark"
  | "catppuccin-latte";

export interface TerminalTheme {
  id: ThemeId;
  label: string;
  colorScheme: "dark" | "light";
  foreground: string;
  background: string;
  cursor: string;
  cursorAccent: string;
  selectionBackground: string;
  selectionForeground?: string;
  selectionInactiveBackground: string;
  ansi: AnsiPalette;
  ui: {
    muted: string;
    accent: string;
    border: string;
    tabBg: string;
    tabBgActive: string;
    chromeTop: string;
    chromeBottom: string;
    panelTop: string;
    panelBottom: string;
    modalOverlay: string;
    paneDim: string;
    controlBg: string;
    controlHover: string;
    previewBg: string;
    applyBorder: string;
    applyBg: string;
    applyBgHover: string;
    applyFg: string;
  };
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const expanded =
    clean.length === 3
      ? clean
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : clean;
  return [
    parseInt(expanded.slice(0, 2), 16),
    parseInt(expanded.slice(2, 4), 16),
    parseInt(expanded.slice(4, 6), 16),
  ];
}

function toHex(n: number): string {
  return Math.max(0, Math.min(255, Math.round(n)))
    .toString(16)
    .padStart(2, "0");
}

function mixHex(from: string, to: string, amount: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return `#${toHex(a[0] + (b[0] - a[0]) * amount)}${toHex(
    a[1] + (b[1] - a[1]) * amount,
  )}${toHex(a[2] + (b[2] - a[2]) * amount)}`;
}

function rgbaHex(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function generatedUi(opts: {
  colorScheme: "dark" | "light";
  foreground: string;
  background: string;
  muted: string;
  accent: string;
  border?: string;
}): TerminalTheme["ui"] {
  const dark = opts.colorScheme === "dark";
  const fg = opts.foreground;
  const bg = opts.background;
  const panelBg = mixHex(bg, fg, dark ? 0.05 : 0.035);
  return {
    muted: opts.muted,
    accent: opts.accent,
    border: opts.border ?? mixHex(bg, fg, dark ? 0.16 : 0.2),
    tabBg: mixHex(bg, fg, dark ? 0.035 : 0.075),
    tabBgActive: bg,
    chromeTop: mixHex(bg, fg, dark ? 0.07 : 0.055),
    chromeBottom: mixHex(bg, fg, dark ? 0.035 : 0.09),
    panelTop: panelBg,
    panelBottom: bg,
    modalOverlay: dark ? rgbaHex("#000000", 0.68) : rgbaHex(fg, 0.25),
    paneDim: rgbaHex(bg, dark ? 0.58 : 0.5),
    controlBg: rgbaHex(fg, dark ? 0.055 : 0.04),
    controlHover: rgbaHex(fg, dark ? 0.1 : 0.08),
    previewBg: dark ? rgbaHex("#000000", 0.2) : rgbaHex(fg, 0.045),
    applyBorder: opts.accent,
    applyBg: rgbaHex(opts.accent, dark ? 0.16 : 0.12),
    applyBgHover: rgbaHex(opts.accent, dark ? 0.28 : 0.2),
    applyFg: dark
      ? mixHex(opts.accent, "#ffffff", 0.32)
      : mixHex(opts.accent, "#000000", 0.15),
  };
}

export const TERMINAL_THEMES: readonly TerminalTheme[] = [
  {
    id: "myanso-dark",
    label: "Myanso Dark",
    colorScheme: "dark",
    foreground: "#e4e4e4",
    background: "#15171e",
    cursor: "#e4e4e4",
    cursorAccent: "#15171e",
    selectionBackground: "rgba(124, 156, 250, 0.45)",
    selectionInactiveBackground: "rgba(124, 156, 250, 0.28)",
    ansi: [
      "#000000",
      "#ff6e6e",
      "#6eff6e",
      "#ffff6e",
      "#7c9cfa",
      "#ff6eff",
      "#6effff",
      "#e4e4e4",
      "#686868",
      "#ff8b8b",
      "#8bff8b",
      "#ffff8b",
      "#9cb0fa",
      "#ff8bff",
      "#8bffff",
      "#ffffff",
    ],
    ui: {
      muted: "#8b8f99",
      accent: "#69b4ff",
      border: "#2a2d38",
      tabBg: "#1a1c24",
      tabBgActive: "#15171e",
      chromeTop: "#1e2029",
      chromeBottom: "#191b23",
      panelTop: "#1d2029",
      panelBottom: "#15171e",
      modalOverlay: "rgba(8, 10, 14, 0.66)",
      paneDim: "rgba(21, 23, 30, 0.55)",
      controlBg: "rgba(255, 255, 255, 0.04)",
      controlHover: "rgba(255, 255, 255, 0.08)",
      previewBg: "rgba(0, 0, 0, 0.35)",
      applyBorder: "#5b9bd5",
      applyBg: "rgba(91, 155, 213, 0.15)",
      applyBgHover: "rgba(91, 155, 213, 0.28)",
      applyFg: "#8bbce6",
    },
  },
  {
    id: "myanso-light",
    label: "Myanso Light",
    colorScheme: "light",
    foreground: "#1f2430",
    background: "#f7f7f2",
    cursor: "#1f2430",
    cursorAccent: "#f7f7f2",
    selectionBackground: "rgba(45, 112, 179, 0.28)",
    selectionInactiveBackground: "rgba(45, 112, 179, 0.18)",
    ansi: [
      "#1f2430",
      "#b42335",
      "#217245",
      "#8a6515",
      "#2457a6",
      "#8b3d8f",
      "#0d7280",
      "#e8e2d0",
      "#6f7480",
      "#d12f43",
      "#2f8f57",
      "#a77b1f",
      "#356ec5",
      "#a04ca5",
      "#138999",
      "#ffffff",
    ],
    ui: {
      muted: "#6f7480",
      accent: "#2d70b3",
      border: "#d4d0c5",
      tabBg: "#e9e5d9",
      tabBgActive: "#f7f7f2",
      chromeTop: "#efebdf",
      chromeBottom: "#e5e1d4",
      panelTop: "#fbfaf5",
      panelBottom: "#eeeade",
      modalOverlay: "rgba(31, 36, 48, 0.28)",
      paneDim: "rgba(247, 247, 242, 0.58)",
      controlBg: "rgba(31, 36, 48, 0.04)",
      controlHover: "rgba(31, 36, 48, 0.08)",
      previewBg: "rgba(31, 36, 48, 0.05)",
      applyBorder: "#2d70b3",
      applyBg: "rgba(45, 112, 179, 0.12)",
      applyBgHover: "rgba(45, 112, 179, 0.2)",
      applyFg: "#245f9b",
    },
  },
  {
    id: "solarized-dark",
    label: "Solarized Dark",
    colorScheme: "dark",
    foreground: "#839496",
    background: "#002b36",
    cursor: "#93a1a1",
    cursorAccent: "#002b36",
    selectionBackground: "rgba(38, 139, 210, 0.35)",
    selectionInactiveBackground: "rgba(38, 139, 210, 0.22)",
    ansi: [
      "#073642",
      "#dc322f",
      "#859900",
      "#b58900",
      "#268bd2",
      "#d33682",
      "#2aa198",
      "#eee8d5",
      "#002b36",
      "#cb4b16",
      "#586e75",
      "#657b83",
      "#839496",
      "#6c71c4",
      "#93a1a1",
      "#fdf6e3",
    ],
    ui: {
      muted: "#657b83",
      accent: "#268bd2",
      border: "#0d3f4c",
      tabBg: "#073642",
      tabBgActive: "#002b36",
      chromeTop: "#073642",
      chromeBottom: "#05313d",
      panelTop: "#073642",
      panelBottom: "#002b36",
      modalOverlay: "rgba(0, 18, 22, 0.72)",
      paneDim: "rgba(0, 43, 54, 0.58)",
      controlBg: "rgba(238, 232, 213, 0.05)",
      controlHover: "rgba(238, 232, 213, 0.1)",
      previewBg: "rgba(0, 0, 0, 0.22)",
      applyBorder: "#268bd2",
      applyBg: "rgba(38, 139, 210, 0.16)",
      applyBgHover: "rgba(38, 139, 210, 0.28)",
      applyFg: "#6cbee8",
    },
  },
  {
    id: "solarized-light",
    label: "Solarized Light",
    colorScheme: "light",
    foreground: "#657b83",
    background: "#fdf6e3",
    cursor: "#586e75",
    cursorAccent: "#fdf6e3",
    selectionBackground: "rgba(38, 139, 210, 0.24)",
    selectionInactiveBackground: "rgba(38, 139, 210, 0.14)",
    ansi: [
      "#073642",
      "#dc322f",
      "#859900",
      "#b58900",
      "#268bd2",
      "#d33682",
      "#2aa198",
      "#eee8d5",
      "#002b36",
      "#cb4b16",
      "#586e75",
      "#657b83",
      "#839496",
      "#6c71c4",
      "#93a1a1",
      "#fdf6e3",
    ],
    ui: generatedUi({
      colorScheme: "light",
      foreground: "#657b83",
      background: "#fdf6e3",
      muted: "#839496",
      accent: "#268bd2",
      border: "#d8d0b9",
    }),
  },
  {
    id: "dracula",
    label: "Dracula",
    colorScheme: "dark",
    foreground: "#f8f8f2",
    background: "#282a36",
    cursor: "#f8f8f2",
    cursorAccent: "#282a36",
    selectionBackground: "rgba(189, 147, 249, 0.35)",
    selectionInactiveBackground: "rgba(189, 147, 249, 0.22)",
    ansi: [
      "#21222c",
      "#ff5555",
      "#50fa7b",
      "#f1fa8c",
      "#bd93f9",
      "#ff79c6",
      "#8be9fd",
      "#f8f8f2",
      "#6272a4",
      "#ff6e6e",
      "#69ff94",
      "#ffffa5",
      "#d6acff",
      "#ff92df",
      "#a4ffff",
      "#ffffff",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#f8f8f2",
      background: "#282a36",
      muted: "#6272a4",
      accent: "#bd93f9",
      border: "#44475a",
    }),
  },
  {
    id: "nord",
    label: "Nord",
    colorScheme: "dark",
    foreground: "#d8dee9",
    background: "#2e3440",
    cursor: "#d8dee9",
    cursorAccent: "#2e3440",
    selectionBackground: "rgba(136, 192, 208, 0.32)",
    selectionInactiveBackground: "rgba(136, 192, 208, 0.2)",
    ansi: [
      "#3b4252",
      "#bf616a",
      "#a3be8c",
      "#ebcb8b",
      "#81a1c1",
      "#b48ead",
      "#88c0d0",
      "#e5e9f0",
      "#4c566a",
      "#bf616a",
      "#a3be8c",
      "#ebcb8b",
      "#81a1c1",
      "#b48ead",
      "#8fbcbb",
      "#eceff4",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#d8dee9",
      background: "#2e3440",
      muted: "#7d8799",
      accent: "#88c0d0",
      border: "#434c5e",
    }),
  },
  {
    id: "gruvbox-dark",
    label: "Gruvbox Dark",
    colorScheme: "dark",
    foreground: "#ebdbb2",
    background: "#282828",
    cursor: "#ebdbb2",
    cursorAccent: "#282828",
    selectionBackground: "rgba(214, 153, 33, 0.32)",
    selectionInactiveBackground: "rgba(214, 153, 33, 0.2)",
    ansi: [
      "#282828",
      "#cc241d",
      "#98971a",
      "#d79921",
      "#458588",
      "#b16286",
      "#689d6a",
      "#a89984",
      "#928374",
      "#fb4934",
      "#b8bb26",
      "#fabd2f",
      "#83a598",
      "#d3869b",
      "#8ec07c",
      "#ebdbb2",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#ebdbb2",
      background: "#282828",
      muted: "#928374",
      accent: "#fabd2f",
      border: "#504945",
    }),
  },
  {
    id: "tokyo-night",
    label: "Tokyo Night",
    colorScheme: "dark",
    foreground: "#c0caf5",
    background: "#1a1b26",
    cursor: "#c0caf5",
    cursorAccent: "#1a1b26",
    selectionBackground: "rgba(122, 162, 247, 0.33)",
    selectionInactiveBackground: "rgba(122, 162, 247, 0.2)",
    ansi: [
      "#15161e",
      "#f7768e",
      "#9ece6a",
      "#e0af68",
      "#7aa2f7",
      "#bb9af7",
      "#7dcfff",
      "#a9b1d6",
      "#414868",
      "#f7768e",
      "#9ece6a",
      "#e0af68",
      "#7aa2f7",
      "#bb9af7",
      "#7dcfff",
      "#c0caf5",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#c0caf5",
      background: "#1a1b26",
      muted: "#565f89",
      accent: "#7aa2f7",
      border: "#2f3549",
    }),
  },
  {
    id: "catppuccin-mocha",
    label: "Catppuccin Mocha",
    colorScheme: "dark",
    foreground: "#cdd6f4",
    background: "#1e1e2e",
    cursor: "#f5e0dc",
    cursorAccent: "#1e1e2e",
    selectionBackground: "rgba(137, 180, 250, 0.32)",
    selectionInactiveBackground: "rgba(137, 180, 250, 0.2)",
    ansi: [
      "#45475a",
      "#f38ba8",
      "#a6e3a1",
      "#f9e2af",
      "#89b4fa",
      "#f5c2e7",
      "#94e2d5",
      "#bac2de",
      "#585b70",
      "#f38ba8",
      "#a6e3a1",
      "#f9e2af",
      "#89b4fa",
      "#f5c2e7",
      "#94e2d5",
      "#a6adc8",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#cdd6f4",
      background: "#1e1e2e",
      muted: "#7f849c",
      accent: "#89b4fa",
      border: "#313244",
    }),
  },
  {
    id: "one-dark",
    label: "One Dark",
    colorScheme: "dark",
    foreground: "#abb2bf",
    background: "#282c34",
    cursor: "#528bff",
    cursorAccent: "#282c34",
    selectionBackground: "rgba(82, 139, 255, 0.3)",
    selectionInactiveBackground: "rgba(82, 139, 255, 0.18)",
    ansi: [
      "#282c34",
      "#e06c75",
      "#98c379",
      "#e5c07b",
      "#61afef",
      "#c678dd",
      "#56b6c2",
      "#abb2bf",
      "#5c6370",
      "#e06c75",
      "#98c379",
      "#e5c07b",
      "#61afef",
      "#c678dd",
      "#56b6c2",
      "#ffffff",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#abb2bf",
      background: "#282c34",
      muted: "#7f848e",
      accent: "#61afef",
      border: "#3e4451",
    }),
  },
  {
    id: "monokai",
    label: "Monokai",
    colorScheme: "dark",
    foreground: "#f8f8f2",
    background: "#272822",
    cursor: "#f8f8f0",
    cursorAccent: "#272822",
    selectionBackground: "rgba(166, 226, 46, 0.28)",
    selectionInactiveBackground: "rgba(166, 226, 46, 0.16)",
    ansi: [
      "#272822",
      "#f92672",
      "#a6e22e",
      "#e6db74",
      "#66d9ef",
      "#ae81ff",
      "#a1efe4",
      "#f8f8f2",
      "#75715e",
      "#ff669d",
      "#beed5f",
      "#fff085",
      "#8be9fd",
      "#c29aff",
      "#a1efe4",
      "#ffffff",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#f8f8f2",
      background: "#272822",
      muted: "#75715e",
      accent: "#a6e22e",
      border: "#49483e",
    }),
  },
  {
    id: "github-dark",
    label: "GitHub Dark",
    colorScheme: "dark",
    foreground: "#c9d1d9",
    background: "#0d1117",
    cursor: "#58a6ff",
    cursorAccent: "#0d1117",
    selectionBackground: "rgba(56, 139, 253, 0.35)",
    selectionInactiveBackground: "rgba(56, 139, 253, 0.2)",
    ansi: [
      "#484f58",
      "#ff7b72",
      "#3fb950",
      "#d29922",
      "#58a6ff",
      "#bc8cff",
      "#39c5cf",
      "#b1bac4",
      "#6e7681",
      "#ffa198",
      "#56d364",
      "#e3b341",
      "#79c0ff",
      "#d2a8ff",
      "#56d4dd",
      "#f0f6fc",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#c9d1d9",
      background: "#0d1117",
      muted: "#8b949e",
      accent: "#58a6ff",
      border: "#30363d",
    }),
  },
  {
    id: "github-light",
    label: "GitHub Light",
    colorScheme: "light",
    foreground: "#24292f",
    background: "#ffffff",
    cursor: "#0969da",
    cursorAccent: "#ffffff",
    selectionBackground: "rgba(9, 105, 218, 0.24)",
    selectionInactiveBackground: "rgba(9, 105, 218, 0.14)",
    ansi: [
      "#24292f",
      "#cf222e",
      "#116329",
      "#4d2d00",
      "#0969da",
      "#8250df",
      "#1b7c83",
      "#6e7781",
      "#57606a",
      "#a40e26",
      "#1a7f37",
      "#633c01",
      "#218bff",
      "#a475f9",
      "#3192aa",
      "#8c959f",
    ],
    ui: generatedUi({
      colorScheme: "light",
      foreground: "#24292f",
      background: "#ffffff",
      muted: "#6e7781",
      accent: "#0969da",
      border: "#d0d7de",
    }),
  },
  {
    id: "rose-pine",
    label: "Rosé Pine",
    colorScheme: "dark",
    foreground: "#e0def4",
    background: "#191724",
    cursor: "#e0def4",
    cursorAccent: "#191724",
    selectionBackground: "rgba(156, 207, 216, 0.28)",
    selectionInactiveBackground: "rgba(156, 207, 216, 0.18)",
    ansi: [
      "#26233a",
      "#eb6f92",
      "#31748f",
      "#f6c177",
      "#9ccfd8",
      "#c4a7e7",
      "#ebbcba",
      "#e0def4",
      "#6e6a86",
      "#eb6f92",
      "#31748f",
      "#f6c177",
      "#9ccfd8",
      "#c4a7e7",
      "#ebbcba",
      "#e0def4",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#e0def4",
      background: "#191724",
      muted: "#6e6a86",
      accent: "#c4a7e7",
      border: "#403d52",
    }),
  },
  {
    id: "ayu-dark",
    label: "Ayu Dark",
    colorScheme: "dark",
    foreground: "#bfbdb6",
    background: "#0d1017",
    cursor: "#e6b450",
    cursorAccent: "#0d1017",
    selectionBackground: "rgba(230, 180, 80, 0.26)",
    selectionInactiveBackground: "rgba(230, 180, 80, 0.16)",
    ansi: [
      "#11151c",
      "#ea6c73",
      "#7fd962",
      "#f9af4f",
      "#53bdfa",
      "#cda1fa",
      "#90e1c6",
      "#c7c7c7",
      "#686868",
      "#f07178",
      "#aad94c",
      "#ffb454",
      "#59c2ff",
      "#d2a6ff",
      "#95e6cb",
      "#ffffff",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#bfbdb6",
      background: "#0d1017",
      muted: "#565b66",
      accent: "#e6b450",
      border: "#1d2433",
    }),
  },
  {
    id: "everforest-dark",
    label: "Everforest Dark",
    colorScheme: "dark",
    foreground: "#d3c6aa",
    background: "#2d353b",
    cursor: "#d3c6aa",
    cursorAccent: "#2d353b",
    selectionBackground: "rgba(167, 192, 128, 0.28)",
    selectionInactiveBackground: "rgba(167, 192, 128, 0.18)",
    ansi: [
      "#475258",
      "#e67e80",
      "#a7c080",
      "#dbbc7f",
      "#7fbbb3",
      "#d699b6",
      "#83c092",
      "#d3c6aa",
      "#5d6b66",
      "#e67e80",
      "#a7c080",
      "#dbbc7f",
      "#7fbbb3",
      "#d699b6",
      "#83c092",
      "#d3c6aa",
    ],
    ui: generatedUi({
      colorScheme: "dark",
      foreground: "#d3c6aa",
      background: "#2d353b",
      muted: "#859289",
      accent: "#a7c080",
      border: "#4f585e",
    }),
  },
  {
    id: "catppuccin-latte",
    label: "Catppuccin Latte",
    colorScheme: "light",
    foreground: "#4c4f69",
    background: "#eff1f5",
    cursor: "#dc8a78",
    cursorAccent: "#eff1f5",
    selectionBackground: "rgba(30, 102, 245, 0.2)",
    selectionInactiveBackground: "rgba(30, 102, 245, 0.12)",
    ansi: [
      "#5c5f77",
      "#d20f39",
      "#40a02b",
      "#df8e1d",
      "#1e66f5",
      "#ea76cb",
      "#179299",
      "#acb0be",
      "#6c6f85",
      "#d20f39",
      "#40a02b",
      "#df8e1d",
      "#1e66f5",
      "#ea76cb",
      "#179299",
      "#bcc0cc",
    ],
    ui: generatedUi({
      colorScheme: "light",
      foreground: "#4c4f69",
      background: "#eff1f5",
      muted: "#8c8fa1",
      accent: "#1e66f5",
      border: "#bcc0cc",
    }),
  },
] as const;

export const DEFAULT_THEME_ID = TERMINAL_THEMES[0].id;

interface LocalFontData {
  family: string;
  fullName: string;
  postscriptName: string;
  style: string;
}

declare global {
  interface Window {
    queryLocalFonts?: () => Promise<LocalFontData[]>;
  }
}

export interface AppearancePrefs {
  viewMode: ViewMode;
  fontSize: number;
  fontFamily: string;
  theme: ThemeId;
}

export const DEFAULT_APPEARANCE: AppearancePrefs = {
  viewMode: "default",
  fontSize: 14,
  fontFamily: "system",
  theme: DEFAULT_THEME_ID,
};

export function clampFontSize(n: number): number {
  return Math.max(
    11,
    Math.min(24, Math.round(n || DEFAULT_APPEARANCE.fontSize)),
  );
}

function isViewMode(v: unknown): v is ViewMode {
  return v === "compact" || v === "default" || v === "presentation";
}

function normalizeFontChoice(v: unknown): string {
  if (typeof v !== "string") return DEFAULT_APPEARANCE.fontFamily;
  const trimmed = v.trim();
  return trimmed || DEFAULT_APPEARANCE.fontFamily;
}

export function themeById(id: unknown): TerminalTheme {
  const key = typeof id === "string" ? id : "";
  return TERMINAL_THEMES.find((theme) => theme.id === key) ?? TERMINAL_THEMES[0];
}

export function normalizeAppearance(raw: unknown): AppearancePrefs {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_APPEARANCE };
  const obj = raw as Partial<AppearancePrefs>;
  return {
    viewMode: isViewMode(obj.viewMode)
      ? obj.viewMode
      : DEFAULT_APPEARANCE.viewMode,
    fontSize: clampFontSize(Number(obj.fontSize)),
    fontFamily: normalizeFontChoice(obj.fontFamily),
    theme: themeById(obj.theme).id,
  };
}

export function loadAppearance(): AppearancePrefs {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    return raw
      ? normalizeAppearance(JSON.parse(raw))
      : { ...DEFAULT_APPEARANCE };
  } catch {
    return { ...DEFAULT_APPEARANCE };
  }
}

export function saveAppearance(prefs: AppearancePrefs): void {
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn("myanso: failed to save appearance to localStorage", e);
  }
}

function quoteFontFamily(name: string): string {
  return /[",]/.test(name) || /\s/.test(name)
    ? `"${name.replace(/"/g, '\\"')}"`
    : name;
}

export function buildTerminalFontFamily(selected: string): string {
  const families: string[] = [];
  const seen = new Set<string>();
  const push = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    families.push(trimmed);
  };

  if (selected !== "system") push(selected);
  for (const name of FALLBACK_MONO_FONTS) push(name);
  for (const name of MYANMAR_FALLBACK_FONTS) push(name);
  push("monospace");

  return families
    .map((name) => (name === "monospace" ? name : quoteFontFamily(name)))
    .join(", ");
}

export function xtermTheme(theme: TerminalTheme): ITheme {
  const ansiNames = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "brightBlack",
    "brightRed",
    "brightGreen",
    "brightYellow",
    "brightBlue",
    "brightMagenta",
    "brightCyan",
    "brightWhite",
  ] as const;
  const out: ITheme = {
    foreground: theme.foreground,
    background: theme.background,
    cursor: theme.cursor,
    cursorAccent: theme.cursorAccent,
    selectionBackground: theme.selectionBackground,
    selectionInactiveBackground: theme.selectionInactiveBackground,
  };
  if (theme.selectionForeground) {
    out.selectionForeground = theme.selectionForeground;
  }
  for (let i = 0; i < ansiNames.length; i++) {
    out[ansiNames[i]] = theme.ansi[i];
  }
  return out;
}

export function ansi256Palette(theme: TerminalTheme): string[] {
  const colors = [...theme.ansi];
  for (let code = 16; code < 256; code++) {
    if (code >= 232) {
      const v = (code - 232) * 10 + 8;
      colors.push(`rgb(${v},${v},${v})`);
      continue;
    }
    const c = code - 16;
    const r = Math.floor(c / 36);
    const g = Math.floor((c % 36) / 6);
    const b = c % 6;
    const m = (x: number) => (x === 0 ? 0 : x * 40 + 55);
    colors.push(`rgb(${m(r)},${m(g)},${m(b)})`);
  }
  return colors;
}

export function applyThemeVariables(theme: TerminalTheme): void {
  const root = document.documentElement;
  root.style.colorScheme = theme.colorScheme;
  root.style.setProperty("--bg", theme.background);
  root.style.setProperty("--fg", theme.foreground);
  root.style.setProperty("--muted", theme.ui.muted);
  root.style.setProperty("--accent", theme.ui.accent);
  root.style.setProperty("--border", theme.ui.border);
  root.style.setProperty("--tab-bg", theme.ui.tabBg);
  root.style.setProperty("--tab-bg-active", theme.ui.tabBgActive);
  root.style.setProperty("--chrome-top", theme.ui.chromeTop);
  root.style.setProperty("--chrome-bottom", theme.ui.chromeBottom);
  root.style.setProperty("--panel-top", theme.ui.panelTop);
  root.style.setProperty("--panel-bottom", theme.ui.panelBottom);
  root.style.setProperty("--modal-overlay", theme.ui.modalOverlay);
  root.style.setProperty("--pane-dim", theme.ui.paneDim);
  root.style.setProperty("--control-bg", theme.ui.controlBg);
  root.style.setProperty("--control-hover", theme.ui.controlHover);
  root.style.setProperty("--preview-bg", theme.ui.previewBg);
  root.style.setProperty("--apply-border", theme.ui.applyBorder);
  root.style.setProperty("--apply-bg", theme.ui.applyBg);
  root.style.setProperty("--apply-bg-hover", theme.ui.applyBgHover);
  root.style.setProperty("--apply-fg", theme.ui.applyFg);
  root.style.setProperty("--selection-bg", theme.selectionBackground);
}

async function waitForFontsReady(): Promise<void> {
  try {
    await document.fonts.ready;
  } catch {
    // Ignore readiness failures and fall back to best-effort checks below.
  }
}

let monoProbeContext: CanvasRenderingContext2D | null = null;

function getMonoProbeContext(): CanvasRenderingContext2D | null {
  if (monoProbeContext) return monoProbeContext;
  const canvas = document.createElement("canvas");
  monoProbeContext = canvas.getContext("2d");
  return monoProbeContext;
}

function isMonospaceFamily(name: string): boolean {
  const ctx = getMonoProbeContext();
  if (!ctx) return false;
  try {
    const family = quoteFontFamily(name);
    const probes = ["i", "W", "0", "m"];
    ctx.font = `16px ${family}, monospace`;
    const monoFallbackWidths = probes.map((ch) => ctx.measureText(ch).width);
    ctx.font = `16px ${family}, sans-serif`;
    const sansFallbackWidths = probes.map((ch) => ctx.measureText(ch).width);

    // If the family does not contain the probe glyphs, Chromium falls through
    // to the generic fallback. Compare two different fallbacks so script-
    // specific fonts like Noto Sans Myanmar do not masquerade as monospace.
    const hasProbeGlyphs = monoFallbackWidths.every(
      (width, i) => Math.abs(width - sansFallbackWidths[i]) < 0.01,
    );
    if (!hasProbeGlyphs) return false;

    return (
      Math.max(...monoFallbackWidths) - Math.min(...monoFallbackWidths) < 0.01
    );
  } catch {
    return false;
  }
}

async function localFontFamilies(): Promise<string[]> {
  if (typeof window.queryLocalFonts !== "function") return [];
  try {
    const fonts = await window.queryLocalFonts();
    const families = new Set<string>();
    for (const font of fonts) {
      const family = font.family.trim();
      if (family) families.add(family);
    }
    return [...families].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
  } catch (e) {
    console.warn("myanso: failed to enumerate local fonts", e);
    return [];
  }
}

let availableFontChoicesCache: Array<{ value: string; label: string }> | null =
  null;

export async function availableFontChoices(): Promise<
  Array<{ value: string; label: string }>
> {
  if (availableFontChoicesCache) return availableFontChoicesCache;
  await waitForFontsReady();
  const fonts = await localFontFamilies();
  const choices = [
    { value: "system", label: "System Mono" },
    ...fonts
      .filter((family) => isMonospaceFamily(family))
      .map((family) => ({ value: family, label: family })),
  ];
  if (choices.length > 1) availableFontChoicesCache = choices;
  return choices;
}
