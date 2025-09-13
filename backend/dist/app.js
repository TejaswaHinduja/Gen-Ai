import express from 'express';
import cors from 'cors';
import connectdb from './db.js';
import { router } from "./routes/auth.js";
import cookieparser from 'cookie-parser';
const app = express();
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
connectdb();
app.use("/api/auth", router);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
export default app;
//# sourceMappingURL=app.js.map