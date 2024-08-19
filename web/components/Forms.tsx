"use client";

import { createTodos } from "@/lib/actions";
import { useRef } from "react";
import SubmitButton from "./SubmitButton";

export default function Forms() {
  // we are using useRef to reset the form after submission
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (FormData) => {
        ref.current?.reset();
        await createTodos(FormData);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="mb-2  dark:text-gray-400 text-lg">
          Email
        </label>
        <input
          name="todo"
          id="email"
          className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">
          Password
        </label>
        <input
          name="todoDeadline"
          id="password"
          className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <a className="group text-blue-400 transition-all duration-100 ease-in-out">
        <span className="bg-left-bottom bg-gradient-to-r text-sm from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
          Forget your password?
        </span>
      </a>
      <SubmitButton />
    </form>
  );
}
