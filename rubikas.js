console.log('2022 geguzes 18. Rubiko kubo sprendimas');

let globalAngle = {x: 0, y: 0, z: 0}
const cubesize = 53;

const gameInfo = document.querySelector('.game-info');
const wholeCube = document.querySelector('.cube-wrap');
const wrapX = document.querySelector('.wrapX');
const wrapY = document.querySelector('.wrapY');
const wrapY2 = document.querySelector('.wrapY2');
const smallCubesDOM = document.querySelectorAll('.cube');
const squares = document.querySelectorAll('.face');

colors = {
    right: {
        value: '#B90000',
        name: 'red',
        squares: [7, 12, 20, 25, 27, 32, 40, 45, 53]
    }, 
    left: {
        value: '#FF5900',
        name: 'orange',
        squares: [2, 9, 15, 22, 26, 29, 35, 42, 48]
    },  
    front: {
        value: '#009B48',
        name: 'green',
        squares: [13, 16, 18, 28, 30, 31, 46, 49, 51]
    }, 
    back: {
        value: '#0045AD',
        name: 'blue',
        squares: [0, 3, 5, 21, 23, 24, 33, 36, 38]
    },
    up: {
        value: '#FFFFFF',
        name: 'white',
        squares: [1, 4, 6, 8, 10, 11, 14, 17, 19]
    },
    down: {
        value: '#FFD500',
        name: 'yellow',
        squares: [34, 37, 39, 41, 43, 44, 47, 50, 52]
    }
};

colors2 = {
    right: {
        value: '#BA0C2F',
        name: 'red',
        squares: [7, 12, 20, 25, 27, 32, 40, 45, 53]
    }, 
    left: {
        value: '#FE5000',
        name: 'orange',
        squares: [2, 9, 15, 22, 26, 29, 35, 42, 48]
    },  
    front: {
        value: '#009A44',
        name: 'green',
        squares: [13, 16, 18, 28, 30, 31, 46, 49, 51]
    }, 
    back: {
        value: '#003DA5',
        name: 'blue',
        squares: [0, 3, 5, 21, 23, 24, 33, 36, 38]
    },
    up: {
        value: '#FFFFFF',
        name: 'white',
        squares: [1, 4, 6, 8, 10, 11, 14, 17, 19]
    },
    down: {
        value: '#FFD700',
        name: 'yellow',
        squares: [34, 37, 39, 41, 43, 44, 47, 50, 52]
    }
};

