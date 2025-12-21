# SitePulse Backend Server

Backend API server for the SitePulse web audit application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend` folder:
   - **Option 1:** Copy the sample file:
     - On Windows: `copy env.example .env`
     - On Mac/Linux: `cp env.example .env`
   - **Option 2:** Manually create `.env` with the following content:
     ```
     PORT=5500
     NODE_ENV=development
     GOOGLE_PAGESPEED_API_KEY=your_api_key_here
     ```

**Getting a Google PageSpeed Insights API Key (Optional):**
The system works with simulated data by default. To get real performance data:

1. **Get a free API key:**
   - Visit: https://console.cloud.google.com/
   - Create a new project (or select an existing one)
   - Enable the "PageSpeed Insights API" in the API Library
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Copy your API key

2. **Add to `.env` file:**
   - Open `backend/.env` file
   - Replace `your_api_key_here` with your actual API key:
     ```
     GOOGLE_PAGESPEED_API_KEY=AIzaSyYourActualKeyHere
     ```

3. **Restart the server:**
   ```bash
   npm start
   ```

**Note:** Without an API key, the system will use simulated data (this is not an error - it's a fallback feature).

3. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server health status

### Website Analysis
- `GET /api/analyze?url=<website-url>` - Analyze a website

## Example Usage

```bash
# Health check
curl http://localhost:5500/api/health

# Analyze website
curl http://localhost:5500/api/analyze?url=https://example.com
```

## Development

The server uses:
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Auto-reload in development
