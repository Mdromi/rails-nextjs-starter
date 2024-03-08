"use client";
import { useEffect, useRef, useState } from "react";
import OtpInput from "./OtpInput";
import axios from "axios";
import { apiUrl } from "@/utils/apiUrl";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const OtpForm = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendTime, setResendTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<number | null>(null);
  const ref = useRef<HTMLFormElement>(null!);
  const router = useRouter();
  // const { data: session, status, update } = useSession()
  const { data: session, update: sessionUpdate } = useSession();

  useEffect(() => {
    const storedLastOtpSentAt = localStorage.getItem("lastOtpSentAt");
    // const parsedLastOtpSentAt = storedLastOtpSentAt
    //   ? parseInt(storedLastOtpSentAt, 10)
    //   : null;

    const parsedLastOtpSentAt = storedLastOtpSentAt
      ? parseInt(storedLastOtpSentAt, 10)
      : null;

    if (parsedLastOtpSentAt && parsedLastOtpSentAt > Date.now()) {
      setResendTime(60000 - (parsedLastOtpSentAt - Date.now()));
    } else {
      setResendTime(null);
    }
  }, []);

  const onSubmitSuccess = (message: string) => {
    toast.success(message);
    router.push("/");
    router.refresh();
  };

  function handleUpdateSession() {
    sessionUpdate({
      ...currentUser,
      verified: true,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting code to API", otp);

    try {
      setLoading(true);

      const code = otp.split("").join("");

      if (otp.length !== 4) {
        setError("OTP code must be 4 characters long");
        return;
      }

      const response = await axios.put(
        `${apiUrl}/verify/update`,
        {
          pin_0: code[0],
          pin_1: code[1],
          pin_2: code[2],
          pin_3: code[3],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );

      onSubmitSuccess(response?.data.message);
      handleUpdateSession();
    } catch (error: any) {
      console.error("Error updating verification:", error.response.data.error);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSendingOtp(true);

      const response = await axios.post(
        `${apiUrl}/verify/resend`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );
      toast.success(response?.data.message);
      toast.success("Resend the code");
      // Update lastOtpSentAt timestamp in localStorage
      localStorage.setItem("lastOtpSentAt", Date.now().toString());
      setResendTime(60000);
      const id = setInterval(() => {
        setResendTime((prev) => (prev ? prev - 1000 : null));
      }, 1000) as unknown as number;
      setTimerId(id);
    } catch (error: any) {
      console.error("Error resending verification:", error);
      toast.error(error.response.data.error);
    } finally {
      setSendingOtp(false);
    }
  };

  return (
    <form
      className="card shadow-md bg-base-200 flex flex-col items-center"
      ref={ref}
    >
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <OtpInput
        value={otp}
        onChange={(val) => {
          setOtp(val);
          setError("");
        }}
      />
      <button
        className="btn btn-primary mt-2"
        type="submit"
        onClick={handleSubmit}
        disabled={loading || sendingOtp}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
      <button
        className="btn btn-secondary mt-2"
        onClick={handleResend}
        disabled={sendingOtp || resendTime !== null}
      >
        {resendTime
          ? `Resend OTP (${Math.ceil(resendTime / 1000)})`
          : sendingOtp
          ? "Sending OTP..."
          : "Resend OTP"}
      </button>
    </form>
  );
};

export default OtpForm;
