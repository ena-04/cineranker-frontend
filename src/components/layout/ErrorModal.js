import React, { useContext } from "react";
import UserContext from "../../store/user-context";

export const ErrorModal = (props) => {
  const UserCxt = useContext(UserContext);

  const cancel = () => {
    UserCxt.handleErrorHandler();
  };
  return (
    <div className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-thin rounded-sm text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
      {props.message}
      <button onClick={cancel} className=" bg-red-400 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
