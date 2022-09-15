import React, { useEffect } from "react";
import Router from "next/router";
import LoginLayout from "../components/LoginLayout";

export default function Index() {
  useEffect(() => {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push("/login");
    }
  });
}

Index.getLayout = function getLayout(Index) {
  return (
      <LoginLayout>{Index}</LoginLayout>
  )
}