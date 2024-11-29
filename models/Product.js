import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    titel: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

// Verificar si el modelo ya está definido
let Product;

if (mongoose.models.products) {
    Product = mongoose.model("products"); // Usar el modelo ya definido
} else {
    Product = mongoose.model("products", ProductSchema); // Crear el modelo si no existe
}

export { Product };
