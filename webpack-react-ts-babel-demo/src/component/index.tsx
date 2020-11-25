import React, { SFC } from "react";
import "./style/index.scss";
import feng from '../assets/feng.jpg';

const Index: SFC = () => {
  return (
    <div className="index">
      TypeScript Babel Effected.
      <img
        alt=""
        src={feng}
        style={{
          width: 200
        }}
      />
    </div>
  );
};

export default Index;
