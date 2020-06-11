import {Navigation} from 'react-native-navigation';
import IDs from './ScreenIDs';
import Login from './login/Login';
import Home from './home/Home';
import HistoryCheckin from './history-checkin/HistoryCheckin';
import Introduction from './introduction/Introduction';
import OverlayComponent from '../common-components/Overlay';
import Profile from './profile/Profile';

const screens = {
  [IDs.Login]: Login,
  [IDs.Home]: Home,
  [IDs.Introduction]: Introduction,
  [IDs.HistoryCheckin]: HistoryCheckin,
  [IDs.OverlayComponent]: OverlayComponent,
  [IDs.Profile]: Profile,
};

const registerScreens = (
  enhancers: Function = (a) => a,
  store: Object,
  Provider: Object,
) => {
  // Loop through the array and register every screen in it.
  Object.keys(screens).map((screenID) => {
    Navigation.registerComponentWithRedux(
      screenID,
      () => enhancers(screens[screenID]),
      Provider,
      store,
    );
  });
};

export {registerScreens, IDs};
