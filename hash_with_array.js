// @ts-nocheck
class HashTable {


    table = new Array(3)
    items = 0
    loadFactor = this.items / this.table.length


    resize() {
        const newTable = new Array(this.table.length * 2);
        
        this.table.forEach((bucket) => {
            if (bucket) {
                bucket.forEach(([key, val]) => {
                    const idx = this.convertToHash(key, newTable.length);
                    if (newTable[idx]) {
                        newTable[idx].push([key, val]);
                    } else {
                        newTable[idx] = [[key, val]];
                    }
                });
            }
        });
    
        this.table = newTable;
    }
    


    convertToHash(key,tableSize) {
        let hash = 17;

        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) %tableSize;
        }

        return hash;
    }




    setItem(key, value) {
        let idx = this.convertToHash(key,this.table.length)

        let loadFactor = this.items / this.table.length

        if(loadFactor>.8){
            this.resize()
        }
        if (this.table[idx]) {
            this.table[idx].push([key, value])
        } else {
            this.table[idx] = [[key, value]]
        }
        this.items++
    }
    getItem(key) {
        let idx = this.convertToHash(key,this.table.length);
    
        if (this.table[idx]) {
            const value = this.table[idx].find(([s, value]) => key === s);
    
            if (value) {
                return value[1];
            }
        }
    
        return undefined;
    }
    

}

const myTable = new HashTable()

myTable.setItem('firstName', 'dominic')
myTable.setItem('lastName', 'Sophex')



console.log(myTable.getItem('firstName'))

console.log(myTable.table.length)
