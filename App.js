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

    /* Initializing this view's state values */
    this.state = {
      pan : [new Animated.ValueXY(), new Animated.ValueXY()]//new Animated.ValueXY()
    };

    /* Pan Handler for drag-and-drop functionality */
    panResponder1 = PanResponder.create({

      /* Indicate to OS that we want movement for this panresponder */
      onMoveShouldSetResponderCapture: () => true,

      /* Indicate to the OS that we want dragging movement */
      onMoveShouldSetPanResponderCapture : () => true,

      /* Set initial position */
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan[0].setValue({x: 0, y: 0});
      },

      /* On movement logic */
      onPanResponderMove : Animated.event([null,{
        dx : this.state.pan[0].x,
        dy : this.state.pan[0].y 
      }]),

      /* On release logic */
      onPanResponderRelease : (e, gesture) => {
          Animated.spring(
            this.state.pan[0],
            {toValue:{x:0, y:0}}
          ).start();
        this.state.pan[0].flattenOffset();
        return true;
      }
    });

    panResponder2 = PanResponder.create({

      /* Indicate to OS that we want movement for this panresponder */
      onMoveShouldSetResponderCapture: () => true,

      /* Indicate to the OS that we want dragging movement */
      onMoveShouldSetPanResponderCapture : () => true,

      /* Set initial position */
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan[1].setValue({x: 0, y: 0});
      },

      /* On movement logic */
      onPanResponderMove : Animated.event([null,{
        dx : this.state.pan[1].x,
        dy : this.state.pan[1].y 
      }]),

      /* On release logic */
      onPanResponderRelease : (e, gesture) => {
          Animated.spring(
            this.state.pan[1],
            {toValue:{x:0, y:0}}
          ).start();
        this.state.pan[1].flattenOffset();
        return true;
      }
    });

    this.panResponders = [panResponder1, panResponder2];
  }

  render() {
    return (
             <View>
               <View
                 style={styles.dropZone}>
                 <Text style={styles.text}>TODO List</Text>
                 {this.state.pan.map( (pan, index) => (
                    this.renderDraggable(pan, this.panResponders[index])
                 ))}
                 <Button
                   title="Add item"
                   style={styles.addBtn}/>
               </View>

             </View>
    );
  }

  /* Renders the draggable item */
  renderDraggable(pan, panResponder){
        return (
            <View style={styles.draggableContainer}>
                <Animated.View 
                    {...panResponder.panHandlers}
                    style={[pan.getLayout(), styles.rectangle]}>
                    <Text style={styles.text}>This is an item</Text>
                </Animated.View>
            </View>
        );
  }
}
