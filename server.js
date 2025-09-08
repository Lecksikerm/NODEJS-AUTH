require("dotenv").config(); // ✅ Load .env variables FIRST
const express = require("express");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const uploadImageRoutes = require("./routes/image-routes");

connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    console.log("hello..........")
    res.send("hello world")
});

// ✅ Enable your auth routes
app.use("/api/auth", authRoutes);

// Enable your home routes
app.use("/api/home", homeRoutes);

//Enable your admin routes
app.use("/api/admin", adminRoutes);

//Enable your image routes
app.use("/api/image", uploadImageRoutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is now listening to PORT ${PORT}`);
});
