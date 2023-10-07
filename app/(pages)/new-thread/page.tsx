"use client";
import { useRef, useState } from "react";
import Loader from "@ui/Loader";
import axios from "axios";
import { AlertModel } from "@shared_ui/Model";
export default function CreateThread() {
  const [loading, setLoading] = useState<JSX.Element | string>("Share Thread");
  const [data, setData] = useState({
    title: "",
    description: "",
    isOpen: false,
  });
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const createThread = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      setLoading(<Loader />);
      const content = contentRef.current?.value;

      if (!content) {
        setData({
          title: "Error",
          description: "Please enter a valid content",
          isOpen: true,
        });
      }
      const response = await axios.post("/api/threads/create-thread", content);
      if (response.status === 201) {
        setData({
          title: "Success",
          description: "Thread created successfully",
          isOpen: true,
        });
      } else {
        setData({
          title: "Error",
          description: "Something went wrong",
          isOpen: true,
        });
      }
    } catch (error) {
    } finally {
      setLoading("Share Thread");
    }
  };

  return (
    <>
      <AlertModel
        title={data.title}
        description={data.description}
        isOpen={data.isOpen}
        onClose={() => setData({ ...data, isOpen: false })}
      />
      <form
        method="POST"
        onSubmit={createThread}
        className="flex flex-col justify-start"
      >
        <h1 className="text-5xl mb-10">Create Thread</h1>
        <div className="flex flex-col justify-start">
          <label className="text-xl my-6" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            className="bg-secondary-300 p-3 focus:outline-1"
            required
            ref={contentRef}
          />
          <button
            type="submit"
            className="flex justify-center items-center w-full bg-shade-200 my-3 py-3 focus:outline-1"
          >
            {loading}
          </button>
        </div>
      </form>
    </>
  );
}
