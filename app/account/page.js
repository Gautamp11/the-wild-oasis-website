import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function Account() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
    </div>
  );
}
