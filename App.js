import React, {Component} from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  Button,
} from 'react-native';
import Column from './Column';
import styles from './dragAndDropStyles';

export default class App extends Component {
  constructor(props){
    super(props);
    //this.currActiveRow = null;

    /* The state's data entry will be a list of objects representing columns */
    this.state = {
      columns : [],
    };
  }

  /* Render all of the components of the View */
  render() {
    console.log("Render");

    return (
      <View>
        <Column
          id={0}
          name={"Column0"}
        />
      </View>
    ); 
  }
}
