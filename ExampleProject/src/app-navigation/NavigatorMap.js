let navigatorMap = {};

const addNavigator = ({ navigatorKey, navigator, }) => {
  if (!navigatorKey) throw new Error('Tried to add navigator without id');
  if (!navigator) throw new Error('Tried to add navigator with the navigator');

  navigatorMap[navigatorKey] = navigator;
};

const removeNavigator = ({ navigatorKey, }) => {
  if (!navigatorKey) throw new Error('Tried to remove a navigator without key');

  delete navigatorMap[navigatorKey];
};

const getNavigatorByKey = (navigatorKey: string) => {
  const navigator = navigatorMap[navigatorKey];

  if (!navigator) {
    throw new Error(`No navigator exists in the navigator map with the key ${navigatorKey}`);
  }

  return navigator;
};

const getKeys = () => {
  // For debugging purpose
  return Object.keys(navigatorMap);
};

const NavigatorMap = {
  addNavigator,
  removeNavigator,
  getNavigatorByKey,
  getKeys,
};

export default NavigatorMap;
