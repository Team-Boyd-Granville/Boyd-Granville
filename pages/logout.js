/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import  { signOut } from "next-auth/react"

export default function logout() {
    useEffect(() => {
    signOut({ callbackUrl: `/login` })
  });
}