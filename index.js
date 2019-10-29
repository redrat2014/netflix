import {AppRegistry} from 'react-native';
import indexApp from './src/';
import {name as netflix} from './app.json';

AppRegistry.registerComponent(netflix, () => indexApp);