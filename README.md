# AI Content Generator (Gemini primary)

## Overview
- Endpoint: `POST /api/content`
- Body: `{ businessName, category, city, services }`
- Primary: Google Gemini (requires GEMINI_API_KEY)
## Setup
1. Copy the zip contents to a folder and open in terminal.
2. Run `npm install`.
3. Put your keys in `.env`:
   ```
   GEMINI_API_KEY=your_gemini_key_here
   PORT=5000
   ```
4. Start server: `npm start`

## Testing (Thunder Client)
- POST http://localhost:5000/api/content
- JSON body sample:
  ```json
  {
    "businessName":"BlueWave Digital",
    "category":"Marketing Agency",
    "city":"Mumbai",
    "services":["SEO","Social Media Marketing","Brand Strategy"]
  }
  ```
