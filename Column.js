import React, {Component} from "react";
import {
    View,
    Text,
    PanResponder,
    Animated,
    Button,
} from 'react-native';
import Row from "./Row";

class Column extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            rows: []
        }
    }

    addRow(){
        //let {numRows, rows} = this.props.rows;
        const layout = new Animated.ValueXY();
        //const newRow = new Row(numRows, layout);
        //newRow.setRenderStatus(true);
        const panResponder = PanResponder.create({

            /* Indicate to OS that we want movement for this panresponder */
            onMoveShouldSetResponderCapture: () => true,

            /* Indicate to the OS that we want dragging movement */
            onMoveShouldSetPanResponderCapture : () => true,

            /* Set initial position */
            onPanResponderGrant: () => {
                //this.currActiveRow = newRow;
                layout.setValue({x: 0, y: 0});
                //console.log("Granted", this.currActiveRow.index);
            },

            /* On movement logic */
            onPanResponderMove : (e, gestureState) => {
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
                //console.log("Released", this.currActiveRow);
                return true; 
            }
        });

        //newRow.setPanResponder(panResponder);

        // let updatedData = {
        //     id: columnId,
        //     name: columnName,
        //     numRows: ++numRows,
        //     rows: [...rows, newRow]
        // }
        const newRow = {
            index: this.state.rows.length,
            layout: layout,
            panResponder: panResponder
        }

        /* Update the state variable */
        this.setState({
            rows : [...this.state.rows, newRow]
        });
    }

    render(){
        return (
            <View>
                <View
                    style={styles.dropZone}
                >
                    <Text 
                        style={styles.text}
                    >
                        TODO List
                    </Text>
                     
                    {this.state.rows.map( row => (
                        //this.renderDraggable(row)
                        <Row
                            key={row.index}
                            index={row.index}
                            layout={row.layout}
                            panResponder={row.panResponder}
                        />
                    ))}

                    <Button
                        onPress={() => {
                        this.addRow()
                        }}
                        title="Add item"
                        style={styles.addBtn}
                    />
                </View>
            </View>
        )
    }
}

export default Column;