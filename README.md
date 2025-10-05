# Turborepo Template

This is a monorepo template built with **Turborepo** that includes:

- 🚀 **Turborepo** - Fast, incremental builds for JavaScript and TypeScript codebases
- 🎨 **shadcn/ui** - Beautiful and accessible UI components built with Radix UI and Tailwind CSS
- 📱 **Next.js** - React framework for production
- 🎯 **TypeScript** - Type-safe JavaScript
- 📦 **pnpm** - Fast, disk space efficient package manager

## Project Structure

```
launch/
├── apps/
│   ├── webapp/          # Main web application with Supabase auth
│   └── website/         # Marketing website
├── packages/
│   ├── ui/              # Shared shadcn/ui components
│   ├── eslint-config/   # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
```

## Features

- **Monorepo Architecture**: Efficiently manage multiple apps and packages
- **Modern UI**: Beautiful components with shadcn/ui and Tailwind CSS
- **Type Safety**: Full TypeScript support across the monorepo
- **Fast Development**: Turborepo caching for quick builds and development

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Supabase account and project

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd launch
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your Supabase project and copy environment variables:

   ```bash
   # Copy webapp environment variables
   cp apps/webapp/.env.example apps/webapp/.env
   ```

   Then edit the `.env` file with your actual Supabase credentials.

4. Start the development server:

```bash
pnpm dev
```

## Usage

### Adding shadcn/ui Components

To add components to your app, run the following command:

```bash
cd packages/ui
pnpm dlx shadcn@latest add button
```

This will place the UI components in the `packages/ui/src/components` directory.

### Using Components

Import components from the `ui` package in your apps:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Development

- **`pnpm dev`** - Start all apps in development mode
- **`pnpm build`** - Build all apps and packages
- **`pnpm lint`** - Lint all code
- **`pnpm type-check`** - Type check all TypeScript code

## Contributing

This template is designed to be easily customizable for your specific needs. Feel free to modify the structure, add new packages, or customize the existing setup.

## License

MIT
