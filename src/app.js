import e from "express";
import path from "path";
import { fileURLToPath } from "url";
import usersRoutes from "./routes/usersRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = e();


app.use(e.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.use(e.urlencoded({ extended: true }));
app.use(e.json());


app.use("/users", usersRoutes);

app.get("/", async (req, res) => {
    res.status(200).json({ "message":"Hello, world!", "routes":[ "/users" ] });
});

export default app;

