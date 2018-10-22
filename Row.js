import React, {Component} from "react";
import {
    View,
    Text,
    Animated,
    PanResponder,
} from 'react-native';

class Row extends Component{

    shouldComponentUpdate(nextProps){
        return this.props.index !== nextProps.index;
    }
    
    // setCoords(xCoord,yCoord){
    //     this.coords = {x : xCoord, y : yCoord};
    // }

    // setRenderStatus(bool){
    //     this.shouldRender = bool;
    // }

    render(){
        console.log("Rendering Row: ", this.props.index);
        return (
            <View 
                key={this.props.index} 
                style={styles.draggableContainer}
            >
                <Animated.View 
                    {...this.props.panResponder.panHandlers}
                    style={[this.props.layout.getLayout(), 
                    styles.rectangle]}
                >
                    <Text style={styles.text}>Row {this.props.index}</Text>
                </Animated.View>
            </View>
        );
    }
    //onLayout={({ nativeEvent}) => {
            //    row.setCoords(nativeEvent.layout.x, nativeEvent.layout.y);
            //}}
}

export default Row;