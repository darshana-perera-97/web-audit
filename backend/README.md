# Web Audit Backend Server

Backend server for the SitePulse web audit application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

   Then edit `.env` and configure:
   - **SMTP settings** (required for email notifications)
   - **Google PageSpeed API key** (optional, for real performance data)
   - **OpenAI API key** (optional, for AI content analysis)
   
   See `env.example` for detailed configuration instructions.

3. Build the React frontend:
```bash
cd ../reactjs
npm install
npm run build
cd ../backend
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Server Configuration

The server runs on `http://localhost:5500` by default (configurable via `PORT` environment variable).

## Serving React App

The backend server automatically serves the React build folder. The React app will be available at the root URL (`http://localhost:5500/`), and all API endpoints are available at `/api/*`.

### Route Structure:
- `/api/*` - All API endpoints
- `/*` - React app (served from `reactjs/build` folder)

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/analyze?url=<website_url>` - Analyze a website
- `GET /api/analyze-content?url=<website_url>` - Analyze website content
- `GET /api/extract-links?url=<website_url>` - Extract links from website
- `GET /api/check-broken-links?url=<website_url>` - Check for broken links
- `POST /api/reports` - Save a report
- `GET /api/reports/:reportId` - Get a report by ID
- `POST /api/send-email` - Send email notification to user

## Environment Variables

All configuration is done through the `.env` file. Key variables:

- **SMTP_*** - Email service configuration (required for email notifications)
- **GOOGLE_PAGESPEED_API_KEY** - For real performance metrics (optional)
- **OPENAI_API_KEY** - For AI content analysis (optional)
- **PORT** - Server port (default: 5500)

See `env.example` for complete documentation and examples.

## Notes

- The React build folder must exist at `../reactjs/build` for the app to be served
- If the build folder doesn't exist, only API endpoints will work
- All API routes are prefixed with `/api` to avoid conflicts with React Router
- Email service is optional - app works without it, but won't send notifications
