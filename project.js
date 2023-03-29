//deposit some money
//choose number of rows
//collect bet amount
//spin the slot
//check for win
//give the winning amount
//play again

const prompt = require('prompt-sync')()


const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}





const deposit = () => {
    while(true){

    
    const depositMoney = prompt('Enter amount u want to deposit : ')
    const numberDepositAmount = parseFloat(depositMoney)

    if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
        console.log("Invalid deposit amount ")
    }else{
        return numberDepositAmount;
    }
 } 
}

const getaNumOfLines = () =>{
    while(true){

    
        const numOfLines = prompt('Enter num of lines u want to bet on : ')
        const numberOfLines = parseFloat(numOfLines)
    
        if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines > 3){
            console.log("Invalid number of lines")
        }else{
            return numberOfLines;
        }
     } 
}

const getBet = (balance,numOfLines) =>{
    while(true){

    
        const bet = prompt('Enter bet per line: ')
        const numberBet = parseFloat(bet)
    
        if(isNaN(numberBet) || numberBet<=0 || numberBet > balance / numOfLines){
            console.log("Invalid bet")
        }else{
            return numberBet;
        }
     } 
}

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0; i<count; i++){
            symbols.push(symbol)
        }
    }
    console.log(symbols)
    const reels = []
    for (let i=0; i<COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1)
        }
        
    }
    return reels;
}


const transpose = (reels) => {
    const rows = [];
  
    for (let i = 0; i < ROWS; i++) {
      rows.push([]);
      for (let j = 0; j < COLS; j++) {
        rows[i].push(reels[j][i]);
      }
    }
  
    return rows;
  };

  const printRows = (rows)=>{
    for (const row of rows){
        let rowString = "";
        for([i,symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString)
    }
  }

  const getWinnings=(rows, bet, lines)=>{
    let winning =0;

    for(let row = 0; row<lines; row++){
        const symbols = rows[row];
        let allSame = true
        for(symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break;
            }
        }
        
        if(allSame){
            winning += bet*lines
        }

    }
    return winning;
  }


const game=()=>{
let balance = deposit()

while(true){
    
console.log("You have balance Rs" + balance)
const numOfLines = getaNumOfLines()

if(balance < 0){
    console.log("You ran out of money ")
    break;
}
const reels = spin()


const bet = getBet(balance,numOfLines)
const rows = transpose(reels)

balance -= bet*numOfLines;

console.log(rows)


let winning = getWinnings(rows,bet,numOfLines)
console.log("You won Rs " + winning.toString() )
balance += winning;

let wantPlay = prompt("Do you want to play again (y,n) ")

if(wantPlay != 'y') break;

}


}

game();

