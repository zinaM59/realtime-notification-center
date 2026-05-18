"use server";
import { z } from "zod";
import { signIn } from "@/auth";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6)
});


export async function registerAction(formData: FormData): Promise<void> {

    const parsed = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    });
    if (!parsed.success) {
        throw new Error("All fields are required.");

    }
    const existing = await prisma.user.findUnique({
        where: { email: parsed.data.email }
    });

    if (existing && existing !== undefined) {
        throw new Error("User already exists");
    }



    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    await prisma.user.create({
        data: {
            name: parsed.data.name,
            email: parsed.data.email,
            passwordHash
        }
    });

    await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirectTo: "/dashboard",
    });


}