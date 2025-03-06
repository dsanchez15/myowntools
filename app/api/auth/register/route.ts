// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Comprobar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Este correo ya está registrado" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Usuario registrado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error de registro:", error);
    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}