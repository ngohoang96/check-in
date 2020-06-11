import SnackBar from 'react-native-snackbar';

export const showError = (title) => {
  SnackBar.show({
    text: title,
    duration: SnackBar.LENGTH_LONG,
    backgroundColor: 'red',
  });
};

export const showSuccess = (title) => {
  SnackBar.show({
    text: title,
    duration: SnackBar.LENGTH_SHORT,
    backgroundColor: '#0EB464',
  });
};
