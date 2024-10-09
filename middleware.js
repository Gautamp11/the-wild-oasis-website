import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

// // to match only account route and redirect to above route decalred
// export const config = {
//   matcher: ["/account"],
// };

// Now lets use auth middleware to only allow signed in user to go to guest area

import { auth } from "./app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
