import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for all routes

app.get("/", (request, response) => {
    response.send("Node.js Users REST API 🎉");
});

async function getUsersFromJSON() {
    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);
    users.sort((userA, userB) => userA.name.localeCompare(userB.name));
    return users;
}

// READ all users
app.get("/users", async (request, response) => {
    response.json(await getUsersFromJSON());
});

// READ one user
app.get("/users/:id", async (request, response) => {
    const id = request.params.id; // tager id fra url'en, så det kan anvendes til at finde den givne bruger med "det" id.
    const users = await getUsersFromJSON();
    const user = users.find(user => user.id === id);
    response.json(user);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`App listening on http://localhost:${port}`);
    console.log(`Users Endpoint http://localhost:${port}/users`);
});
