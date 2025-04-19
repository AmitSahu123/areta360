# VTON Backend

This is the backend service for the Virtual Try-On application, which integrates with the Hugging Face API for image processing.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your Hugging Face API key and other configurations.

## Directory Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middlewares/    # Express middlewares
│   ├── utils/          # Utility functions
│   └── config/         # Configuration files
├── uploads/            # Temporary file storage
│   └── results/        # Processed images
└── package.json
```

## API Endpoints

### POST /api/vton/process
Process person and garment images for virtual try-on.

**Request:**
- Content-Type: multipart/form-data
- Body:
  - person_image: Image file (JPEG, JPG, PNG)
  - garment_image: Image file (JPEG, JPG, PNG)

**Response:**
```json
{
  "success": true,
  "result_image": "filename.png"
}
```

## Development

Run the server in development mode:
```bash
npm run dev
```

## Production

Run the server in production mode:
```bash
npm start
``` 