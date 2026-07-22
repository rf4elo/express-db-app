import 'dotenv/config';
import e from "express";
import path from "path";
import { fileURLToPath } from "url";
import usersRoutes from "./routes/usersRoutes.js";
import PublicRoutes from "./routes/publicRoutes.js";
import cookieParser from "cookie-parser";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = e();


app.use(e.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.use(e.urlencoded({ extended: true }));
app.use(e.json());
app.use(cookieParser());


app.use("/api", usersRoutes);

app.use(PublicRoutes);

export default app;

