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
      pan : [],
      panResponders : []
    };

  }

    addItem = () => {
      
      const {pan, panResponders} = this.state;
      const panResponder = PanResponder.create({

			  /* Indicate to OS that we want movement for this panresponder */
			  onMoveShouldSetResponderCapture: () => true,

			  /* Indicate to the OS that we want dragging movement */
			  onMoveShouldSetPanResponderCapture : () => true,

			  /* Set initial position */
			  onPanResponderGrant: (e, gestureState) => {
				this.state.pan[this.state.pan.length - 1].setValue({x: 0, y: 0});
			  },

			  /* On movement logic */
			  onPanResponderMove : Animated.event([null,{
				dx : pan.length ? pan[pan.length - 1].x : 0,
				dy : pan.length ? pan[pan.length - 1].y : 0
			  }]),

			  /* On release logic */
			  onPanResponderRelease : (e, gesture) => {
				  Animated.spring(
					this.state.pan[pan.length - 1],
					{toValue:{x:0, y:0}}
				  ).start();
				pan[pan.length - 1].flattenOffset();
				return true;
			  }
      });
  
      //this.panResponders.push(panResponder);
      this.setState({
        pan : [...this.state.pan, new Animated.ValueXY()],
        panResponders : [...this.state.panResponders, panResponder]
      });
    }

  render() {
    return (
             <View>
               <View
                 style={styles.dropZone}>
                 <Text style={styles.text}>TODO List</Text>
                 {this.state.pan.length > 0 && this.state.panResponders.length > 0 && this.state.pan.map( (pan, index) => (
                    this.renderDraggable(pan, this.state.panResponders[index])
                 ))}
                 <Button
                   onPress={this.addItem}
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
