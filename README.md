# TripPlanner - Your Personal Travel Companion

TripPlanner is a modern web application built with Next.js, TypeScript, and Prisma that helps you organize and manage your trips effectively.

![TripPlanner Logo](public/globe.svg)

## Features

- 🔐 **User Authentication**: Secure registration and login system
- ✈️ **Trip Management**: Create, view, edit, and delete your trips
- 📅 **Date Planning**: Organize trips with start and end dates
- 📍 **Location Tracking**: Keep track of your travel destinations
- 🎨 **Modern UI**: Clean and responsive design with Tailwind CSS

## Screenshots

### Home Page
![Home Page](public/window.svg)
A welcoming landing page that introduces users to TripPlanner.

### Trip Dashboard
![Trip Dashboard](public/file.svg)
View all your planned trips in an organized grid layout.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: SQLite with Prisma ORM
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

## Features in Detail

### Authentication
- Secure user registration with email and password
- Protected routes for authenticated users
- Session management with NextAuth.js

### Trip Management
- Create new trips with title, description, location, and dates
- View all your planned trips in a grid layout
- Edit trip details
- Delete unwanted trips

### User Interface
- Responsive design that works on desktop and mobile
- Clean and modern UI with Tailwind CSS
- Intuitive navigation
- Loading states and error handling

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
