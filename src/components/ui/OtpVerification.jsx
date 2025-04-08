import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { InputOtp } from "primereact/inputotp";
import { resendOtp, verifyOtp } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingDone,
  fetchingfailed,
  fetchingInit,
} from "../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";

const OtpVerification = ({ email }) => {
  const navigate = useNavigate();
  const [otp, setotp] = useState(null);
  const [timer, setTimer] = useState(20);
  const { isLoading } = useSelector((store) => store.Auth);
  const auth = useSelector((store) => store.Auth);
  const dispatch = useDispatch();
  useEffect(() => {
    let stopWatch = setInterval(() => {
      setTimer((prev) => (prev !== 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(stopWatch);
  }, []);
  const handleVerification = async () => {
    dispatch(fetchingInit());
    try {
      if (otp.length !== 4 && !email) {
        throw new Error("Please Enter OTP first");
      }
      let response = await verifyOtp(otp, email);
      if (response.status === 200) {
        setotp("");
        setTimer(0);
        localStorage.setItem("token", response?.data?.data?.token);
        dispatch(fetchingDone(response?.data?.data));
        toast.success(response.data.message);
        navigate("/Dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      dispatch(fetchingfailed());
    }
  };

  const resend = async () => {
    setTimer(20);
    setotp("");
    try {
      let response = await resendOtp(email);
      if (response.status === 200) {
        toast.success(response?.data?.message || "Login Successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const customInput = ({ events, props }) => {
    const { invalid, unstyled, ...restProps } = props;
    return (
      <React.Fragment key={props.id}>
        <input
          {...events}
          {...restProps}
          type="password"
          className={`px-[14px] mr-2 text-xl 
             border-neutral
           w-10 border-2 h-10 flex flex-col justify-center items-center`}
        />
      </React.Fragment>
    );
  };
  console.log(auth);
  return (
    <div className="flex flex-col space-y-8 items-center justify-between">
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-xl font-medium">OTP Verification</h3>
        <p className="text-sm opacity-70 text-justify w-[90%]">
          Please enter the one-time password (OTP) sent to your Email : {email}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <InputOtp
          value={otp}
          onChange={(e) => {
            setotp(e.value);
          }}
          style={{ gap: 10, display: "flex" }}
          inputTemplate={(e) => customInput(e)}
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col justify-center items-center">
          <p>Didn't receive the code?</p>
          {timer === 0 ? (
            <button
              onClick={() => {
                resend();
              }}
              className="hover:underline underline-offset-4"
            >
              Resend OTP
            </button>
          ) : (
            <p>{timer}</p>
          )}
        </div>
        <button
          onClick={() => {
            handleVerification();
          }}
          className="btn btn-outline  w-full hover:bg-neutral text-base  border-neutral"
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Verify & Proceed"
          )}
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
