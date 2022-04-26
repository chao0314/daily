import Loading from './src/Loading';

export {Loading} from './src/Loading';

import FlyBox from './src/FlyBox';

export {FlyBox} from './src/FlyBox';

import Container from './src/Container';

export {Container} from './src/Container';

import Logo from './src/Logo';

export {Logo} from './src/Logo';

import CountTo from './src/CountTo';

export {CountTo} from './src/CountTo';

import Icon from './src/Icon';

export {Icon} from './src/Icon';


const components = [Loading, FlyBox, Container, Logo,CountTo,Icon];


export default {

    install(app) {

        components.forEach(comp => {

            app.component(`L${comp.name}`, comp);

        })

    }
}