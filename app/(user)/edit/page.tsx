"use client";
import axios from "axios";
import Image from "next/image";
import Loader from "@ui/Loader";
import { useUser } from "@clerk/nextjs";
import { useState, FormEvent } from "react";
import { AlertModel } from "@shared_ui/Model";
import { apiResponse } from "@functions/response";
export default function EditUserPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<JSX.Element | string>("Continue");
  const [result, setResult] = useState({
    title: "",
    description: "",
    isOpen: false,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(<Loader />);
    const formData = new FormData(event.currentTarget);
    const { username } = Object.fromEntries(formData);
    try {
      if (!username)
        return setResult({
          title: "Error",
          description: "Username is required",
          isOpen: true,
        });
      const response = await axios.post("/api/user/edit", username);
      const getResponseResult = await apiResponse(
        response.data.message,
        response.status
      );
      setResult({
        title: getResponseResult.title,
        description: getResponseResult.description,
        isOpen: true,
      });
    } catch (error: any) {
      setResult({
        title: "Error",
        description: error.response.data.message,
        isOpen: true,
      });
    } finally {
      setLoading("Continue");
    }
  };
  return (
    <>
      {result.isOpen && (
        <AlertModel
          title={result.title}
          description={result.description}
          isOpen={result.isOpen}
          onClose={() => setResult({ ...result, isOpen: false })}
        />
      )}
      <h1 className="font-bold text-3xl my-3">Edit Profile</h1>
      <h2 className="font-normal text-lg my-3">Make any changes</h2>
      <div className="flex flex-row items-center py-5 gap-4">
        <Image
          src={user!.imageUrl as string}
          alt="profile picture"
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
      <form onSubmit={handleSubmit} method="post" className="py-5">
        <div className="flex flex-col gap-4 my-6">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-light-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="flex h-10 w-full rounded-md border border-slate-200 bg-secondary-200 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800 account-form_input no-focus"
          />
        </div>
        <button
          type="submit"
          className="grid place-items-center mb-6 border w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-300  focus:bg-secondary-300 focus:outline-none focus:ring-0 active:bg-secondary-300 h-10"
        >
          {loading}
        </button>
      </form>
    </>
  );
}
