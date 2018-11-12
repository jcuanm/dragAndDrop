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
        this.ROW_DETECTION_XOFFSET = 100; // Used for increasing the HORIZONTAL space in which a user can swap 2 items
        this.ROW_DETECTION_YOFFSET = 20; // Used for increasing the VERTICAL space in which a user can swap 2 items
        this.currRowsMetaData = {}; // Used to keep track of the position of the items in the list and on the screen
        this.state = {
            rows: [] // Contains the rows in the order they're presented at a given state
        }

        this.updateCoords = this.updateCoords.bind(this);
    }

    /* Add a new row to the column */
    addRow(){
        const layout = new Animated.ValueXY(); // Allows animation to happen during movement
        let length = this.state.rows.length;
        const name = this.state.rows.length;
        let lowerNeighbor = (length == 0 ? null : this.state.rows[length - 1]); // Accouting for the first element in the list
       
        this.currRowsMetaData[length] = {
            neighbors: {lower: lowerNeighbor, higher: null}, // lower == earlier position in rows list || higher == later position in rows list
            index: length, // Index in the rows list
            name: "Row " + name, // Unique identifier
            coords: null // We set coords after the Row component is rendered
        }
       
        /* Handles all movement for any given row */
        const panResponder = PanResponder.create({

            /* Indicate to OS that we want movement for this panresponder */
            onMoveShouldSetResponderCapture: () => true,

            /* Indicate to the OS that we want dragging movement */
            onMoveShouldSetPanResponderCapture : () => true,

            /* Set initial position */
            onPanResponderGrant: () => {
                console.log("Granted");
                console.log("Row ", length);
                console.log("MetaData: ", this.currRowsMetaData);
                console.log("Rows: ", this.state.rows);
                layout.setValue({x: 0, y: 0}); 
            },

            /* On movement logic */
            onPanResponderMove : (e, gestureState) => {

                /* Interpolate between movements */
                Animated.event([null,{
                    dx : layout.x,
                    dy : layout.y
                }])(e, gestureState);

                
                let rows = this.state.rows;
                let neighbors = this.currRowsMetaData[name].neighbors;
                let newXCoord = this.currRowsMetaData[name].coords.x + gestureState.dx; 
                let newYCoord = this.currRowsMetaData[name].coords.y + gestureState.dy;

                /* Figoure out the direction in which we are swapping (up or down), if at all... */
                let swapDirection = this.getSwapDirection(newXCoord, newYCoord, neighbors);
                newRowsList = [];
                
                if(swapDirection == "lower"){
                    newRowsList = this.swapItems(rows, this.currRowsMetaData, this.currRowsMetaData[name].neighbors.lower.name, name);
                    gestureState.dy = 0;
                    this.setState({ rows : newRowsList });
                }
                else if (swapDirection == "higher"){
                    newRowsList = this.swapItems(rows, this.currRowsMetaData, name, this.currRowsMetaData[name].neighbors.higher.name);
                    gestureState.dy = 0;
                    this.setState({ rows : newRowsList });
                }
            },

            /* On release logic */
            onPanResponderRelease : () => {
                /* Spring animation after releasing an item */
                Animated.spring(
                    layout,
                    {toValue:{x:0, y:0}}
                ).start();
                layout.flattenOffset();
                return true; 
            }
        });

        const newRow = {
            name: name,
            index: this.currRowsMetaData[name].index,
            layout: layout,    
            panResponder: panResponder, 
        }

        /* Updating the higher neighbor for each item except the first one */
        if (length != 0){
            this.currRowsMetaData[length - 1].neighbors.higher = newRow;
        }
        
        /* Updating the state and rerendering */
        this.setState({
            rows : [...this.state.rows, newRow]
        });
    }

    /* Swapping items within the day column */
    swapItems(itemsList, metaData, currName, neighborName){
        console.log("Swapped", currName, neighborName);
        
        /* Swapping screen coordinates */
        let tempCoords = metaData[currName].coords;
        metaData[currName].coords = metaData[neighborName].coords;
        metaData[neighborName].coords = tempCoords;

        /* Checking if we're swapping an item from the END of the list */
        if(metaData[neighborName].neighbors.higher){
            metaData[metaData[neighborName].neighbors.higher.name].neighbors.lower = itemsList[metaData[currName].index];
        }

        /* Checking if we're swapping an item from the BEGINNING of the list */
        if(metaData[currName].neighbors.lower){
            metaData[metaData[currName].neighbors.lower.name].neighbors.higher = itemsList[metaData[neighborName].index];
        }

        /* Swapping neighbors logic */
        let tempLowerNeighbor = metaData[currName].neighbors.lower;
        metaData[currName].neighbors.lower = itemsList[metaData[neighborName].index];
        metaData[currName].neighbors.higher = metaData[neighborName].neighbors.higher;
        
        metaData[neighborName].neighbors.lower = tempLowerNeighbor;
        metaData[neighborName].neighbors.higher = itemsList[metaData[currName].index]
        
        /* Swapping the items in the actual list */
        let tempItem = itemsList[metaData[currName].index];
        itemsList[metaData[currName].index] = itemsList[metaData[neighborName].index];
        itemsList[metaData[neighborName].index] = tempItem;

        /* Swapping Indeces in metaData */
        let tempIndex = metaData[currName].index;
        metaData[currName].index = metaData[neighborName].index;
        metaData[neighborName].index = tempIndex;

        return itemsList;
    }

    /* Return the direction in which we are swapping based on coordinates. Return null if not swapping */
    getSwapDirection(newXCoord, newYCoord, neighbors){
        let lowerStatus = this.shouldSwapLower(newXCoord, newYCoord, neighbors, this.currRowsMetaData);
        let higherStatus = this.shouldSwapHigher(newXCoord, newYCoord, neighbors, this.currRowsMetaData);

        if (lowerStatus != null){
            return lowerStatus;
        }
        
        if (higherStatus != null){
            return higherStatus;
        }

        return null;
    }

    /* Checks if we are swapping with an earlier item in the list */
    shouldSwapLower(newXCoord, newYCoord, neighbors, metaData){
        if (
            neighbors.lower &&
            newXCoord >= metaData[neighbors.lower.name].coords.x - this.ROW_DETECTION_XOFFSET && 
            newXCoord < metaData[neighbors.lower.name].coords.x + this.ROW_DETECTION_XOFFSET &&
            newYCoord <= metaData[neighbors.lower.name].coords.y && 
            newYCoord > metaData[neighbors.lower.name].coords.y - this.ROW_DETECTION_YOFFSET
        ){
            return "lower";
        }
        
        return null;
    }

    /* Checks if we are swapping with a later item in the list */
    shouldSwapHigher(newXCoord, newYCoord, neighbors, metaData){
        if (
            neighbors.higher &&
            newXCoord >= metaData[neighbors.higher.name].coords.x - this.ROW_DETECTION_XOFFSET && 
            newXCoord < metaData[neighbors.higher.name].coords.x + this.ROW_DETECTION_XOFFSET &&
            newYCoord >= metaData[neighbors.higher.name].coords.y && 
            newYCoord < metaData[neighbors.higher.name].coords.y + this.ROW_DETECTION_YOFFSET
        ){
            return "higher";
        }

        return null;
    }

    /* Create a callback function to allow the child components (Rows) to update the coordinates */
    updateCoords(name, x, y){
        this.currRowsMetaData[name].coords = {x:x, y:y};
    }

    render(){
        return (
            <View>
                <View style={styles.dropZone}>
                    <Text style={styles.text}>
                        Day 1
                    </Text> 
                </View>

                <View style={styles.dropZone}>
                </View>

                {this.state.rows.map( row => ( 
                    
                        <Row
                            key={row.index}
                            index={row.index}
                            name={row.name}
                            layout={row.layout}
                            rows={this.state.rows}
                            updateCoords={this.updateCoords}
                            panResponder={row.panResponder}
                            lowerNeighbor={row.lowerNeighbor}
                        />
                    
                ))}
               

                <View style={styles.addBtn}>
                    <Button
                        onPress={() => { this.addRow() }}
                        title="Add row"
                        style={styles.addBtn}
                    />
                </View>
                
            </View>
        )
    }
}

export default Column;