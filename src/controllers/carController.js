import { Car } from "../models/car.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"


import { ApiResponse } from "../utils/ApiResponse.js";

import mongoose from "mongoose";



export const getAllCars = asyncHandler(async (req, res) => {
    const { user_Id } = req.params;
    console.log("userId" ,user_Id)

    try {
        
        const cars = await Car.find({ owner: user_Id });

        if (!cars || cars.length === 0) {
            throw new ApiError(404, "No cars found for this user.");
        }

        res.status(200).json(new ApiResponse(200, cars, "Cars fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Server error. Could not fetch cars.");
    }
});

export const getCarDetails = asyncHandler(async (req, res) => {
    const { car_Id } = req.params;

    try {
       
        const car = await Car.findById(car_Id);

        if (!car) {
            throw new ApiError(404, "Car not found.");
        }

        res.status(200).json(new ApiResponse(200, car, "Car details fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Server error. Could not fetch car details.");
    }
});



export const createCar = asyncHandler(async (req, res) => {
    const { name, description, images } = req.body;
    console.log(  name, description, images ," name, description, images")
    const owner = req.user._id;

    if (!name || !description || !images || images.length === 0) {
        throw new ApiError(400, "Name, description, and at least one image are required");
    }

    try {
   
        const newCar = await Car.create({
            name,
            description,
            images,
            owner,
        });

        res.status(201).json(new ApiResponse(201, newCar, "Car created successfully"));
    } catch (error) {
        throw new ApiError(500, "Server error. Could not create car");
    }
});


export const deleteCar = asyncHandler(async (req, res) => {
    const { carId } = req.params;


    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
        throw new ApiError(404, "Car not found");
    }

    res.status(200).json(new ApiResponse(200, null, "Car deleted successfully"));
});


export const updateCar = asyncHandler(async (req, res) => {
    const { carId } = req.params;
    const { name, description, images } = req.body;

    
    const car = await Car.findById(carId);

    if (!car) {
        throw new ApiError(404, "Car not found");
    }


    if (name) car.name = name;
    if (description) car.description = description;
    if (images) car.images = images;

    const updatedCar = await car.save();

    res.status(200).json(new ApiResponse(200, updatedCar, "Car updated successfully"));
});
