# Task Master - Step-by-Step Setup Guide

Follow these steps to get the fully animated Task Master app running on your machine.

## Step 1: Download and Extract

1. Download the ZIP file containing the project
2. Extract it to your desired location
3. Open terminal/command prompt in the project folder

## Step 2: Verify Node.js Installation

Make sure you have Node.js 18 or higher installed:

```bash
node --version
# Should output v18.0.0 or higher

npm --version
# Should output 9.0.0 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org)

## Step 3: Install pnpm (Recommended)

This project uses pnpm for better dependency management:

```bash
npm install -g pnpm
```

Verify installation:
```bash
pnpm --version
# Should output 10.0.0 or higher
```

## Step 4: Install Dependencies

Navigate to project directory and run:

```bash
pnpm install
```

This will install:
- Next.js 16
- Framer Motion (animation library)
- Tailwind CSS (styling)
- Drizzle ORM (database)
- TypeScript
- And all other dependencies

Wait for the installation to complete (may take 2-3 minutes).

## Step 5: Configure Environment Variables

Create a file named `.env.local` in the project root:

```bash
# On Mac/Linux:
touch .env.local

# On Windows:
type nul > .env.local
```

Add the following content (for development):

```env
# For local development (in-memory storage)
DATABASE_URL=postgresql://localhost/taskmaster

# Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET=your_generated_secret_here
```

For local testing, you can use placeholder values. The app will work with in-memory storage.

## Step 6: Start Development Server

Run the development server:

```bash
pnpm dev
```

You should see output like:
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

## Step 7: Open in Browser

1. Open your web browser
2. Go to `http://localhost:3000`
3. You should see the Task Master app with:
   - Beautiful gradient background
   - "Task Master" title with animations
   - "+ Create New Task" button
   - Filter buttons for Priority and Status
   - Empty state with clipboard emoji

## Step 8: Test the App

### Create Your First Task:

1. Click "+ Create New Task" button
2. In the modal that appears, enter:
   - **Title**: "Learn Framer Motion"
   - **Description**: "Master the art of creating smooth animations with Framer Motion and Next.js"
   - **Priority**: Medium (or any level)
   - **Status**: Pending
   - **Due Date**: Select any future date
3. Click "Save Task"
4. Watch the task card appear with smooth animations!

### Try More Features:

- **Edit a task**: Click "Edit" button on any task
- **Delete a task**: Click "Delete" button
- **Mark complete**: Click the checkbox on the task
- **Filter tasks**: Click priority or status buttons
- **View statistics**: Scroll down to see task count cards

## Step 9: Understanding the Code Structure

The project is organized as follows:

```
task-master-app/
├── app/
│   ├── api/
│   │   └── tasks/              # API routes for task operations
│   │       ├── route.ts        # GET/POST endpoints
│   │       └── [id]/route.ts   # PUT/DELETE endpoints
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page with animations
├── components/
│   ├── TaskCard.tsx            # Individual task display
│   ├── TaskForm.tsx            # Create/edit task modal
│   ├── FilterBar.tsx           # Priority/status filters
│   └── Toast.tsx               # Notification system
├── lib/
│   ├── schema.ts               # Database schema
│   ├── db.ts                   # Database connection
│   └── utils.ts                # Helper functions
├── public/                      # Static assets
├── .env.local                   # Environment variables (create this)
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind configuration
├── next.config.mjs              # Next.js configuration
└── README.md                    # Full documentation
```

## Step 10: Animation Deep Dive

### Key Animation Features in the App:

1. **Page Load Animations** (in `page.tsx`):
   - Title fades in with slide down effect
   - Buttons scale up smoothly
   - Filters stagger in sequence

2. **Task Card Animations** (in `TaskCard.tsx`):
   - Cards enter with fade and scale
   - Hover lifts the card up
   - Delete animates out smoothly

3. **Form Modal Animations** (in `TaskForm.tsx`):
   - Modal backdrop fades in
   - Form scales up from center
   - Input fields slide in with stagger

4. **Filter Animations** (in `FilterBar.tsx`):
   - Buttons scale on hover
   - Selected buttons get shadow
   - Smooth color transitions

5. **Toast Notifications** (in `Toast.tsx`):
   - Auto-dismiss after 3 seconds
   - Fade and slide animation
   - Success/error/info colors

## Step 11: Making Modifications

### Change Animation Speed

Edit any file and find the transition duration:

```tsx
transition={{ duration: 0.3 }}  // Change 0.3 to 0.5 for slower
```

### Change Colors

Tailwind color classes are used throughout. For example, to change primary color:

```tsx
// Change from:
className="bg-gradient-to-r from-blue-500 to-emerald-500"

// To:
className="bg-gradient-to-r from-purple-500 to-pink-500"
```

### Add More Form Fields

In `TaskForm.tsx`, add new input fields:

```tsx
<input type="text" placeholder="New field" />
```

## Step 12: Build for Production

When ready to deploy:

```bash
pnpm build
```

This creates an optimized production build in `.next` folder.

Then start the production server:

```bash
pnpm start
```

## Step 13: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Click "Deploy"

Your app will be live in seconds!

## Troubleshooting

### "Port 3000 already in use"
```bash
# Use a different port:
pnpm dev -- -p 3001
```

### "Cannot find module 'framer-motion'"
```bash
# Reinstall dependencies:
pnpm install
```

### Animations not smooth
- Check browser DevTools > Performance tab
- Ensure hardware acceleration is enabled
- Try a different browser
- Close other applications using CPU

### Tasks disappear after refresh
This is normal - currently using in-memory storage. Data persists during session but clears on page reload. To persist data permanently, connect to a database (see README.md).

### Form validation errors
- Description must be at least 20 characters
- Due date is required
- All fields must be filled
- Check browser console for detailed errors

## Next Steps

Once everything is working:

1. **Customize colors**: Edit Tailwind classes to match your brand
2. **Add database**: Connect PostgreSQL with Neon for data persistence
3. **Add authentication**: Implement Better Auth for user login
4. **Deploy**: Push to Vercel for live access
5. **Extend features**: Add tags, categories, recurring tasks, etc.

## Tips for Best Experience

- Use Chrome/Edge for best performance
- Keep browser updated for smooth animations
- Test on mobile by resizing browser window
- Use DevTools to inspect and debug animations

## Performance Checklist

- [x] Animations optimized with Framer Motion
- [x] Responsive design working on all devices
- [x] Toast notifications auto-dismiss
- [x] Smooth form transitions
- [x] Filter animations are performant
- [x] No layout shifts during animations

## Common Questions

**Q: Can I customize the animations?**
A: Yes! Edit the transition values and animation configurations in each component.

**Q: Will my tasks save?**
A: During development, they persist in the current session. For permanent storage, add a database.

**Q: Can I use this template for my project?**
A: Absolutely! It's open-source and fully customizable.

**Q: How do I add more features?**
A: Add new components, update the API routes, and extend the schema as needed.

## Support & Resources

- Next.js Documentation: https://nextjs.org/docs
- Framer Motion Guide: https://www.framer.com/motion
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

**You're all set! Start creating amazing tasks with smooth animations! 🎉**
