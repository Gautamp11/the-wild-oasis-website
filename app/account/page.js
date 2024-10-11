import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function Account() {
  const session = await auth();

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
    </div>
  );
}
