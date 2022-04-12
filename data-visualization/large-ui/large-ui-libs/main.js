import Test from './src/Test';

export {Test} from './src/Test';

import Loading from './src/Loading';

export {Loading} from './src/Loading';

import FlyBox from './src/FlyBox';

export {FlyBox} from './src/FlyBox';


const components = [Test, Loading, FlyBox];


export default {

    install(app) {

        components.forEach(comp => {

            app.component(`L${comp.name}`, comp);

        })

    }
}