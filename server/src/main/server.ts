import { config } from "dotenv";
import app from './config/app';

config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running!");
})