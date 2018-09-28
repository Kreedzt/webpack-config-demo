import React, {Component} from "react";
import style from './index.scss';
// import style from './test.css';
console.log(style);
import img from './index.jpg';
console.log(img);

class Index extends Component {
  render() {
    return <h1 className={style.red}>
      Hello, webpack
      <img src={img} alt=""/>
      <div className={style.bg}>test-bg</div>
    </h1>
  }
}

export default Index;