import React, { useState } from "react";
import { Metadata } from "next";
import SignInComponent from "@/components/auth/signin";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

const SignIn: React.FC = () => {
  return (
    <SignInComponent />
  );
};

export default SignIn;
