import app from "./src/app.js"
import { initDatabase } from "./src/config/init-database.js";


const PORT = 3000;


await initDatabase();


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

