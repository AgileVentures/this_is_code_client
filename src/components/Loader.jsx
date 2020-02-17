import React from "react";
import { Loading } from "carbon-components-react";
const Loader = () => {
  return (
    <Loading
      active
      withOverlay={true}
      description="Active loading indicator"
      small={false}
    />
  );
};

export default Loader;
