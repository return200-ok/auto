# Admin CMS - Auto Parts Catalog

Admin CMS web interface for managing the auto parts catalog database.

## Features

- **Vehicle Management**: CRUD operations for vehicles (Make, Model, Year, Trim, Engine)
- **Part Management**: CRUD operations for parts with OEM and aftermarket numbers
- **Category Management**: Manage part categories with hierarchical structure
- **Mapping Management**: Core functionality - Map vehicles to compatible parts
- **Verification System**: Review and verify user-generated content

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- React Query for data fetching

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3001
```

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utilities and API client
└── types/           # TypeScript types
```

