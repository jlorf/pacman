//----------------------Adjust Tile Cost---------------------------//
//Create options for drawing tiles that cost more than 1

//-----------------------Node Efficiency---------------------------//
//Create an option for mapping key nodes of map to reduce calculation time

//-------------------------Maze methods----------------------------//
//naive algorithm, not guaranteed solvable, O(n)
function generateNaiveMaze(array, rows, columns) {
    let cells = [];
    for (let y = 0; y < rows; y++) {
        if (y%2 === 1) {
            continue;
        }
        cells[y] = [];
        for (let x = 0; x < columns; x++) {
            if (x%2 === 1) {
                continue;
            }
            cells[y][x] = {x: x, y: y}
        }
    }
    //draw
    // function drawMaze1() {
    //     cells.forEach(r => {
    //         r.forEach(c => {
    //             offScreenCTX.fillRect(c.x,c.y,1,1);
    //         })
    //     })
    //     source = offScreenCVS.toDataURL();
    //     renderImage();
    //     window.setTimeout(drawMaze2, delaySlider.value)
    // }
    // function drawMaze2() {
    //     cells.forEach(r => {
    //         r.forEach(c => {
    //             let rand = [[0,1],[0,-1],[1,0],[-1,0]];
    //             let randC = rand[Math.floor(Math.random() * 4)];
    //             offScreenCTX.fillRect(c.x+randC[0],c.y+randC[1],1,1);
    //         })
    //     })
    //     source = offScreenCVS.toDataURL();
    //     renderImage();
    // }
    // drawMaze1();
    return cells;
}
// Eller's algorithm
function generateEllerMaze(array) {
    let cells = [];
    //Generate Maze
    for (let y = 0; y < array.length; y++) {
        if (y%2 === 0) {
            continue;
        }
        //Step 1: Initialize empty row if it doesn't exist
        let rowSets = {};
        if (!cells[y]) {cells[y] = []};
        for (let x = 0; x < array[y].length; x++) {
            if (x%2 === 0) {
                continue;
            }
            
            if (!cells[y][x]) {
                //Step 2: create each cell in this row if it doesn't exist yet, assign a unique set
                let setID = `${y}|${x}`;
                let uniqueSet = new Set()
                let cell = {x: x, y: y, set: setID, connections: {}};
                cells[y][x] = cell;
                //add to set
                uniqueSet.add(cell);
                //add to row sets
                rowSets[setID] = uniqueSet;
            } else {
                //add existing cells to row sets
                let cell = cells[y][x];
                if (rowSets[cell.set]) {
                    rowSets[cell.set].add(cell);
                } else {
                    let uniqueSet = new Set();
                    uniqueSet.add(cell);
                    rowSets[cell.set] = uniqueSet;
                }
            }
        }
        function removeWall() {return Math.random() > 0.5;}
        //Step 3: Create right connections
        cells[y].forEach(c => {
            let rightCell = cells[y][c.x+2];
            //if right cell are in different sets, check remove wall
            if (rightCell) {
                if (c.set !== rightCell.set) {
                    if (removeWall() || y===array.length-1) {
                        //open the right path
                        c.connections.right = true;
                        let oldSet = rightCell.set;
                        //merge right cell's set into left cell's set
                        rowSets[oldSet].forEach(rc => {
                            rc.set = c.set;
                            rowSets[c.set].add(rc);
                        })
                        delete rowSets[oldSet];
                    }
                }
            }
        })
        //Step 4: Create down connections
        //only continue if not on last row
        if (y < array.length-1) {
            Object.entries(rowSets).forEach(kv => {
                let connects = 0;
                let last;
                let thisSet = kv[1];
                let thisSetID = kv[0];
                //if set only has one entry, create a path down
                thisSet.forEach(c => {
                    //check removeWall or if this is the last row of the maze
                    if (removeWall() || thisSet.size === 1) {
                        //open the down path
                        c.connections.down = true;
                        connects += 1;
                        if (!cells[y+2]) {cells[y+2] = []};
                        let downCell = {x: c.x, y: y+2, set: thisSetID, connections: {}};
                        cells[y+2][c.x] = downCell;
                    }
                    last = c;
                })
                //make sure at least one connects
                if (connects === 0) {
                    //open the down path
                    last.connections.down = true;
                    if (!cells[y+2]) {cells[y+2] = []};
                    let downCell = {x: last.x, y: y+2, set: thisSetID, connections: {}};
                    cells[y+2][last.x] = downCell;
                }
            })
        }
    }

    return cells;
}
