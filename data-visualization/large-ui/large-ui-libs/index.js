import Test from './src/Test';

export {Test} from './src/Test';

import Test1 from './src/Test1';

export {Test1} from './src/Test1';


const components = [Test, Test1];


export default {

    install(app) {

        components.forEach(comp => {

            app.component(comp.name, comp);

        })

    }
}