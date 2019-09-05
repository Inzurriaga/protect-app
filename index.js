/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/component/app/App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./src/reducer/rootReducer";

const store = createStore( rootReducer )

const Application = () => (
  <Provider store={store}><App /></Provider>
)

AppRegistry.registerComponent(appName, () => Application);
