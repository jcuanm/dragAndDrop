import React, {Component} from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  Button,
} from 'react-native';
import Row from './Row';
import styles from './dragAndDropStyles';

export default class App extends Component {
  constructor(props){
    super(props);

    /* The state's data entry will be a list of objects representing columns */
    this.state = {
      data : [
        {
          id: 1,
          name: 'Column1',
          numRows: 0,
          rows: []
        }
      ],
    };
  }

  /* Adding an item to the item column */
  addItem = (columnId, columnName) => {
    let {numRows, rows} = this.state.data[0];
    const layout = new Animated.ValueXY();
    const panResponder = PanResponder.create({

		  /* Indicate to OS that we want movement for this panresponder */
		  onMoveShouldSetResponderCapture: () => true,

		  /* Indicate to the OS that we want dragging movement */
		  onMoveShouldSetPanResponderCapture : () => true,

		  /* Set initial position */
		  onPanResponderGrant: (e, gestureState) => {
        layout.setValue({x: 0, y: 0});
		  },

		  /* On movement logic */
		  onPanResponderMove : (e, gestureState) => {
        Animated.event([null,{
		      dx : layout.x,
		      dy : layout.y
		    }])(e, gestureState);
      },

		  /* On release logic */
		  onPanResponderRelease : (e, gesture) => {
			  Animated.spring(
  				layout,
  				{toValue:{x:0, y:0}}
			  ).start();
          layout.flattenOffset();
          return true;
		  }
    });

    const newRow = new Row(numRows, layout, panResponder);

    updatedData = {
      id: columnId,
      name: columnName,
      numRows: ++numRows,
      rows: [...rows, newRow]
    }
    
    /* Update the state variable */
    this.setState({
      data : [updatedData]
    });
  }

  /* Render all of the components of the View */
  render() {
    return (
      <View>
        <View
          style={styles.dropZone}
        >
          <Text style={styles.text}>
            TODO List
          </Text>
          {this.state.data[0].rows.map( row => (
            this.renderDraggable(row)
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
  renderDraggable(row){
    console.log("ReRENDER")
    return (
      <View key={row.index} style={styles.draggableContainer}>
        <Animated.View 
          {...row.panResponder.panHandlers}
          style={[row.layout.getLayout(), styles.rectangle]}>
          <Text style={styles.text}>Row {row.index}</Text>
        </Animated.View>
      </View>
    );
  }
}
