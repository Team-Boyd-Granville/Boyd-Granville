import React, { useEffect } from "react";
import  { signOut } from "next-auth/react"

export default function Logout() {
    useEffect(() => {
    signOut({ callbackUrl: `/login` })
  });
}