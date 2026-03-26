import app from "./app.js"

const PORTA = process.env.PORTA || 3000;
app.listen(PORTA);