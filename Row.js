class Row{
    constructor(index, layout, xCoord, yCoord){
        this.index = index;
        this.layout = layout;
    } 
    
    setPanResponder(panResponder){
        this.panResponder = panResponder; 
    }

    setCoords(xCoord,yCoord){
        this.coords = {x : xCoord, y : yCoord};
    }
}

export default Row;