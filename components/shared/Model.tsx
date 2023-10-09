import { memo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
};

function Model({ isOpen, onClose, title, description }: Props) {
  return (
    <>
      {isOpen && (
        <div className="fixed z-50 left-0 sm:w-1/3 sm:mx-auto rounded-md p-2 py-20 mx-5 top-20 right-0 bg-white text-black">
          <span className="absolute top-0 left-0 p-7 font-bold text-2xl">
            {title}
          </span>
          <p className="px-6">{description}</p>
          <button
            type="button"
            className="bg-primary-500 text-white px-4 py-2 absolute right-5 rounded-md hover:bg-primary-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
export const AlertModel = memo(Model);
