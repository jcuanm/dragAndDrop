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
        this.panResponder = this.setPanResponder(this.props.layout);
        this.coords = {x: null, y: null};
    }

    shouldComponentUpdate(nextProps){
        return this.props.index !== nextProps.index;
    }
    
    setPanResponder(layout){
        const panResponder = PanResponder.create({

            /* Indicate to OS that we want movement for this panresponder */
            onMoveShouldSetResponderCapture: () => true,

            /* Indicate to the OS that we want dragging movement */
            onMoveShouldSetPanResponderCapture : () => true,

            /* Set initial position */
            onPanResponderGrant: () => {
                console.log("Granted", this.props.rows);
                //this.currActiveRow = newRow;
                layout.setValue({x: 0, y: 0});      
            },

            /* On movement logic */
            onPanResponderMove : (e, gestureState) => {
                console.log(this.coords.x + gestureState.dx, this.coords.y + gestureState.dy);
                // const lowerNeighbor = this.state.data[0].rows[newRow.index - 1];
                // const higherNeighbor = this.state.data[0].rows[newRow.index + 1];
                // let newYCoord = newRow.coords.y + gestureState.dy;
                // let newXCoord = newRow.coords.x + gestureState.dx;

                // if (newYCoord <= lowerNeighbor.coords.y && newXCoord == lowerNeighbor.coords.x){
                //     newRow.setRenderStatus()
                //     let newRowsList = this.swap(this.state.data[0].rows, newRow.index, newRow.index - 1);
                    
                //     let updatedData = {
                //     id: columnId,
                //     name: columnName,
                //     numRows: numRows,
                //     rows: newRowsList
                //     }

                //     this.setState({
                //     data : [updatedData]
                //     });
                // }

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
                return true; 
            }
        });

        return panResponder
    }

    setCoords(x, y) {
        this.coords.x = x;
        this.coords.y = y;
    }

    /* Swap two elements from the rows list */
    swap(rowsList, index1, index2){
        console.log("Swap");
        let temp = rowsList[index1];
        rowsList[index1] = rowsList[index2];
        rowsList[index2] = temp;
        return rowsList;
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
                    style={[this.props.layout.getLayout(), 
                    styles.rectangle]}
                >
                    <Text style={styles.text}>Row {this.props.index}</Text>
                </Animated.View>
            </View>
        );
    }
    
}

export default Row;