# Ongaku Music

A modern desktop music player application built with Electron, React, and TypeScript.

## Features

- **Local Music Playback** - Play your local music files with a beautiful interface
- **Playlist Management** - Create, rename, and organize your playlists
- **Music Downloads** - Download music from YouTube using yt-dlp
- **Modern UI** - Sleek, responsive design with animations
- **Theme Support** - Light and dark mode
- **Keyboard Shortcuts** - Control playback with keyboard shortcuts

## Tech Stack

- **Electron** - Desktop application framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **TanStack Query** - Server state management
- **TanStack Router** - Type-safe routing
- **Zustand** - Client state management
- **Radix UI + Base UI** - Accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Elysia** - Lightweight type safe web server
- **Zod** - Schema validation

## Project Structure

```
src/
├── main/           # Electron main process
├── renderer/       # React application (frontend)
├── preload/        # Preload scripts
├── server/         # Elysia local server
└── shared/         # Shared types, models, and schemas
```

## Getting Started

### Prerequisites

- Node.js 18+
- Bun or npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Type Checking

```bash
npm run typecheck
```

### Building

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## License

MIT
