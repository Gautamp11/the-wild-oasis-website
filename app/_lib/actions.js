"use server";

import { signIn, signOut } from "./auth";

// using server action so, that we can submit form on server side only
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

//signout button is a client comp still we can use server action over there that is beauty
export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}
