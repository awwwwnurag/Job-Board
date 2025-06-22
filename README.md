# Job Board App

A modern, professional job board web application built with **React**, **TypeScript**, and **Tailwind CSS**. The UI is themed with Starbucks green for a clean, distinctive look.

## Features

- 🏢 **Browse Jobs:** View a curated list of top jobs with company logos, job type tags, and location pills.
- 🔍 **Advanced Filters:** Filter jobs by type, location, and more.
- 📝 **Post a Job:** Employers can post new job listings easily.
- 👤 **Authentication:** Login and Sign Up pages with secure, user-friendly forms.
- 📄 **Job Details:** View detailed job descriptions and apply directly.
- 📱 **Responsive Design:** Looks great on desktop and mobile.

## UI Highlights

- Starbucks green as the primary color, with a green gradient header.
- High-contrast, accessible buttons and tags.
- Professional, clean layout with modern rounded corners.
- Distinctive job type tags (Remote, Part-time, Contract, Full-time).

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:awwwwnurag/Job-Board.git
cd Job-Board

# Install dependencies
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

## Customization

- **Colors:** Edit `tailwind.config.js` to adjust the Starbucks green palette or gradients.
- **Job Data:** Modify `src/data/mockJobs.ts` to change the job listings.
- **Logos:** Add or update company logos in `public/logos/` or `src/assets/logos/`.

## Project Structure

```
AJ/
  src/
    components/    # React components
    data/          # Mock job data and logos
    types/         # TypeScript types
    utils/         # Utility functions
    index.css      # Global styles
    main.tsx       # App entry point
  public/          # Static assets
  tailwind.config.js
  vite.config.ts
```

## License

MIT 