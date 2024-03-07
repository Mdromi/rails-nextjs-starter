"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import { signIn } from "next-auth/react";
import Heading from "../components/Heading";
import Input from "../components/Input";

const LoginForm = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

//   useEffect(() => {
//     if (currentUser) {
//       router.push("/cart");
//       router.refresh();
//     }
//   }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      // Simulate a delay (e.g., for loading spinner visibility)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const signInResult = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log("signInResult", signInResult);
      

      if (signInResult?.ok) {
        // Redirect using router only after successful signIn
        // router.push("/");
        // router.refresh();
        toast.success("Logged In");
      } else {
        // Log the signInResult to see the error details
        // console.error("Sign In Error:", signInResult);
        toast.error("Failed to log in");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return <p className="text-center text-slate-100">Looged in, Retruning...</p>;
  }

  return (
    <>
      <Heading title="Login Rails Nextjs Starter" />
      <Button
        outline
        label="Continue  with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
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
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account?{" "}
        <Link className="underline" href={"/register"}>
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
