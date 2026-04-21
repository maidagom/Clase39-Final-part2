import mongoose from "mongoose";

const url = "mongodb://localhost:27017/personas";
/*const baseDeDatos = "users";*/

export const conectar = async () => {
    try {
        await mongoose.connect(`mongodb+srv://Vercel-Admin-Proyecto_final_MongoDB:hthktGJ0jJXdCl8O@proyecto-final-mongodb.d79ic8d.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Conectado a la Base de datos");
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error.message);
        process.exit(1);
    }
}

export default conectar;