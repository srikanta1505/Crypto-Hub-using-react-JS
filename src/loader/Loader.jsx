import { Fragment } from "react";
import "./loader.css";
const Loader = () => {
  return (
    <Fragment>
      <div className=" flex justify-center items-center bg-slate-300 h-screen">
        <div id="loader"></div>
      </div>
    </Fragment>
  );
};

export default Loader;
