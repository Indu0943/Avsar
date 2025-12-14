# AVSAR - Animal welfare organisation

A comprehensive web application for animal rescue organizations to manage adoptions, donations, memberships, and helpline services.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- MongoDB (local or cloud instance)
- Redis (optional, for caching in production)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/avsar

# Redis Connection (optional for development)
# REDIS_URL=redis://localhost:6379
```

For production deployment, you should set these environment variables in your hosting platform.

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Adoption Management**: Online application forms for pet adoption
- **Donation System**: Both monetary and food donations
- **Membership Portal**: Volunteer and member registration
- **Helpline Services**: Complaint reporting and camera analysis
- **Admin Dashboard**: Comprehensive management interface
- **Gallery**: Photo and video showcase
- **Contact System**: Inquiry and communication management

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Caching**: Redis (optional)
- **UI Components**: Radix UI, Shadcn UI
- **Authentication**: JWT-based authentication

## Project Structure

```
app/              # Next.js 14 app directory
components/       # Reusable UI components
lib/              # Utility functions and configurations
models/           # Mongoose data models
public/           # Static assets
styles/           # Global styles
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Deployment

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.