const cubesPositions = [
    { x: -1, y: -1, z: -1 },
    { x: 0, y: -1, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: -1, y: -1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 1, y: -1, z: 0 },
    { x: -1, y: -1, z: 1 },
    { x: 0, y: -1, z: 1 },
    { x: 1, y: -1, z: 1 },
    { x: -1, y: 0, z: -1 },
    { x: 0, y: 0, z: -1 },
    { x: 1, y: 0, z: -1 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 1 },
    { x: 0, y: 0, z: 1 },
    { x: 1, y: 0, z: 1 },
    { x: -1, y: 1, z: -1 },
    { x: 0, y: 1, z: -1 },
    { x: 1, y: 1, z: -1 },
    { x: -1, y: 1, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
    { x: -1, y: 1, z: 1 },
    { x: 0, y: 1, z: 1 },
    { x: 1, y: 1, z: 1 },
];
  
const moves = {
    frontClockwise: {
        rotationAngle: 90,
        axis: 'z',
        level: 1,
        replaceColors: [
            [14,48], [17,29], [19,15], [20,14], [32,17], [53,19], [52,20], [50,32], [47,53], [48,52], [29,50], [15,47], [13,46], [16,28], [18,13], [31,16], [51,18], [49,31], [46,51], [28,49]
        ] 
    }, 
    frontCounterClockwise: {
        rotationAngle: -90,
        axis: 'z',
        level: 1,
        replaceColors: [  
            [15,19], [29,17], [48,14], [47,15], [50,29], [52,48], [53,47], [32,50], [20,52], [19,53], [17,32], [14,20], [46,13], [28,16], [13,18], [16,31], [18,51], [31,49], [51,46], [49,28]
        ] 
    }, 
    backClockwise: {
        rotationAngle: -90,
        axis: 'z',
        level: -1,
        replaceColors: [
            [2,6], [22,4], [35,1], [34,2], [37,22], [39,35], [40,34], [25,37], [7,39], [6,40], [4,25], [1,7], [0,5], [21,3], [33,0], [36,21], [38,33], [24,36], [5,38], [3,24]
        ] 
    }, 
    backCounterClockwise: {
        rotationAngle: 90,
        axis: 'z',
        level: -1,
        replaceColors: [  
            [1,35], [4,22], [6,2], [7,1], [25,4], [40,6], [39,7], [37,25], [34,40], [35,39], [22,37], [2,34], [5,0], [3,21], [0,33], [21,36], [33,38], [36,24], [38,5], [24,3]
        ] 
    }, 
    leftClockwise: {
        rotationAngle: -90,
        axis: 'x',
        level: -1,
        replaceColors: [
            [13, 1], [28, 8], [46,14], [47,13], [41,28], [34,46], [33,47], [21,41], [0,34], [1,33], [8,21], [14,0], [15,2], [29,9], [48,15], [42,29], [35,48], [22,42], [2,35], [9,22]
        ] 
    }, 
    leftCounterClockwise: {
        rotationAngle: 90,
        axis: 'x',
        level: -1,
        replaceColors: [
            [14,46], [8,28], [1,13], [0,14], [21,8], [33,1], [34,0], [41,21], [47,33], [46,34], [28, 41], [13,47], [2,15], [9,29], [15,48], [29,42], [48,35], [42,22], [35,2], [22,9]
        ]  
    }, 
    rightClockwise: {
        rotationAngle: 90,
        axis: 'x',
        level: 1,
        replaceColors: [
            [51,39], [31,44], [18,52], [19,51], [11,31], [6,18], [5,19], [24,11], [38,6], [39,5], [44,24], [52,38],     [20,53], [12,32], [7,20], [25,12], [40,7], [45,25], [53,40], [32,45]
        ] 
    },  
    rightCounterClockwise: {
        rotationAngle: -90,
        axis: 'x',
        level: 1,
        replaceColors: [
            [52,18], [44,31], [39,51], [38,52], [24,44], [5,39], [6,38], [11,24], [19,5], [18,6], [31,11], [51,19], [53,20], [32,12], [20,7], [12,25], [7,40], [25,45], [40,53], [45,32]
        ] 
    }, 
    xMiddleClockwise: {
        rotationAngle: 90,
        axis: 'x',
        level: 0,
        replaceColors:[ 
            [49, 37], [30, 43], [16, 50], [17, 49], [10, 30], [4, 16], [3, 17], [23, 10], [36, 4], [37, 3], [43, 23], [50, 36] 
        ]
    },
    xMiddleCounterClockwise: {
        rotationAngle: -90,
        axis: 'x',
        level: 0,
        replaceColors:[ 
            [50, 16], [43, 30], [37, 49], [36, 50], [23, 43], [3, 37], [4, 36], [10, 23], [17, 3], [16, 4], [30, 10], [49, 17]    
        ]
    },
    upClockwise: {
        rotationAngle: -90,
        axis: 'y',
        level: -1,
        replaceColors: [ 
            [18,7], [16,12], [13,20], [15,18], [9,16], [2,13], [0,15], [3,9], [5,2], [7,0], [12,3], [20,5], [1,14], [8,17], [14,19], [17,11], [19,6], [11,4], [6,1], [4,8]
        ] 
    }, 
    upCounterClockwise: {
        rotationAngle: 90,
        axis: 'y',
        level: -1,
        replaceColors: [
            [20,13], [12,16], [7,18], [5,20], [3,12], [0,7], [2,5], [9,3], [15,0], [13,2], [16,9], [18,15], [14,1], [17,8], [19,14], [11,17], [6,19], [4,11], [1,6], [8,4]
        ] 
    }, 
    downClockwise: {
        rotationAngle: 90,
        axis: 'y',
        level: 1,
        replaceColors: [
            [46,35], [49,42], [51,48], [53,46], [45,49], [40,51], [38,53], [36,45], [33,40], [35,38], [42,36], [48,33], [52,47], [44,50], [39,52], [37,44], [34,39], [41,37], [47,34], [50,41]
        ] 
    }, 
    downCounterClockwise: {
        rotationAngle: -90,
        axis: 'y',
        level: 1,
        replaceColors: [ 
            [48,51], [42,49], [35,46], [33,48], [36,42], [38,35], [40,33], [45,36], [53,38], [51,40], [49,45], [46,53], [47,52], [50,44], [52,39], [44,37], [39,34], [37,41], [34,47], [41,50]
        ] 
    }, 
    zMiddleClockwise: {
        rotationAngle: 90,
        axis: 'z',
        level: 0,
        replaceColors:[ 
            [42, 44], [26, 43], [9, 41], [8, 42], [10, 26], [11, 9], [12, 8], [27, 10], [45, 11], [44, 12], [43, 27], [41, 45], 
        ]
    },
    zMiddleCounterClockwise: {
        rotationAngle: -90,
        axis: 'z',
        level: 0,
        replaceColors:[ 
            [41, 9], [43, 26], [44, 42], [45, 41], [27, 43], [12, 44], [11, 45], [10, 27], [8, 12], [9, 11], [26, 10], [42, 8] 
        ]
    },
    yMiddleClockwise: {
        rotationAngle: 90,
        axis: 'y',
        level: 0,
        replaceColors: [ 
            [28, 22], [30, 26], [31, 29], [32, 28], [27, 30], [25, 31], [24, 32], [23, 27], [21, 25], [22, 24], [26, 23], [29, 21]
        ]
    },
    yMiddleCounterClockwise: {
        rotationAngle: -90,
        axis: 'y',
        level: 0,
        replaceColors: [ 
            [29, 31], [26, 30], [22, 28], [21, 29], [23, 26], [24, 22], [25, 21], [27, 23], [32, 24], [31, 25], [30, 27], [28, 32]
        ]
    }
};


let smallCubesData = new Array(27)
cubesPositions.map((singleCube,i) => {
    smallCubesData[i] = {
        position: {
            x: cubesPositions[i].x,
            y: cubesPositions[i].y,
            z: cubesPositions[i].z
        },
        angle: {
            x: 0, 
            y: 0,
            z: 0,
        },
    } 
}) 

smallCubesDOM.forEach((singleCube,i) => { 
    const {position} = smallCubesData[i];

    singleCube.style.transform = `
        translateX(${position.x * cubesize}px) 
        translateY(${position.y * cubesize}px) 
        translateZ(${position.z * cubesize}px)
    `;   

    if ((!position.x && !position.y) || (!position.x && !position.z)  || (!position.y && !position.z)) {
        singleCube.classList.add('invisible')
    }

})

// assign side color to each square
squares.forEach((square,i)=>{
    square.textContent = '' //i 
    square.num = i 
    for (side in colors) {
        if (colors[side].squares.includes(square.num)) {
            square.style.backgroundColor = colors[side].value
            square.color = colors[side].value
        }
    }
})

// rotate whole cube with arrow keys
document.onkeydown = () => {
    let event = window.event; 

    if (event.key === 'ArrowLeft') globalRotation(0, 15);
    if (event.key === 'ArrowRight') globalRotation(0, -15);
    if (event.key === 'ArrowUp') globalRotation(15, 0);
    if (event.key === 'ArrowDown') globalRotation(-15, 0); 
}


const globalRotation = (x, y) => {

    let previousAngleX = globalAngle.x;
    let previousAngleY = globalAngle.y;

    
    globalAngle.x += x;
    globalAngle.y += y;

    // vertical rotation
    if (y === 0) {
        // wrapY.style.transform = `rotateY(0deg)`
        // wrapX.style.transform = `rotateX(${globalAngle.x}deg)` 
        // wholeCube.style.transform = `
        //     rotateX(0deg)
        //     rotateY(0deg)
        // `
        wholeCube.style.transform = `
            rotate3d(1 , 0, 0, ${globalAngle.x}deg) 
            rotate3d(0 , 1, 0, ${globalAngle.y}deg) 
        `   
    }

    //horizontal rotation
    if (x === 0) {
        wrapY.style.transform = `rotate3d(0 , 1, 0, ${globalAngle.y}deg)`
        // wrapX.style.transform = `rotateX(${globalAngle.x}deg)`
        
        // wholeCube.style.transform = `
        //     rotateX(0deg)
        //     rotateY(0deg)  
        // `
        wholeCube.style.transform = `
            
            rotate3d(1, 0 , 0, ${globalAngle.x}deg)
                
        `
    }

    if (x !== 0 && y !== 0) {
        wholeCube.style.transform = `
            rotate3d(1, 0 , 0, ${globalAngle.x}deg)
            rotate3d(0 , 1, 0, ${globalAngle.y}deg)    
        `
    }

   
    
    
    // TECHNINE INFO apie viso kubo pasukimus ir pan
    const angX = (globalAngle.x % 360 + 360) % 360;
    const angY = (globalAngle.y % 360 + 360) % 360;
    gameInfo.textContent = `x= ${angX }   y=  ${angY} `

};




const rotate = ({rotationAngle, axis, level, replaceColors}) => {

    smallCubesDOM.forEach((singleCube,i) => { 

        const {angle, position} = smallCubesData[i];
        
        //angle.x angle.y angle.z - ankstesne kubelio orientacija
        const currentAngle = {
            x: angle.x,
            y: angle.y,
            z: angle.z
        }
        
        currentAngle[axis] = angle[axis] + rotationAngle;
    
        if (position[axis] === level) {

            singleCube.style.transition = 'transform .3s'
            singleCube.style.transform = `
                rotateX(${currentAngle.x}deg)
                rotateY(${currentAngle.y}deg)
                rotateZ(${currentAngle.z}deg)
                translateX(${position.x * cubesize}px) 
                translateY(${position.y * cubesize}px) 
                translateZ(${position.z * cubesize}px)
            `;

            setTimeout(() => {
                singleCube.style.transition = 'none'
                singleCube.style.transform = `
                    rotateX(0deg) 
                    rotateY(0deg)
                    rotateZ(0deg)
                    translateX(${position.x * cubesize}px) 
                    translateY(${position.y * cubesize}px) 
                    translateZ(${position.z * cubesize}px)
                `

                replaceColors.map(change => {
                    squares[change[0]].style.backgroundColor = squares[change[1]].color;
                })
                replaceColors.map(change => {
                    squares[change[0]].color = squares[change[0]].style.backgroundColor;
                })
            
            }, 300);
        }    
    })
}


//game starts here
globalRotation(10, 45);




const scrambleCube = () => {
    wholeCube.style.transition = 'transform 1s'
    let directions = Object.keys(moves);
    
    let time = 0;
    const d = new Date();
    let startTime = d.getTime();


    const timeCounter = () => {
        
        time = Math.floor((Date.now() - startTime) /100)/10;
    
        let randMove = Math.floor(Math.random() * directions.length);
        rotate(moves[directions[randMove]])

        if (time > 8) {
            clearInterval(timer);
            globalRotation(-5,5)
            wholeCube.style.transition = 'none'
        } else globalRotation(-20,-20)
    }
    const timer = setInterval(timeCounter, 350);
    
}





document.getElementById('scrambleButton').addEventListener('click', scrambleCube)

// document.getElementById('button-L').addEventListener('click', () => rotate(moves.leftClockwise))
// document.getElementById('button-L1').addEventListener('click', () => rotate(moves.leftCounterClockwise))

// document.getElementById('button-R').addEventListener('click', () => rotate(moves.rightClockwise))
// document.getElementById('button-R1').addEventListener('click', () => rotate(moves.rightCounterClockwise))

// document.getElementById('button-U').addEventListener('click', () => rotate(moves.upClockwise))
// document.getElementById('button-U1').addEventListener('click', () => rotate(moves.upCounterClockwise))

// document.getElementById('button-D').addEventListener('click', () => rotate(moves.downClockwise))
// document.getElementById('button-D1').addEventListener('click', () => rotate(moves.downCounterClockwise))

// document.getElementById('button-F').addEventListener('click', () => rotate(moves.frontClockwise))
// document.getElementById('button-F1').addEventListener('click', () => rotate(moves.frontCounterClockwise))

// document.getElementById('button-B').addEventListener('click', () => rotate(moves.backClockwise))
// document.getElementById('button-B1').addEventListener('click', () => rotate(moves.backCounterClockwise))




let moveFromTo = {
    startSquare: null,
    endSquare: null,
};

const touchStart = (event1) => {
    const selectedSquare = event1.path[0];
    moveFromTo.startSquare = selectedSquare.num;
    event1.stopPropagation();
}

const touchEnd = (event2) => {
    moveFromTo.startSquare = event2.target.num;
    if (moveFromTo.startSquare !== null) {
    
        const selectedSquare = document.elementFromPoint(event2.touches[0].clientX, event2.touches[0].clientY)
        
        if (selectedSquare.num !== moveFromTo.startSquare) {
            moveFromTo.endSquare = selectedSquare.num; 
            
            rotateFace(moveFromTo.startSquare, moveFromTo.endSquare); 

            moveFromTo = {
                startSquare: null,
                endSquare: null
            };
        }
        event2.stopPropagation(); 
    }  
}

const mouseStart = (event1) => {
    moveFromTo.startSquare = event1.target.num;
    event1.stopPropagation();
}

const mouseEnd = (event2) => {
    moveFromTo.endSquare = event2.target.num;
    rotateFace(moveFromTo.startSquare, moveFromTo.endSquare);

    moveFromTo = {
        startSquare: null,
        endSquare: null
    };
    event2.stopPropagation();
}


// EVENT listeners at each square to detect mouse or touch rotations
squares.forEach((singleSquare) => {
    singleSquare.addEventListener('mousedown', mouseStart)
    singleSquare.addEventListener('mouseup', mouseEnd)
    singleSquare.addEventListener('touchstart', touchStart)
    singleSquare.addEventListener('touchmove', touchEnd)
})


const rotateFace = (startSquare, endSquare) => {
    
    for (direction in moves) {

        const listOfSquares = moves[direction].replaceColors.map(x=>x[0]);

        // if rotation squares sequence include both startSquare and endSquare 
        // and and distance between them is 1, 2 positions them this rotatation is made
        if (listOfSquares.includes(startSquare) && 
            listOfSquares.indexOf(startSquare) < 12 &&
            (listOfSquares[(listOfSquares.indexOf(startSquare) + 1) % 12]  === endSquare ||
            listOfSquares[(listOfSquares.indexOf(startSquare) + 2) % 12]  === endSquare ||
            listOfSquares[(listOfSquares.indexOf(startSquare) + 3) % 12]  === endSquare)
        ) {
            rotate(moves[direction]);
            return
        } 
    }
    return 'clicked on central square'
}






// ==================================================================================================

// =======SPROGIMO EFEKTAS
// const randX = parseInt(Math.random()* 4);
// const randY = parseInt(Math.random()* 4);
// const randZ = parseInt(Math.random()* 4);



