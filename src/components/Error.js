import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();
  console.log("err -> ", err);

  return (
    <div id="error">
      <h2>{err}</h2>
      {console.log(err.message)}
      <h1>Ooops!!! Some went wrong!!!!!!</h1>
    </div>
  );
};

export default Error;
