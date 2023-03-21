//functional component
//options:
/*
* loader
* delay
* loadingComponent
* timeout
* errorComponent
* onError
* */
export function defineAsyncComponent(options = {}) {

    if (typeof options === 'function') {
        options = {
            loader: options,
            delay: 200,
            timeout: 3000
        }


    }

    const {loader, delay, loadingComponent, timeout, errorComponent, onError} = options;






    return {

        setup(props) {


            return () => {

            }

        }

    }

}

const PlaceHolder = {

    name: 'PlaceHolder',
    props: {
        content: String
    },
    render() {
        return {
            type: 'div',
            children: this.content

        }

    }

}