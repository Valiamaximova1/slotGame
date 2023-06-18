interface PayoutRule {
    symbols: string[];
    payout: number;
  }
  
  class Slot {
    private reels: string[][];
    public payout: number;
    private payoutRules: PayoutRule[] = [
      { symbols: ['cherry', 'cherry', 'cherry'], payout: 25 },
      { symbols: ['melon', 'melon', 'melon'], payout: 20 },
      { symbols: ['apple', 'apple', 'apple'], payout: 10 },
      { symbols: ['banana', 'banana', 'banana'], payout: 5 },
      { symbols: ['lemon', 'lemon', 'lemon'], payout: 1 }
    ];
    private linesPayout: number[];
  
    constructor() {
      this.reels = [
        ['banana','cherry','melon',  'lemon', 'lemon','apple', 'lemon','melon','apple', 'banana','lemon', 'lemon'],
        ['melon','lemon', 'banana','apple','lemon','melon', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
        ['lemon', 'apple','melon', 'banana','lemon','banana','melon', 'apple', 'cherry', 'lemon', 'lemon', 'lemon']
      ],
      this.payout = 0,
      this.linesPayout = [];
    }
  
  
    public spin(): void {
      const reelPositions: number[][] = [];
      const symbols: string[][] = [];
      this.payout = 0;
      
      
      for (let i = 0; i < this.reels.length; i++) {
        
        const symbolIndex1 = Math.floor(Math.random() * this.reels[0].length);
        const symbol1 = this.reels[0][symbolIndex1];
        
  
        
        const symbolIndex2 = Math.floor(Math.random() * this.reels[1].length);
        const symbol2 =  this.reels[1][symbolIndex2];
  
        const symbolIndex3 = Math.floor(Math.random() * this.reels[2].length);
        const symbol3 =  this.reels[2][symbolIndex3];
  
  
        reelPositions.push([symbolIndex1, symbolIndex2, symbolIndex3]);
        symbols.push([symbol1, symbol2, symbol3]);
      }
  
      console.log('Reel Positions:', reelPositions);
      console.log('Symbols on Screen:', symbols);
  
      let pay: number = 0;
      
      for (const rule of this.payoutRules) {
        pay = 0;
  
        for (const symbolRow of symbols) {
          if (symbolRow.every((symbol, index) => symbol === rule.symbols[index])) {
            pay += rule.payout;
          }
        
        }
        this.payout += pay;
        this.linesPayout.push(pay);
      }
      console.log("Payout: " + this.payout);
      
  
  
      console.log('Lines Payout:', this.linesPayout);
      this.linesPayout =[];
    }
    
  }
  
  // simulation
  const numSpins: number = 1000;
  let totalWins: number = 0;
  let count : number = 0;
  const startTime = Date.now();
  
  
  const slot = new Slot();
  for (let i = 0; i < numSpins; i++) {
    slot.spin();
    totalWins += slot.payout;
    if(slot.payout > 0){
        count++;
    }
  }
  
  const endTime = Date.now();
  const time = (endTime - startTime) / 1000;
  
  console.log("********Results*********");
  console.log("Win count: ", count);
  console.log('Total Wins:', totalWins);
  console.log('Total Bets:', numSpins);
  console.log('Execution Time:', time, 'seconds');
  
  