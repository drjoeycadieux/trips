# Deployment Instructions for Netlify

## Option 1: Using PostgreSQL (Recommended for Production)

1. **Set up a PostgreSQL database** (you can use services like):
   - [Supabase](https://supabase.com) (free tier available)
   - [Railway](https://railway.app) 
   - [Neon](https://neon.tech) (free tier available)
   - [Vercel Postgres](https://vercel.com/storage/postgres)

2. **Get your DATABASE_URL** from your chosen provider
   Format: `postgresql://username:password@host:port/database`

3. **Set Environment Variables in Netlify**:
   - Go to your Netlify site dashboard
   - Navigate to Site settings > Environment variables
   - Add these variables:
     ```
     DATABASE_URL=your_postgresql_connection_string
     NEXTAUTH_URL=https://your-site-name.netlify.app
     NEXTAUTH_SECRET=your_secret_key_here
     ```

4. **Deploy**:
   - Push your code to GitHub
   - Connect your GitHub repo to Netlify
   - Netlify will automatically deploy

## Option 2: Quick Deploy Without Database (Simplified)

If you want to deploy quickly without setting up a database, you can temporarily disable Prisma:

1. Update `package.json` build script to: `"build": "next build"`
2. Comment out database-related code in your API routes
3. Deploy to test the basic functionality

## Database Setup Commands (Run these after setting up PostgreSQL)

```bash
# Generate Prisma client
npx prisma generate

# Push database schema (creates tables)
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

## Environment Variables Needed

```env
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_URL="https://your-site-name.netlify.app"
NEXTAUTH_SECRET="your-secret-key-here"
```

The `NEXTAUTH_SECRET` can be generated using:
```bash
openssl rand -base64 32
```
