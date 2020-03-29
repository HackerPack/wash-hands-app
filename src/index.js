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
import timeConstants from './constants/timeConstants';


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
      currentTimer: timeConstants.HOME_TIMER,
      currentView: VIEWS.HOME,
    };
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.setState({ loading: false });

    BackgroundTimer.runBackgroundTimer(() => {
      if (this.state.currentTimer > 0) {
        this.setState(prevState => {
          return {
            loading: prevState.loading,
            currentView: prevState.currentView,
            currentTimer: prevState.currentTimer - 1,
          };
        });
      }
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
    const resetTimer = () => this.setState({
      currentTimer: timeConstants.HOME_TIMER,
    });

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
                  <WashingView navigate={navigate} resetTimer={resetTimer} />
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
