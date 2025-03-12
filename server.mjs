import express from 'express';
const app = express();
const PORT = 3000;
import helmet from "helmet"

// Disable helmet's default CSP and use your custom CSP
app.use(
    helmet({
      contentSecurityPolicy: false, // Disable default CSP
    })
  );

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "https://cdn.jsdelivr.net"], // Allow external scripts like Axios CDN
                "style-src": ["'self'", "'unsafe-inline'"], // Allow inline styles
                "img-src": ["'self'", "data:"], // Allow images and data URLs
                "connect-src": ["'self'", "http://127.0.0.1:5001"], // Allow API calls to microservice
                "media-src": ["'self'", "data:"], // Allow media resources
            },
        },
    })
);

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});