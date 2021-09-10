// 冒泡  核心 ：两两交换  原地 O(n2)
let arr = [1, '3', 3, 6, 5, 2, 4];

function bubble(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        for (let j = 0; j < arr.length - 1 - i; j++) {

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

            }

        }


    }

    return arr;


}

// console.log(bubble(arr));


// 每次选择剩下的最小的  O(n2) 不稳定 原地
// 选择的时候 可能会交换数值的位置 导致相等数值的相对位置改变

function selectionSort(arr) {

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

        }

    }
    return arr;
}


// console.log(selectionSort(arr));


//插入排序 将未排序的数据，插入到已排序的数据中
//O(n2) 原地 稳定

function insertionSort(arr) {
    // 要插入的数值
    for (let i = 1; i < arr.length; i++) {
        const insert = arr[i];
        //已经排好序的数值
        for (let j = i - 1; j >= 0; j--) {
            if (insert < arr[j]) {
                //挨个后移，留出空，后续放入数值
                arr[j + 1] = arr[j];
            } else {
                arr[j + 1] = insert;
                break;
            }
        }


    }

    return arr;

}

// console.log(insertionSort(arr));

// 归并排序 O(nlogn)  非原地 需要申请空间 O(n) 稳定
// 1 对折划分 2 两个有序数组合并

function mergeSort(arr, left, right) {

    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);

    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    merge(arr, left, middle, right);

    return arr;

    function merge(arr, left, middle, right) {
        const temp = [];
        let pLeft = left;
        let pRight = middle + 1;

        while (pLeft <= middle && pRight <= right) {

            const leftV = arr[pLeft];
            const rightV = arr[pRight];

            if (leftV <= rightV) {
                temp.push(leftV);
                pLeft++;
            } else {
                temp.push(rightV);
                pRight++;
            }

        }

        while (pLeft <= middle) {
            temp.push(arr[pLeft++]);
        }

        while ((pRight <= right)) {
            temp.push(arr[pRight++]);
        }

        for (let i = 0; i < temp.length; i++) {

            arr[left + i] = temp[i];

        }


    }

}

console.log(mergeSort(arr, 0, arr.length - 1));









