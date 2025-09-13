# Hfiles Frontend

A Next.js frontend application for medical file management with user authentication.

## Features

- 🔐 User authentication (login/registration)
- 👤 User profile management with image upload
- 📄 Medical file upload, viewing, and deletion
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🔔 Toast notifications for user feedback
- 🛡️ Protected routes with middleware
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Notifications**: react-hot-toast
- **HTTP Client**: Fetch API with credentials

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- ASP.NET backend server (see backend repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/harshmore947/Hfiles_frontend.git
   cd Hfiles_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your backend URL:

   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.azurewebsites.net
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── (auth)/          # Authentication pages (login, sign-up)
│   ├── dashboard/       # Dashboard page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── base/            # Base components (header, footer, etc.)
│   ├── dashboard/       # Dashboard-specific components
│   ├── herosection/     # Hero section component
│   └── ui/              # Reusable UI components (shadcn/ui)
├── lib/
│   ├── stores/          # Zustand stores
│   └── utils.ts         # Utility functions
├── middleware.ts        # Next.js middleware for route protection
└── public/              # Static assets
```

## Key Components

### Authentication Store (`lib/stores/authStore.ts`)

- Manages user authentication state
- Handles login, logout, profile updates
- Medical file CRUD operations
- Session management with backend cookies

### Dashboard Components

- **ProfileCard**: User profile display and editing
- **AddRecords**: Medical file upload interface
- **ViewRecord**: Medical files table with delete functionality

### Middleware (`middleware.ts`)

- Client-side authentication checking
- Protected route handling

## API Integration

The frontend integrates with an ASP.NET backend that provides:

- `/api/auth/login` - User login
- `/api/auth/register` - User registration
- `/api/auth/logout` - User logout
- `/api/profile` - Profile management
- `/api/profile/upload-profile-image` - Profile image upload
- `/api/medical-files` - Medical file operations

All API calls use `credentials: "include"` for session cookie handling.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API base URL

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
