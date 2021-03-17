export default class History {


    constructor() {

    }

    getCurrentLocation() {
        throw new Error('abstract function');
    }

    transitionTo(path, callback) {

        throw new Error('abstract function');

    }


}