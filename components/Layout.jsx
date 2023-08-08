import React from "react";
import SideNav from "./SideNav";
import Heading from "./Heading";


function Layout({ children }) {

  return (
    <div className="grid grid-cols-12 grid-rows-6 h-full w-full font-bioRhyme">
      <Heading />
      <SideNav />
      {children}
    </div>
  );
}

export default Layout;
