import {Navigation} from 'react-native-navigation';
import {Colors} from '../theme';
import {IDs} from '../screens';
import {BottomIcon} from '../assets';

const goToMain = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'bottomTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: IDs.Home,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Chấm Công',
                  icon: BottomIcon.home,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: IDs.HistoryCheckin,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Lịch sử chấm',
                  icon: BottomIcon.history,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: IDs.Introduction,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Hướng dẫn',
                  icon: BottomIcon.introduction,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: IDs.Profile,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: false,
                },
                bottomTab: {
                  text: 'Hồ sơ',
                  icon: BottomIcon.profile,
                },
                layout: {
                  backgroundColor: '#fff',
                },
              },
            },
          },
        ],
      },
    },
  });
};
const showCommonDialog = ({
  title,
  desc,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  renderContent,
  dialog,
  interceptTouchOutside = true,
  tapToDismiss = true,
  isShowTime,
  error,
}) => {
  Navigation.showOverlay({
    component: {
      name: IDs.OverlayComponent,
      id: IDs.OverlayComponent,
      passProps: {
        tapToDismiss,
        title,
        desc,
        cancelText,
        submitText,
        onCancel,
        onSubmit,
        renderContent,
        dialog,
        isShowTime,
        error,
      },
      options: {
        layout: {componentBackgroundColor: 'transparent'},
        overlay: {interceptTouchOutside},
      },
    },
  });
};

const dismissOverlay = (componentID, cb) => {
  Navigation.dismissOverlay(componentID);
  if (cb) cb();
};

const showModalOverLay = (params) => {
  Navigation.showModal({
    component: {
      options: {
        screenBackgroundColor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        topBar: {
          visible: false,
          animate: true,
        },
      },
      ...params,
    },
  });
};
const showModal = (params) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            options: {
              topBar: {
                visible: false,
              },
            },
            ...params,
          },
        },
      ],
    },
  });
};

const loginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: IDs.Login,
              name: IDs.Login,
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                },
              },
            },
          },
        ],
      },
    },
  });
};
const dismissModal = (componentID) => {
  Navigation.dismissModal(componentID);
};

const popToRoot = (componentId, params) => {
  Navigation.popToRoot(componentId, params);
};

const changeBottonTab = (tabIndex) => {
  Navigation.mergeOptions('bottomTabsId', {
    bottomTabs: {
      currentTabIndex: tabIndex,
    },
  });
};
const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    topBar: {
      buttonColor: '#fff',
      visible: true,
      background: {
        color: '#fff',
      },
      title: {
        color: '#fff',
        fontFamily: 'Avenir',
      },
      backButton: {
        color: '#fff',
      },
    },
    layout: {
      backgroundColor: Colors.backgroundL1,
      orientation: ['portrait'],
    },
    bottomTabs: {
      backgroundColor: Colors.selectedColor,
      animate: false,
      drawBehind: false,
      titleDisplayMode: 'alwaysShow',
    },
    bottomTab: {
      iconInsets: {top: -2, bottom: 2, left: 0, right: 0},
      selectedIconColor: Colors.selectedIcon,
      selectedTextColor: Colors.selectedIcon,
      titleDisplayMode: 'alwaysShow',
      textColor: Colors.unSelectedIcon,
      iconColor: Colors.unSelectedIcon,
      fontSize: 12,
    },
  });
};

export {
  goToMain,
  showCommonDialog,
  dismissOverlay,
  showModal,
  dismissModal,
  changeBottonTab,
  setDefaultOptions,
  showModalOverLay,
  popToRoot,
  loginScreen,
};
