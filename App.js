import React from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import Root from './src/index';
import configureStore from './src/store/index';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';

const { persistor, store } = configureStore();

const theme = { ...lightTheme, ...appTheme };

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Root store={store} persistor={persistor} />
    </ApplicationProvider>
  );
}
