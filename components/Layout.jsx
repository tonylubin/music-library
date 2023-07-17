import React from "react";
import Heading from "@/components/Heading";
import SideBar from "@/components/SideBar";


function Layout({ children }) {

  return (
    <div className="grid grid-cols-12 grid-rows-6 h-full w-full">
      <Heading />
      <SideBar />
      {children}
    </div>
  );
}

export default Layout;
