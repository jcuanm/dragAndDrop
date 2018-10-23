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
        this.updateRows = this.updateRows.bind(this);
    }

    /* Add a new row to the column */
    addRow(){
        const layout = new Animated.ValueXY();
        const newRow = {
            index: this.state.rows.length,
            layout: layout,
            isVisible: true,
            coords: {x: null, y: null} // We set coords after the Row component is rendered
        }
        this.setState({
            rows : [...this.state.rows, newRow]
        });
    }

    /* Create a callback function to allow the child components (Rows) to update the state */
    updateRows(rows){
        this.setState({ rows : rows });
    }

    render(){
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
                            isVisible={row.isVisible}
                            layout={row.layout}
                            rows={this.state.rows}
                            updateRows={this.updateRows}
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