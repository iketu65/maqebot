const args = process.argv.slice(2);
const inputString = String(args[0]);
const arrayOfCommands = []; // create an array of commands, each element represents one command for MAQE Bot.

const startingPosition = {
    xPosition: 0,
    yPosition: 0,
    direction: 'North'
}

const convertInputStringToArrayOfCommands = () => {
    const inputInArray = inputString.split("");

    for (let i = 0; i < inputInArray.length; i += 0) {
        if (inputInArray[0] === 'R' || inputInArray[0] === 'L') {
            arrayOfCommands.push(inputInArray[0]);
            inputInArray.shift();
        } else if (inputInArray[0] === 'W') {
            inputInArray.shift();
            let unitsForBotToMove = "";
            for (let j = 0; j < inputInArray.length; j += 0) {
                if (!isNaN(inputInArray[0])) {
                    unitsForBotToMove += inputInArray[0];
                    inputInArray.shift();
                } else {
                    break;
                }
            }
            arrayOfCommands.push(unitsForBotToMove);
        } else {
            return console.log("Error!, Please input valid command");
        }
    }
    // console.log(arrayOfCommands)
};

class MaqeBot {
    constructor() {
        this.myPosition = startingPosition;
    };
    
    turnBot(turnDirection) {
        switch (this.myPosition.direction) {
            case 'North':
                if (turnDirection === 'R') {
                    return this.myPosition.direction = 'East';
                } else if (turnDirection === 'L') {
                    return this.myPosition.direction = 'West'
                }
            case 'East':
                if (turnDirection === 'R') {
                    return this.myPosition.direction = 'South';
                } else if (turnDirection === 'L') {
                    return this.myPosition.direction = 'North'
                }
            case 'West':
                if (turnDirection === 'R') {
                    return this.myPosition.direction = 'North';
                } else if (turnDirection === 'L') {
                    return this.myPosition.direction = 'South'
                }
            case 'South':
                if (turnDirection === 'R') {
                    return this.myPosition.direction = 'West';
                } else if (turnDirection === 'L') {
                    return this.myPosition.direction = 'East'
                }
        }
    }

    moveBot(unitsToMove) {
        switch (this.myPosition.direction) {
            case 'North':
                this.myPosition.yPosition += Number(unitsToMove);
                break;
            case 'East':
                this.myPosition.xPosition += Number(unitsToMove);
                break;
            case 'West':
                this.myPosition.xPosition -= Number(unitsToMove);
                break;
            case 'South':
                this.myPosition.yPosition -= Number(unitsToMove);
                break;
        }
    }   
}

const maqeBot = new MaqeBot();

const moveBotAccordingToInput = () => {
    arrayOfCommands.map(command => {
        if (!isNaN(command)) {
            maqeBot.moveBot(command);
        } else {
            maqeBot.turnBot(command);
        }
    });
}

convertInputStringToArrayOfCommands();
moveBotAccordingToInput();

console.log(`X: ${maqeBot.myPosition.xPosition} Y: ${maqeBot.myPosition.yPosition} Direction: ${maqeBot.myPosition.direction}`);