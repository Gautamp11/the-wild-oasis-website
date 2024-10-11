"use client";
import { useFormStatus } from "react-dom";

// useFormStatus new hook to check form status... we can use this inside a componnet inside a form that's why I am created this Button which I will place in above form
export default function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating..." : children}
    </button>
  );
}
