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
        this.isActive = false;
        this.panResponder = this.setPanResponder(this.props.layout);
    }

    shouldComponentUpdate(nextProps){
        return (this.props.index !== nextProps.index); //&& !this.isActive;
    }
    
    setPanResponder(layout){
        const panResponder = PanResponder.create({

            /* Indicate to OS that we want movement for this panresponder */
            onMoveShouldSetResponderCapture: () => true,

            /* Indicate to the OS that we want dragging movement */
            onMoveShouldSetPanResponderCapture : () => true,

            /* Set initial position */
            onPanResponderGrant: () => {
                console.log("Granted");
                this.isActive = true;
                layout.setValue({x: 0, y: 0});      
            },

            /* On movement logic */
            onPanResponderMove : (e, gestureState) => {
                
                const currIndex = this.props.index;
                const lowerNeighbor = this.props.rows[currIndex - 1];
                // const higherNeighbor = this.state.data[0].rows[newRow.index + 1];
                
                let newXCoord = this.props.rows[currIndex].coords.x + gestureState.dx;
                let newYCoord = this.props.rows[currIndex].coords.y + gestureState.dy;
                console.log(newXCoord, newYCoord, lowerNeighbor.coords);

                if (this.shouldSwap(newXCoord, newYCoord, lowerNeighbor)){
                    let newRowsList = this.swap(this.props.rows, currIndex,  currIndex - 1);
                    gestureState.dy = 0;
                    this.props.updateRows(newRowsList);
                }

                Animated.event([null,{
                        dx : layout.x,
                        dy : layout.y
                }])(e, gestureState);
            },

            /* On release logic */
            onPanResponderRelease : (e, gesture) => {
                this.isActive = false;
                this.currActiveRow = null;
                Animated.spring(
                    layout,
                    {toValue:{x:0, y:0}}
                    ).start();
                layout.flattenOffset();
                return true; 
            }
        });

        return panResponder
    }

    setCoords(x, y) {
        this.props.rows[this.props.index].coords = {x: x, y: y};
    }

    /* Swap two elements from the rows list */
    swap(rowsList, index1, index2){
        console.log("Swap");
        // rowsList[index1].index = index2;
        // rowsList[index2].index = index1;
        // console.log(rowsList);

        let tempCoords = rowsList[index1].coords;
        rowsList[index1].coords = rowsList[index2].coords;
        rowsList[index2].coords = tempCoords;
        console.log(rowsList);
        
        let temp = rowsList[index1]
        rowsList[index1] = rowsList[index2];
        rowsList[index2] = temp;

        console.log(rowsList);
        return rowsList;
    }

    shouldSwap(newXCoord, newYCoord, lowerNeighbor){
        return newXCoord == lowerNeighbor.coords.x && newYCoord == lowerNeighbor.coords.y;
    }

    render(){
        console.log("Rendering Row: ", this.props.index);
        
        return (
            <View 
                key={this.props.index} 
                style={styles.draggableContainer}
                onLayout={({ nativeEvent}) => {
                    this.setCoords(nativeEvent.layout.x, nativeEvent.layout.y);
                }}
            >
                <Animated.View 
                    {...this.panResponder.panHandlers}
                    style={[
                        this.props.layout.getLayout(), 
                        styles.rectangle
                    ]}
                >
                    <Text style={styles.text}>Row {this.props.index}</Text>
                </Animated.View>
            </View>
        );
    }
    
}

export default Row;