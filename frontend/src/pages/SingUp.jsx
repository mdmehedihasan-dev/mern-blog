import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SingUp = () => {
  return (
    <div className="min-h-screen mt-40">
      <div className="flex flex-col items-center max-w-5xl gap-20 mx-auto md:flex-row">
        {/* left side   */}
        <div className="flex-1 px-5 sm:px-0">
          <Link className="text-4xl font-bold dark:text-white" to={"/"}>
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-green-400 to-gray-300">
              Mehedi
            </span>
            Blog
          </Link>
          <p className="mt-5 text-lg md:text-xl md:mt-10">
            This is blog Website📒! You can Sing-up with email , password or
            Google account
          </p>
        </div>

        {/* right side  */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" id="username" placeholder="Username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                id="emal"
                placeholder="name@company.com"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" id="password" placeholder="password" />
            </div>

            <Button type="submit" gradientMonochrome="success">
              Sin-up
            </Button>
          </form>
          <div className="mt-10 font-semibold ">
            <span> You have already an Account ?</span>
            <Link className="text-blue-700 " to={"/sing-in"}>
              Please Sing-In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
