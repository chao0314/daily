class Heap {

    constructor(compare, count) {

        this.count = count;
        this.store = [];
        // 从 1 开始便于计算
        this.index = 1;
        if (!compare instanceof Function) throw  new Error("compare need be function");
        this.compare = compare;

    }


    buildHeap(arr) {


        arr.unshift(void 0);

        this.store = arr;

        this.index = arr.length;


        //倒叙 建堆 效率高 O(n)
        for (let i = this.store.length; i > 0; i--) {

            this.topToDownHeapify(i);

        }


    }


    sort() {

        let index = this.index;

        while (--this.index > 1) {

            this.swap(1, this.index);

            this.topToDownHeapify();

        }

        this.index = index;

        return this.store;

    }

    swap(indexA, indexB) {

        const temp = this.store[indexA];

        this.store[indexA] = this.store[indexB];

        this.store[indexB] = temp;

    }


    //自底向上 堆化
    downToTopHeapify() {

        let lastIndex = this.index - 1;
        let parentIndex = Math.floor(lastIndex / 2);

        // 默认是小顶堆
        while (lastIndex > 0 && this.compare(this.store[parentIndex], this.store[lastIndex]) > 0) {

            this.swap(parentIndex, lastIndex);
            lastIndex = parentIndex;
            parentIndex = Math.floor(lastIndex / 2);
        }

    }


    //自顶向下 堆化
    topToDownHeapify(parentIndex = 1) {

        while (parentIndex < this.index) {

            let index = parentIndex;
            let childIndex = parentIndex * 2;

            if (childIndex < this.index && this.compare(this.store[parentIndex], this.store[childIndex]) > 0) {
                index = childIndex;
                // 两个子节点都大/小  选最后一个
                if (childIndex + 1 < this.index && this.compare(this.store[childIndex], this.store[childIndex + 1]) > 0) index = childIndex + 1;
            }


            // 不需要堆化

            if (parentIndex === index) return;
            this.swap(parentIndex, index);
            parentIndex = index;

        }
    }

    insert(element) {

        if (this.count) {
            if (this.index < this.count) {

                this.store[this.index++] = element;

                //堆化 调整
                this.downToTopHeapify();

            } else throw new Error("store full")


        } else this.store[this.index++] = element;

    }

    remove() {

        if (this.index >= 1) {

            this.swap(1, --this.index);

            //堆化 调整
            this.topToDownHeapify();

            // 剔除0 便于堆化 操作
            if (this.index === 0) this.index = 1;
        } else throw new Error("store empty");


    }

    peek() {

        return this.store[1];

    }


}


// 堆排序  原地  不稳定  nlog(n)

//小顶堆
const hp1 = new Heap((a, b) => a-b);
hp1.buildHeap([4, 7, 1, 6, 3, 2, 8, 5]);
console.log(hp1.store)
// hp1.remove();
// console.log(hp1.store)
hp1.sort();
console.log(hp1.store)
