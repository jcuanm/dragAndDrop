import { StyleSheet, 
         Dimensions,
} from 'react-native'

let SIDE_PADDING = 50;
let Window = Dimensions.get('window');
let RECTANGLE_WIDTH = Window.width - SIDE_PADDING;
let RECTANGLE_HEIGHT = 36;

export default styles = StyleSheet.create({
    dropZone    : {
        width          : RECTANGLE_WIDTH,
        height         : RECTANGLE_HEIGHT,
        top            : RECTANGLE_HEIGHT,
        left           : Window.width/2 - RECTANGLE_WIDTH/2,
        backgroundColor:'#2c3e50'
    },
    addBtn    : {
        width          : RECTANGLE_WIDTH,
        height         : RECTANGLE_HEIGHT,
        top            : 0,
        left           : Window.width/2 - RECTANGLE_WIDTH/2,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 12,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        left        : Window.width/2 - RECTANGLE_WIDTH/2,
    },
    rectangle      : {
        backgroundColor     : '#1abc9c',
        width               : RECTANGLE_WIDTH,
        height              : RECTANGLE_HEIGHT,
    }
});
