import {AppRegistry} from 'react-native';
import indexApp from './src/indexApp';
import {name as netflix} from './app.json';

AppRegistry.registerComponent(netflix, () => indexApp);

// import { AppRegistry } from 'react-native';
// import IndexApp from './src/'
// AppRegistry.registerComponent('netflix', () => IndexApp);