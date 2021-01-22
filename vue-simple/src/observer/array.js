const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

export default function hijackArray(arr) {

    let arrProtoInstance = Object.create(Array.prototype);

    methods.forEach(method => arrProtoInstance[method] = function (...args) {
        let ob = this.__ob__;
        Array.prototype[method].apply(this, args);

        if (method === 'push' || method === 'unshift') {

            console.log('array push unshift');

            ob.observeArray(args);

        } else if (method === 'splice') {


            if (args.length > 2) {
                console.log('array splice add');
                args = args.slice(2);
                ob.observeArray(args);
            } else {
                console.log('array splice sub');
            }

        } else {

            console.log('array unshift pop sort reverse');

        }
    })

    Object.setPrototypeOf(arr, arrProtoInstance);


}