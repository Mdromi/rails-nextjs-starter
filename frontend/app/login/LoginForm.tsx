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

  useEffect(() => {
    if (currentUser && !currentUser.verified) {
      router.push("/register");
      router.refresh();
    }
    if (currentUser && currentUser.verified) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      // Simulate a delay (e.g., for loading spinner visibility)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const signInResult = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (signInResult?.ok) {
        toast.success("Logged In");
        router.refresh();
      } else {
        toast.error(signInResult?.error || "Failed to log in");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toastMessage = () => {
    toast.error("Working on OAuth functionality");
  };

  if (currentUser && currentUser.verified) {
    return (
      <p className="text-center text-slate-100">Looged in, Retruning...</p>
    );
  }

  return (
    <>
      <Heading title="Login Rails Nextjs Starter" />
      <Button
        outline
        label="Continue  with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          // signIn("google");
          toastMessage();
        }}
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
      <p className="text-sm text-slate-100">
        Do not have an account?{" "}
        <Link className="underline" href={"/register"}>
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
