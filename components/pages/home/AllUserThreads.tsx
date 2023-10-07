"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AllUserThreads() {
  const [threads, setThreads] = useState([]);
  const getUsers = async () => {
    try {
      const allThreads = await axios.get("api/threads/getAllThreads");
      setThreads(allThreads.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      {threads.map(({ name, thread, imageLink }, index) => (
        <div
          key={index}
          className="flex-row-center gap-5 bg-secondary-100 py-5 px-6 rounded-md my-10"
        >
          <Image src={imageLink} alt="User Image" className="w-12 h-12" />
          <div className="flex flex-col justify-start">
            <span>{name}</span>
            <span>{thread}</span>
          </div>
        </div>
      ))}
    </>
  );
}
