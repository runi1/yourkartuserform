import React, { FC,useContext } from "react";
import { json } from "stream/consumers";
import UserForm from "../UserForm";

type Layoutprops = {};

const Layout: FC<Layoutprops> = ({ children, ...props }) => {
  return (
    <>
      <header>
        {" "}
        <h1> Enter your details </h1>
      </header>
      <body>
        <UserForm {...{ name: "", age: "0", phonenumber: "",email:"" }} />
        <main>{children}</main>
       
      </body>
    </>
  );
};

export default Layout;
