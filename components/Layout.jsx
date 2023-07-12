import React from "react";
import Heading from "@/components/Heading";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();

  const path = router.pathname;

  return (
    <div className=" grid grid-cols-12 grid-rows-6 h-full w-full bg-primaryBg">
      <Heading />
      <SideBar />
      {children}
    </div>
  );
}

export default Layout;
