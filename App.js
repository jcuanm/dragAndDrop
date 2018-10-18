import React, {Component} from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  Button,
} from 'react-native';
import styles from './dragAndDropStyles'

export default class App extends Component {
  constructor(props){
    super(props);

    // data will be a list of objects representing columns
    this.state = {
      data : [
        {
          id: 1,
          name: 'Column1',
          pan: [new Animated.ValueXY()], // Start off with one Animated object to avoid "one-off" error in addItem()
          panResponders : [] 
        }
      ],
    };
  }

  /* Adding an item to the item column */
  addItem = (columnId, columnName) => {
    const {pan, panResponders} = this.state.data[0];
    const panResponder = PanResponder.create({

		  /* Indicate to OS that we want movement for this panresponder */
		  onMoveShouldSetResponderCapture: () => true,

		  /* Indicate to the OS that we want dragging movement */
		  onMoveShouldSetPanResponderCapture : () => true,

		  /* Set initial position */
		  onPanResponderGrant: (e, gestureState) => {
        pan[pan.length - 1].setValue({x: 0, y: 0});
		  },

		  /* On movement logic */
		  onPanResponderMove : (e, gestureState) => {
        Animated.event([null,{
		      dx : pan.length > 0 ? pan[pan.length - 1].x : 0,
		      dy : pan.length > 0 ? pan[pan.length - 1].y : 0
		    }])(e, gestureState);
      },

		  /* On release logic */
		  onPanResponderRelease : (e, gesture) => {
			  Animated.spring(
  				pan[pan.length - 1],
  				{toValue:{x:0, y:0}}
			  ).start();
          pan[pan.length - 1].flattenOffset();
          return true;
		  }
    });

    updatedData = {
      id: columnId,
      name: columnName,
      pan: [...pan, new Animated.ValueXY()],
      panResponders : [...panResponders, panResponder]
    }
    
    /* Update the state variable */
    this.setState({
      data : [updatedData]
      //pan : [...pan, new Animated.ValueXY()],
      //panResponders : [...panResponders, panResponder]
    });
  }

  /* Render all of the components of the View */
  render() {
    console.log(this.state.data[0]);
    return (
      <View>
        <View
          style={styles.dropZone}
        >
          <Text style={styles.text}>
            TODO List
          </Text>
          {this.state.data[0].panResponders.map( (_, index) => (
            this.renderDraggable(this.state.data[0].pan[index], index)
          ))}

          <Button
            onPress={this.addItem}
            title="Add item"
            style={styles.addBtn}
          />
        </View>
      </View>
    );
  }

  /* Renders the draggable item */
  renderDraggable(pan,index){
    console.log("ReRENDER")
    return (
      <View key={index} style={styles.draggableContainer}>
        <Animated.View 
          {...this.state.data[0].panResponders[index].panHandlers}
          style={[pan.getLayout(), styles.rectangle]}>
          <Text style={styles.text}>This is an item</Text>
        </Animated.View>
      </View>
    );
  }
}
