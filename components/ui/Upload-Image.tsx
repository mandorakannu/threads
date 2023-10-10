"use client";
import { useState } from "react";
import { UploadButton } from "@functions/uploadthing";
import { AlertModel } from "@shared_ui/Model";
import "@uploadthing/react/styles.css";

export default function ImageUploader() {
  const [isOpen, setIsOpen] = useState({
    title: "",
    description: "",
    isOpen: false,
  });
  const { title, description } = isOpen;
  return (
    <>
      {isOpen && (
        <AlertModel
          title={title}
          description={description}
          isOpen={isOpen.isOpen}
          onClose={() => setIsOpen({ ...isOpen, isOpen: false })}
        />
      )}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setIsOpen({
              title: "Image Uploaded",
              description: "Your image has been uploaded",
              isOpen: true,
            });
          }}
          onUploadError={(error: Error) => {
            setIsOpen({
              title: "Oops!",
              description: "Your image could not be uploaded",
              isOpen: true,
            });
          }}
        />
      </main>
    </>
  );
}
