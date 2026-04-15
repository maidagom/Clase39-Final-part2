import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioEsquema = new mongoose.Schema(
    {
        usuario: {
            type: String,
            required: true,
            unique: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        contrasenha: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

usuarioEsquema.pre("save", async function () {
    // En funciones async, Mongoose no pasa el callback 'next'
    // Simplemente esperamos a que la promesa se resuelva
    
    if (!this.isModified("contrasenha")) {
        return;
    }
    
    try {
        // Encriptamos la contraseña
        this.contrasenha = await bcrypt.hash(this.contrasenha, 10);
    } catch (error) {
        // Si hay un error, lo lanzamos para que Mongoose lo capture
        throw error;
    }
});

export const Usuario = mongoose.model("Usuario", usuarioEsquema);
