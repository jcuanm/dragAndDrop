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
    this.currActiveRow = null;

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

  /* Adding a row to the column */
  addRow = (columnId, columnName) => {
    //console.log(columnId, columnName)
    let {numRows, rows} = this.state.data[0];
    const layout = new Animated.ValueXY();
    const newRow = new Row(numRows, layout);
    const panResponder = PanResponder.create({

		  /* Indicate to OS that we want movement for this panresponder */
		  onMoveShouldSetResponderCapture: () => true,

		  /* Indicate to the OS that we want dragging movement */
		  onMoveShouldSetPanResponderCapture : () => true,

		  /* Set initial position */
		  onPanResponderGrant: () => {
        this.currActiveRow = newRow;
        layout.setValue({x: 0, y: 0});
        console.log(this.state.data[0].rows);
        console.log("Granted", this.currActiveRow.index);
		  },

		  /* On movement logic */
		  onPanResponderMove : (e, gestureState) => {
        //console.log(gestureState.moveX, gestureState.moveY);
        console.log("Moving", this.currActiveRow.index, newRow.coords);
        Animated.event([null,{
		      dx : layout.x,
		      dy : layout.y
        }])(e, gestureState);
      },

		  /* On release logic */
		  onPanResponderRelease : (e, gesture) => {
        this.currActiveRow = null;
			  Animated.spring(
  				layout,
  				{toValue:{x:0, y:0}}
			  ).start();
        layout.flattenOffset();
        console.log("Released", this.currActiveRow);
        return true; 
      }
    });

    newRow.setPanResponder(panResponder);

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
            onPress={() => {
              this.addRow(1,1)
            }}
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
      <View 
        key={row.index} 
        style={styles.draggableContainer}
        onLayout={({ nativeEvent}) => {
          row.setCoords(nativeEvent.layout.x, nativeEvent.layout.y);
        }}
      >
        <Animated.View 
          {...row.panResponder.panHandlers}
          style={[row.layout.getLayout(), 
          styles.rectangle]}
        >
          <Text style={styles.text}>Row {row.index}</Text>
        </Animated.View>
      </View>
    );
  }
}
