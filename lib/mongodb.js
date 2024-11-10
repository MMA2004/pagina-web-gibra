import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let client;

if (process.env.NODE_ENV === "development") {
    // En modo desarrollo, usamos una variable global para que el valor
    // se mantenga entre recargas de módulos causadas por HMR.
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri, options);
    }
    client = global._mongoClient;
} else {
    // En modo producción, es mejor no usar una variable global.
    client = new MongoClient(uri, options);
}

// Exportar un MongoClient con alcance de módulo. Al hacer esto en un
// módulo separado, el cliente puede ser compartido entre funciones.
export default client;
