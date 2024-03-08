"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import Heading from "../components/Heading";
import Input from "../components/Input";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser && currentUser.verified) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
  
      const signupResult = await axios.post(`${apiUrl}/signup`, {
        user: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });
  
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
  
      if (signInResult?.ok) {
        // Redirect using router only after successful signIn
        toast.success("Account Created");
        toast.success(
          "Verification code sent to your email. Please check your inbox."
        );
        router.refresh();
      }
    } catch (error: any) {
      console.error("Registration Error:", error);
      // Update form errors based on the error received from the API
      if (error.response?.data) {
        const apiErrors = error.response.data.status;
        toast.error(apiErrors.message);
      }
     
    } finally {
      setIsLoading(false);
    }
  };
  

  if (currentUser) {
    return <p className="text-center">Looged in, Retruning...</p>;
  }

  return (
    <>
      <Heading title="Sign up for Rails Nextjs Starter" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn("google")}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href={"/login"}>
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
