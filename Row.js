import React, {Component} from "react";
import {
    View,
    Text,
    Animated,
} from 'react-native';

class Row extends Component{
    constructor(props){
        super(props);
    }

    /* Only re-render if we swapped the names of two items or if creating an item for the first time */
    shouldComponentUpdate(nextProps){
        return this.props.name !== nextProps.name;
    }
    
    /* Updating the coordinates of a row item to be used in the Columns component */
    setCoords(x, y) {
        this.props.rows[this.props.index].coords = {x: x, y: y};
    }

    render(){
        console.log("Rendering Row: ", this.props.index);
        
        return (
            <View 
                key={this.props.index} 
                style={styles.draggableContainer}
                onLayout={({ nativeEvent}) => {
                    this.props.updateCoords(this.props.name, nativeEvent.layout.x, nativeEvent.layout.y); 
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