import { Router } from "express";
import { createCar, getAllCars, getCarDetails ,deleteCar,updateCar} from "../controllers/carController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const carRouter = Router();


carRouter.route("/create").post(verifyJWT, createCar);

carRouter.route("/all/:user_Id").get(verifyJWT, getAllCars);


carRouter.route("/:car_Id")
.get(verifyJWT, getCarDetails)

carRouter.delete("/:carId", verifyJWT, deleteCar);


carRouter.put("/:carId", verifyJWT, updateCar);

export default carRouter;
