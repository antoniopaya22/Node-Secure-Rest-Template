import app from "./app";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";

const PORT = Number.parseInt(process.env.PORT) || 3000;
const HTTPS_PORT = Number.parseInt(process.env.HTTPS_PORT) || 3001;
const options = {
    key: fs.readFileSync(path.resolve(__dirname, "../certs/certificado.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "../certs/certificado.cert"))
};

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API REST corriendo en puerto ${PORT}`);
    console.log("============================================>");
})

https.createServer(options, app).listen(HTTPS_PORT);