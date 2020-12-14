import React, { SFC } from "react";
import "./style/index.scss";
import feng from '../assets/feng.jpg';

const a = '1'; // 类型检测

const Index: SFC = () => {

  const fn = () => {
    // 此处类型检测应该生效
     return a === 2;
  };

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
