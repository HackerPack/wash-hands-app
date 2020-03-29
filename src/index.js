import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';
import BackgroundTimer from 'react-native-background-timer';
import { Layout } from '@ui-kitten/components';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import theme from '../native-base-theme/variables/commonColor';

import Routes from './routes/index';
import Loading from './components/UI/Loading';
import HomeView from './components/HomeView'
import WashingView from './components/WashingView';
import utils from './lib/utils';


export const VIEWS = {
  HOME: 'HOME',
  WASHING: 'WASHING',
  SCORE: 'SCORE',
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentTimer: -1,
      currentView: VIEWS.HOME,
    };
  }

  async componentDidMount() {
    SplashScreen.hide();
    const currentTimer = await utils.fetchCurrentHomeTimer();
    this.setState({ loading: false , currentTimer});

    BackgroundTimer.runBackgroundTimer(async () => {
      const currentTimer = await utils.fetchCurrentHomeTimer();
      this.setState(prevState => {
        return {
          loading: prevState.loading,
          currentView: prevState.currentView,
          currentTimer: currentTimer > 0 ? currentTimer : 0,
        };
      });
    },
    1000);
  }

  render() {
    const { loading } = this.state;
    const { store, persistor } = this.props;

    if (loading) {
      return <Loading />;
    }

    const navigate = (currentView) => this.setState({currentView});

    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <Layout style={{flex: 1}}>
                {this.state.currentView === VIEWS.HOME &&
                  <HomeView
                    currentTimer={this.state.currentTimer}
                    navigate={navigate}
                  />
                }
                {this.state.currentView === VIEWS.WASHING &&
                  <WashingView navigate={navigate} />
                }
              </Layout>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default App;
