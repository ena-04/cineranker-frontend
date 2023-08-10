import { useState, useContext } from "react";
import { loginFields } from "../../constants/formFields";
import UserContext from "../../store/user-context";
import { ErrorModal } from "../layout/ErrorModal";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  //   const [user, setUser] = useState(null);
  //   const [accessToken, setAccessToken] = useState("");

  const UserCxt = useContext(UserContext);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginState);

    UserCxt.loginHandler(loginState);
  };

  return (
    <>
      {UserCxt.hasError && <ErrorModal message={UserCxt.error} />}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <div className="my-5">
              <label htmlFor={field.labelFor} className="sr-only">
                {field.labelText}
              </label>
              <input
                key={field.id}
                onChange={handleChange}
                value={loginState[field.id]}
                id={field.id}
                name={field.name}
                type={field.type}
                required={field.isRequired}
                placeholder={field.placeholder}
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            {/* <a
          href="#"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Forgot your password?
        </a> */}
          </div>
        </div>{" "}
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          Login
        </button>
      </form>
    </>
  );
}
