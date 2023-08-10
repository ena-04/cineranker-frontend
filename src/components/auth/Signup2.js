import { useState, useContext } from "react";
import { signupFields } from "../../constants/formFields";
import UserContext from "../../store/user-context";
import { Navigate } from "react-router-dom";
import { ErrorModal } from "../layout/ErrorModal";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [signup, setSignup] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  const UserCxt = useContext(UserContext);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);

    fetch("https://cineranker-backend.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupState),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Signing in failed!");
          throw new Error("Signing in failed!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSignup(true);
      })
      .catch((err) => {
        // setHasError(true);
        // setError(err.message);

        UserCxt.setErrorHandler(err.message);
        console.log("in catch");

        console.log(err);
      });
  };

  if (signup) return <Navigate replace to="/login" />;
  else
    return (
      <>
        {UserCxt.hasError && <ErrorModal message={UserCxt.error} />}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="">
            {fields.map((field) => (
              <div className="my-5">
                <label htmlFor={field.labelFor} className="sr-only">
                  {field.labelText}
                </label>
                <input
                  key={field.id}
                  onChange={handleChange}
                  value={signupState[field.id]}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  required={field.isRequired}
                  placeholder={field.placeholder}
                  className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                />
              </div>
            ))}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
              onSubmit={handleSubmit}
            >
              Signup
            </button>
          </div>
        </form>
      </>
    );
}
