"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  //genrated with our fav chatpt to check valid national id 🙉
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide valid id");

  const updatedData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");

  //manually revalidating cache as it will show old data in form for sometime
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.log(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const id = formData.get("bookingId");

  const updatedFields = {
    numGuests: numGuests,
    observations: observations,
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${id}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  console.log(bookingData, formData);
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  console.log(newBooking);

  const { data, error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/thankyou");
}

// using server action so, that we can submit form on server side only
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

//signout button is a client comp still we can use server action over there that is beauty
export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}
