import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./db/index.js"; 
import userRouter from "./routes/user.routes.js"; 
import cors from "cors"; 
import carRouter from "./routes/car.routes.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());


app.get('/api/v1/docs', (req, res) => {
  res.send(`
    <html>
      <head><title>API Documentation</title></head>
      <body>
        <h1>API Documentation</h1>
        
        <h2>User Routes</h2>
        <ul>
          <li><strong>POST /api/v1/users/register</strong> - Register a new user</li>
          <p><strong>Body:</strong></p>
          <pre>{
  "fullName": "Harsh Sri",
  "email": "sri@example.com",
  "password": "password123"
}</pre>
          <p><strong>Response:</strong> 201 Created - JSON object with user details and a JWT token.</p>

          <li><strong>POST /api/v1/users/login</strong> - Login an existing user</li>
          <p><strong>Body:</strong></p>
          <pre>{
  "email": "johndoe@example.com",
  "password": "password123"
}</pre>
          <p><strong>Response:</strong> 200 OK - JSON object with user details and a JWT token.</p>

          <li><strong>POST /api/v1/users/logout</strong> - Logout a user (requires JWT)</li>
          <p><strong>Request Headers:</strong></p>
          <pre>Authorization: Bearer [token]</pre>
          <p><strong>Response:</strong> 200 OK - JSON message confirming logout.</p>
        </ul>
        
        <h2>Product (Car) Routes</h2>
        <ul>
          <li><strong>POST /api/v1/cars/create</strong> - Create a new Product (requires JWT)</li>
          <p><strong>Request Headers:</strong></p>
          <pre>Authorization: Bearer [token]</pre>
          <p><strong>Body:</strong></p>
          <pre>{
  "name": "Lamborghini",
  "description": "Luxury sports car",
  "images": ["image1_url", "image2_url"]
}</pre>
          <p><strong>Response:</strong> 201 Created - JSON object with product details.</p>

          <li><strong>GET /api/v1/cars/all/{user_Id}</strong> - Get all Products for a user (requires JWT)</li>
          <p><strong>Request Headers:</strong></p>
          <pre>Authorization: Bearer [token]</pre>
          <p><strong>Response:</strong> 200 OK - JSON array of products associated with the user.</p>

          <li><strong>GET /api/v1/cars/{car_Id}</strong> - Get details of a specific Product (requires JWT)</li>
          <p><strong>Request Headers:</strong></p>
          <pre>Authorization: Bearer [token]</pre>
          <p><strong>Response:</strong> 200 OK - JSON object with product details.</p>

          <li><strong>PUT /api/v1/cars/{car_Id}</strong> - Update a Product (requires JWT)</li>
          <p><strong>Request Headers:</strong></p>
          <pre>Authorization: Bearer [token]</pre>
          <p><strong>Body:</strong></p>
          <pre>{
  "name": "Updated Car Name",
  "description": "Updated description of the car",
  "images": ["new_image_url1", "new_image_url2"]
}</pre>
          <p><strong>Response:</strong> 200 OK - JSON object with updated product details.</p>

          <li><strong>DELETE /api/v1/cars/{car_Id}</strong> - Delete a Product (requires JWT)</li>
          <p><strong>Request Headers:</strong></p>
          <pre>Authorization: Bearer [token]</pre>
          <p><strong>Response:</strong> 204 No Content - Product deleted successfully.</p>
        </ul>
        
        <h2>Authentication</h2>
        <p>All product routes require a Bearer token for authentication (except user registration and login).</p>
      </body>
    </html>
  `);
});



app.use("/api/v1/users", userRouter);
app.use("/api/v1/car", carRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
