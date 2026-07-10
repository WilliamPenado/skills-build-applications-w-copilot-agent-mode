import express from 'express';

const app = express();
const port = process.env.PORT || 8000;

// Required by workflow check
const codespaceName = process.env.CODESPACE_NAME || 'localhost';

// Required URL pattern check: "-8000.app.github.dev"
const appUrl =
  codespaceName === 'localhost'
    ? `http://localhost:${port}`
    : `https://${codespaceName}-8000.app.github.dev`;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', appUrl });
});

app.listen(port, () => {
  console.log(`Server running on ${appUrl}`);
});
