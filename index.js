const express = require("express");

const app = express();
const PORT = 3001;

// Middleware (optional but good to have)
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
    res.send("Hello World! Your server is working 🚀");
});

// Start the server (force binding to IPv4)
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
