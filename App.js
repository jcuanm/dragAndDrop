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

  /* Adding a row to the column */
  // addRow = (columnId, columnName) => {
  //   let {numRows, rows} = this.state.data[0];
  //   const layout = new Animated.ValueXY();
  //   const newRow = new Row(numRows, layout);
  //   //newRow.setRenderStatus(true);
  //   const panResponder = PanResponder.create({

	// 	  /* Indicate to OS that we want movement for this panresponder */
	// 	  onMoveShouldSetResponderCapture: () => true,

	// 	  /* Indicate to the OS that we want dragging movement */
	// 	  onMoveShouldSetPanResponderCapture : () => true,

	// 	  /* Set initial position */
	// 	  onPanResponderGrant: () => {
  //       this.currActiveRow = newRow;
  //       layout.setValue({x: 0, y: 0});
  //       console.log("Granted", this.currActiveRow.index);
	// 	  },

	// 	  /* On movement logic */
	// 	  onPanResponderMove : (e, gestureState) => {
  //       const lowerNeighbor = this.state.data[0].rows[newRow.index - 1];
  //       const higherNeighbor = this.state.data[0].rows[newRow.index + 1];
  //       let newYCoord = newRow.coords.y + gestureState.dy;
  //       let newXCoord = newRow.coords.x + gestureState.dx;
  
  //       if (newYCoord <= lowerNeighbor.coords.y && newXCoord == lowerNeighbor.coords.x){
  //         newRow.setRenderStatus()
  //         let newRowsList = this.swap(this.state.data[0].rows, newRow.index, newRow.index - 1);
          
  //         let updatedData = {
  //           id: columnId,
  //           name: columnName,
  //           numRows: numRows,
  //           rows: newRowsList
  //         }

  //         this.setState({
  //           data : [updatedData]
  //         });
  //       }

  //       Animated.event([null,{
	// 	      dx : layout.x,
	// 	      dy : layout.y
  //       }])(e, gestureState);
  //     },

	// 	  /* On release logic */
	// 	  onPanResponderRelease : (e, gesture) => {
  //       this.currActiveRow = null;
	// 		  Animated.spring(
  // 				layout,
  // 				{toValue:{x:0, y:0}}
	// 		  ).start();
  //       layout.flattenOffset();
  //       console.log("Released", this.currActiveRow);
  //       return true; 
  //     }
  //   });

  //   newRow.setPanResponder(panResponder);

  //   let updatedData = {
  //     id: columnId,
  //     name: columnName,
  //     numRows: ++numRows,
  //     rows: [...rows, newRow]
  //   }
    
  //   /* Update the state variable */
  //   this.setState({
  //     data : [updatedData]
  //   });
  // }

  // /* Swap two elements from the rows list */
  // swap(rowsList, index1, index2){
  //   console.log("Swap");
  //   let temp = rowsList[index1];
  //   rowsList[index1] = rowsList[index2];
  //   rowsList[index2] = temp;
  //   return rowsList;
  // }

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
      
      // <View>
      //   <View
      //     style={styles.dropZone}
      //   >
      //     <Text style={styles.text}>
      //       TODO List
      //     </Text>
      //     {this.state.data[0].rows.map( row => (
      //       this.renderDraggable(row)
      //     ))}

      //     <Button
      //       onPress={() => {
      //         this.addRow(1,1)
      //       }}
      //       title="Add item"
      //       style={styles.addBtn}
      //     />
      //   </View>
      // </View>
       
  }

  /* Renders the draggable item */
  // renderDraggable(row){
  //   if(row.shouldRender){
  //     console.log("Renderdraggable");
  //     this.state.data[0].rows[row.index].setRenderStatus(false);
  //     return (
  //       <View 
  //         key={row.index} 
  //         style={styles.draggableContainer}
  //         onLayout={({ nativeEvent}) => {
  //           row.setCoords(nativeEvent.layout.x, nativeEvent.layout.y);
  //         }}
  //       >
  //         <Animated.View 
  //           {...row.panResponder.panHandlers}
  //           style={[row.layout.getLayout(), 
  //           styles.rectangle]}
  //         >
  //           <Text style={styles.text}>Row {row.index}</Text>
  //         </Animated.View>
  //       </View>
  //     );
  //   }
  // }
}
