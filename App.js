import React, {Component} from "react";
import Board from "./src/components/Board";

export default class App extends Component {
  render() {
    console.log("Rendering Board");

    return ( <Board /> ); 
  }
}