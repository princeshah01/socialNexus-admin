import React from "react";
import { useState } from "react";
import { Lock, Eye, Mail, EyeClosed, Info } from "lucide-react";
import { validateEmail, validatePassword } from "../../utils/validator";
import { loginUser } from "../../service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  otpSending,
  otpSent,
  failedSendingOtp,
} from "../../redux/slice/AuthSlice";
import { useSelector } from "react-redux";
const LoginBox = ({ email, setEmail }) => {
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { sendingOtp } = useSelector((store) => store.Auth);
  console.log("🚀 ~ LoginBox ~ sendingOtp:", sendingOtp);
  const HandelLogin = async (e) => {
    e.preventDefault();
    dispatch(otpSending());
    try {
      const response = await loginUser({ email, password });
      if (response.status === 201) {
        toast.success(response.data.message || "Check mail for Otp");

        setTimeout(() => {
          dispatch(otpSent());
        }, 1000);

        return;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Check again");
      dispatch(failedSendingOtp());
    }
  };
  const strongPassword = (value) => {
    setPassword(value);
    if (value.length === 0) {
      setPasswordError(null);
      return;
    }
    const error = validatePassword(value);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError(null);
  };

  const validEmail = (value) => {
    setEmail(value);
    if (value.length === 0) {
      setEmailError(null);
      return;
    }
    const error = validateEmail(value);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError(null);
  };
  return (
    <form
      onSubmit={HandelLogin}
      className="flex flex-col space-y-8 items-center justify-between"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* <div className="border-2 border-neutral rounded-full p-4">
            <img src={Logo} width={40} alt="Logo" />
            </div> */}
        <h3 className="text-xl font-medium">Admin Login</h3>
      </div>

      <div className="w-full space-y-6">
        <div className="flex flex-col gap-2">
          <label
            className={`flex items-center gap-2 input input-ghost border-neutral w-full [&:has(input:focus)]:outline-${
              emailError ? "warning" : "neutral"
            }`}
          >
            <Mail size={18} />
            <input
              value={email}
              onChange={(e) => {
                validEmail(e.target.value);
              }}
              type="email"
              className="grow focus:outline-none"
              placeholder="Email"
            />
          </label>
          <span className="ml-1 h-3 flex flex-row items-center gap-2">
            {emailError && (
              <>
                <Info size={12} color="oklch(70% 0.191 22.216)" />
                <p className="text-xs text-warning">{emailError}</p>
              </>
            )}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label
            className={`flex items-center gap-2 input input-ghost border-neutral w-full [&:has(input:focus)]:outline-${
              passwordError ? "warning" : "neutral"
            }`}
          >
            <Lock size={18} />
            <input
              value={password}
              onChange={(e) => {
                strongPassword(e.target.value);
              }}
              type={passwordIsShown ? "text" : "password"}
              className="grow focus:outline-none"
              placeholder="Password"
            />

            <button
              type="button"
              className="focus:outline-none"
              onClick={() => setPasswordIsShown(!passwordIsShown)}
            >
              {passwordIsShown ? <Eye size={18} /> : <EyeClosed size={18} />}
            </button>
          </label>
          <span className="ml-1 h-3 flex flex-row items-center gap-2">
            {passwordError && (
              <>
                <Info size={12} color="oklch(70% 0.191 22.216)" />
                <p className="text-xs w-[95%] text-warning overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {passwordError}
                </p>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button className="text-sm text-base hover:underline underline-offset-2">
          Forgot Password?
        </button>
        <button
          disabled={!(!passwordError && !emailError && email && password)}
          type="submit"
          className="btn btn-outline w-full hover:bg-neutral text-base border-neutral"
        >
          {sendingOtp ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginBox;
