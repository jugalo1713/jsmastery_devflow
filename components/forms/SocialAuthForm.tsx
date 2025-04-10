"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import ROUTES from "@/constants/routes";
import { signIn } from "next-auth/react";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 px-4 py-3.5";
  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        redirect: false,
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      toast({
        title: "Sign-in Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign-in.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src={"/icons/github.svg"}
          className="invert-colors mr-2.5 object-contain"
          alt="Github logo"
          width={20}
          height={20}
        />
        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src={"/icons/google.svg"}
          className="mr-2.5 object-contain"
          alt="Google logo"
          width={20}
          height={20}
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};
export default SocialAuthForm;
