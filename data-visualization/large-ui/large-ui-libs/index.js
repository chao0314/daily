import Test from './src/Test';

export {Test} from './src/Test';

import Loading from './src/Loading';

export {Loading} from './src/Loading';


const components = [Test, Loading];


export default {

    install(app) {

        components.forEach(comp => {

            app.component(`L${comp.name}`, comp);

        })

    }
}