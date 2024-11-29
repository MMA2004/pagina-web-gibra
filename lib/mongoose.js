import mongoose from "mongoose";

export function mongooseConnect() {
    // Verificar si ya existe una conexión activa
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection);
    } else {
        // Validar que la URI exista
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI no está definida en las variables de entorno.");
        }

        // Conectar a la base de datos
        return mongoose.connect(uri, {
            useNewUrlParser: true,      // Opciones para evitar advertencias
            useUnifiedTopology: true,  // en versiones más antiguas de Mongoose
        });
    }
}
