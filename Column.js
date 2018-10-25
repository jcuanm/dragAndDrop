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
        this.rowsMetaData = {};
        this.state = {
            rows: []
        }
        this.updateRows = this.updateRows.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
    }

    /* Add a new row to the column */
    addRow(){
        const layout = new Animated.ValueXY();
        let currIndex = this.state.rows.length;
        const name = "Row" + currIndex;
        this.rowsMetaData[name] = {
            index: currIndex,
            coords: null,
        }
        //let lowerNeighbor = this.state.rows[length - 1];
       
        const panResponder = PanResponder.create({

            /* Indicate to OS that we want movement for this panresponder */
            onMoveShouldSetResponderCapture: () => true,

            /* Indicate to the OS that we want dragging movement */
            onMoveShouldSetPanResponderCapture : () => true,

            /* Set initial position */
            onPanResponderGrant: () => {
                console.log("Granted");
                console.log("Row ", currIndex);
                console.log("MetaData: ", this.rowsMetaData);
                console.log("Rows: ", this.state.rows);
                layout.setValue({x: 0, y: 0});
            },

            /* On movement logic */
            onPanResponderMove : (e, gestureState) => {
                let rows = Object.assign([], this.state.rows); // Deep copy the state's rows ***Unnecessary ***

                currIndex = this.rowsMetaData[name].index;
                let lowerNeighbor = rows[currIndex - 1];
                
                // const higherNeighbor = this.state.data[0].rows[newRow.index + 1];
            
                let newXCoord = this.rowsMetaData[name].coords.x + gestureState.dx;
                let newYCoord = this.rowsMetaData[name].coords.y + gestureState.dy;
                console.log(newXCoord, newYCoord, lowerNeighbor.coords, lowerNeighbor);

                if (this.shouldSwap(newXCoord, newYCoord, lowerNeighbor)){
                    let newRowsList = this.swap(rows, currIndex - 1,  currIndex, rows[currIndex - 1].name, name);
                    gestureState.dy = 0;
                    this.setState({ rows : newRowsList });
                }

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

        const newRow = {
            index: this.rowsMetaData[name].index,
            layout: layout,
            name: name,
            panResponder: panResponder,
            coords: {x: null, y: null} // We set coords after the Row component is rendered
        }

        this.setState({
            rows : [...this.state.rows, newRow]
        });
    }

    /* Swapping the properties of two elements from the rows list (we are NOT swapping the elements themeselves) */
    swap(rowsList, index1, index2, name1, name2){
        console.log("Swap");
        //console.log(rowsList);
        // rowsList[index1].index = index2;
        // rowsList[index2].index = index1;
        console.log(index1, index2, name1, name2);
        let tempCoords = this.rowsMetaData[name1].coords;
        this.rowsMetaData[name1].coords = this.rowsMetaData[name2].coords;
        this.rowsMetaData[name2].coords = tempCoords;

        this.rowsMetaData[name1].index = index2;
        this.rowsMetaData[name2].index = index1;
        
        //console.log(this.rowsMetaData[name1].coords, this.rowsMetaData[name2].coords)
        // let tempName = rowsList[index1].name;
        // rowsList[index1].name = rowsList[index2].name;
        // rowsList[index2].name = tempName;

        // let tempLayout = rowsList[index1].layout;
        // rowsList[index1].layout = rowsList[index2].layout;
        // rowsList[index2].layout = tempLayout;

        let tempPanResponder = rowsList[index1].panResponder;
        rowsList[index1].panResponder = rowsList[index2].panResponder;
        rowsList[index2].panResponder = tempPanResponder;

        // let tempLowerNeighbor = this.neighbors[rowsList[index1].name];
        // rowsList[index1].lowerNeighbor = rowsList[index2].lowerNeighbor;
        // rowsList[index2].lowerNeighbor = tempLowerNeighbor;
        
        let temp = rowsList[index1]
        rowsList[index1] = rowsList[index2];
        rowsList[index2] = temp;

        //console.log(rowsList);
        return rowsList;
    }

    shouldSwap(newXCoord, newYCoord, lowerNeighbor){
        return newXCoord == lowerNeighbor.coords.x && newYCoord == lowerNeighbor.coords.y;
    }

    /* Create a callback function to allow the child components (Rows) to update the state */
    updateRows(rows){
        this.setState({ rows : rows });
    }

    /* Create a callback function to allow the child components (Rows) to update the state */
    updateCoords(name, coords){
        this.rowsMetaData[name].coords = coords;
    }

    render(){
        //console.log(this.state.rows);
        return (
            <View>
                <View style={styles.dropZone}>
                    <Text style={styles.text}>
                        TODO List
                    </Text>
                     
                    {this.state.rows.map( row => (
                        <Row
                            key={row.index}
                            index={row.index}
                            name={row.name}
                            layout={row.layout}
                            coords={row.coords}
                            rows={this.state.rows}
                            updateRows={this.updateRows}
                            updateCoords={this.updateCoords}
                            panResponder={row.panResponder}
                            lowerNeighbor={row.lowerNeighbor}
                        />
                    ))}

                    <Button
                        onPress={() => { this.addRow() }}
                        title="Add item"
                        style={styles.addBtn}
                    />
                </View>
            </View>
        )
    }
}

export default Column;