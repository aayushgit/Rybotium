const SHA256 = require('crypto-js/SHA256');
class Block{
	constructor(index, timestamp, data, previousHash=''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash =this.calculateHash();
	}

	calculateHash(){
	    return SHA256(this.index+this.timestamp+JSON.stringify(this.data)).toString();

	}
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block(0,"28/01/2018","Genesis of Rybotium","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for (let i=1;i<this.chain.length;i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let rybotium = new  Blockchain();
rybotium.addBlock(new Block(1,"28/01/2018",{amount:10}));
rybotium.addBlock(new Block(2,"30/01/2018",{amount:17}));
console.log('Is blockchain valid?'+rybotium.isChainValid());
rybotium.chain[1].data = {amount:100};
rybotium.chain[1].hash = rybotium.chain[1].calculateHash();
console.log('Is blockchain valid?'+rybotium.isChainValid());
// console.log(JSON.stringify(rybotium,null,4));