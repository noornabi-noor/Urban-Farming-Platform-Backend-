import { Role } from "@prisma/client";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { envVars } from "../config/env";

async function seedAdmin() {
  try {
    const adminData = {
      name: envVars.ADMIN_NAME,
      email: envVars.ADMIN_EMAIL,
      password: envVars.ADMIN_PASSWORD,
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    // Check if user exists but lacks a password in User model
    if (existingUser && existingUser.password) {
      console.log("Admin already exists with password!");
      return;
    }

    // Hash password for manual AuthService compatibility
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    if (existingUser) {
        console.log("Admin exists without password. Updating password and role...");
        await prisma.user.update({
            where: { email: adminData.email },
            data: {
              password: hashedPassword,
              role: Role.ADMIN,
              emailVerified: true,
            },
        });
        console.log("Admin updated successfully!");
        return;
    }

    // If completely missing, create via fetch then update (to keep Session/Account sync)
    // Actually simpler to just wait for better-auth once, but for now we manually handle User model
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (envVars.BETTER_AUTH_URL) {
      headers["Origin"] = envVars.BETTER_AUTH_URL;
    }

    const response = await fetch(
      `${envVars.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(adminData),
      },
    );

    const text = await response.text();
    let result: any;
    try {
      result = JSON.parse(text);
    } catch {
      console.error("Response was not JSON:", text);
      return;
    }

    console.log("Sign-up result:", result);

    if (!response.ok) {
      console.error("Failed to create admin via auth API");
      return;
    }

    // Promote user to ADMIN and set password for manual login
    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        password: hashedPassword,
        role: Role.ADMIN,
        emailVerified: true,
      },
    });

    console.log("Admin promoted successfully!");
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1); // optional: exit script on error
  }
}

// Run the seed
seedAdmin();
