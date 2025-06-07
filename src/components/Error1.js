import React from "react";
import { useRouteError } from "react-router";

const Error1 = () => {
  const err = useRouteError();
  console.log("err -> ", err);
  return <div>Error1</div>;
};

export default Error1;
