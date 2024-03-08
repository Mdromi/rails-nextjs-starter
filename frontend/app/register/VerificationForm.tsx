"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Input";
import { SafeUser } from "@/types";
import { useEffect } from "react";
import OtpForm from "./OtpForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const VerificationForm = ({
  currentUser,
}: {
  currentUser: SafeUser | null;
}) => {
  const router = useRouter();
  if (!currentUser) {
    // toast.error("You are not loged in. please loged in");
    // router.push("/login");
    // router.refresh();
  }

  useEffect(() => {
    if (currentUser && currentUser.verified) {
      toast.success("You Are Already verified");
      router.push("/");
      router.refresh();
    }
  }, [currentUser]);
  return (
    <SessionProvider>
      <div className="text-slate-100 text-center">
        <Heading title="Verify Your Email" center />
        <div>
          <div className="">
            <div className="my-2">
              <p className="text-sm text-base-content/80">
                {" "}
                Enter verification code sent your email:{" "}
              </p>
            </div>
            <OtpForm currentUser={currentUser} />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default VerificationForm;
