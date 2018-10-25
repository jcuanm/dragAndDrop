import React, {Component} from "react";
import {
    View,
    Text,
    Animated,
    PanResponder,
} from 'react-native';

class Row extends Component{
    constructor(props){
        super(props);
        //this.currIndex = this.props.index;
        //this.lowerNeighbor = this.props.rows[this.props.index - 1];
        //this.panResponder = this.setPanResponder(this.props.layout);
    }

    shouldComponentUpdate(nextProps){
        // console.log("Curr Row Index: ", this.props.index);
        // console.log("Next Row Index: ", nextProps.index);
        // console.log("Bool: ", this.props.index !== nextProps.index);
        return this.props.name !== nextProps.name;
    }
    
    // setPanResponder(layout){
    //     const panResponder = PanResponder.create({

    //         /* Indicate to OS that we want movement for this panresponder */
    //         onMoveShouldSetResponderCapture: () => true,

    //         /* Indicate to the OS that we want dragging movement */
    //         onMoveShouldSetPanResponderCapture : () => true,

    //         /* Set initial position */
    //         onPanResponderGrant: () => {
    //             console.log("Granted");
    //             console.log(this.props.rows);
    //             console.log(this.props.name);
    //             layout.setValue({x: 0, y: 0});      
    //         },

    //         /* On movement logic */
    //         onPanResponderMove : (e, gestureState) => {
                
    //             const currIndex = this.props.index;
    //             const lowerNeighbor = this.props.rows[currIndex - 1];
    //             // const higherNeighbor = this.state.data[0].rows[newRow.index + 1];
                
    //             let newXCoord = this.props.rows[currIndex].coords.x + gestureState.dx;
    //             let newYCoord = this.props.rows[currIndex].coords.y + gestureState.dy;
    //             console.log(newXCoord, newYCoord, lowerNeighbor.coords);

    //             if (this.shouldSwap(newXCoord, newYCoord, lowerNeighbor)){
    //                 let newRowsList = this.swap(this.props.rows, currIndex - 1,  currIndex);
    //                 gestureState.dy = 0;
    //                 this.props.updateRows(newRowsList);
    //             }

    //             Animated.event([null,{
    //                 dx : layout.x,
    //                 dy : layout.y
    //             }])(e, gestureState);
    //         },

    //         /* On release logic */
    //         onPanResponderRelease : (e, gesture) => {
    //             this.isActive = false;
    //             this.currActiveRow = null;
    //             Animated.spring(
    //                 layout,
    //                 {toValue:{x:0, y:0}}
    //             ).start();
    //             layout.flattenOffset();
    //             return true; 
    //         }
    //     });

    //     return panResponder
    // }

    setCoords(x, y) {
        this.props.rows[this.props.index].coords = {x: x, y: y};
    }

    /* Swapping the properties of two elements from the rows list (we are NOT swapping the elements themeselves) */
    // swap(rowsList, index1, index2){
    //     console.log("Swap");
    //     // rowsList[index1].index = index2;
    //     // rowsList[index2].index = index1;
        
    //     // let tempCoords = rowsList[index1].coords;
    //     // rowsList[index1].coords = rowsList[index2].coords;
    //     // rowsList[index2].coords = tempCoords;

    //     let tempName = rowsList[index1].name;
    //     rowsList[index1].name = rowsList[index2].name;
    //     rowsList[index2].name = tempName;

    //     let tempLayout = rowsList[index1].layout;
    //     rowsList[index1].layout = rowsList[index2].layout;
    //     rowsList[index2].layout = tempLayout;
        
    //     // let temp = rowsList[index1]
    //     // rowsList[index1] = rowsList[index2];
    //     // rowsList[index2] = temp;

    //     console.log(rowsList);
    //     return rowsList;
    // }

    // shouldSwap(newXCoord, newYCoord, lowerNeighbor){
    //     return newXCoord == lowerNeighbor.coords.x && newYCoord == lowerNeighbor.coords.y;
    // }

    render(){
        console.log("Rendering Row: ", this.props.index);
        
        return (
            <View 
                key={this.props.index} 
                style={styles.draggableContainer}
                onLayout={({ nativeEvent}) => {
                    this.setCoords(nativeEvent.layout.x, nativeEvent.layout.y);
                    this.props.updateCoords(this.props.name, this.props.rows[this.props.index].coords);
                }}
            >
                <Animated.View 
                    {...this.props.panResponder.panHandlers}
                    style={[
                        this.props.layout.getLayout(), 
                        styles.rectangle
                    ]}
                >
                    <Text style={styles.text}> {this.props.name}</Text>
                </Animated.View>
            </View>
        );
    }
    
}

export default Row;