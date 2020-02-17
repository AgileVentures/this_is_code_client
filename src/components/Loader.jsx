import React from "react";
import { Loading } from "carbon-components-react";
import './loader.css'
const Loader = () => {
  return (
    <Loading
      active
      withOverlay={true}
      description="Active loading indicator"
      small={false}
      className='circle bx--loading__stroke'
    />
  );
};

export default Loader;
