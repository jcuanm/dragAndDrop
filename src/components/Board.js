import React, {Component} from "react";
import {ScrollView, View, Animated} from 'react-native';
import Column from './Column';
import ViewOverflow from 'react-native-view-overflow';
const AnimatedViewOverflow = Animated.createAnimatedComponent(ViewOverflow);

export default class Board extends Component {
  constructor(props){
    super(props);

    this.scroll = this.scroll.bind(this);
    this.toggleScroll = this.toggleScroll.bind(this);

    /* The state's data entry will be a list of objects representing columns */
    this.state = {
      shouldscroll: true,
      columns: [
        {
          id: 0,
          name: "Column 0" 
        },

        {
          id: 1,
          name: "Column 1" 
        },

        {
          id: 2,
          name: "Column 2" 
        },
      ],
    };
  }

  scroll(x, y){
    this.scroller.scrollTo({x: x + 100, y: 0});
  }

  toggleScroll(isScrolling){
    const scrollingState = isScrolling ? false : true;
    this.setState({shouldscroll: scrollingState});
  }

  /* Render all of the components of the View */
  render() {
    console.log("Rendering Board");

    return (
      <ScrollView
        horizontal
        scrollEnabled={this.state.shouldscroll}
        ref={scroller => {this.scroller = scroller}}
      >
        
        {this.state.columns.map( column => ( 
          <Column
            key={column.id}
            id={column.id}
            name={column.name}
            scroll={this.scroll}
            toggleScroll={this.toggleScroll}
          />  
        ))}
        
      </ScrollView>
    ); 
  }
}
