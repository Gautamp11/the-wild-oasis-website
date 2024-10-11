import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function Account() {
  const session = await auth();

  return (
    <div>
      <h1 className="font-semibold text-2xl mb-6">
        Welcome, {session.user.name}
      </h1>
    </div>
  );
}
