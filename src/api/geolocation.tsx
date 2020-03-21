import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Isomon Don't Go",
        message:
          "Isomon Don't Go needs to access your location to give you points for social distancing",
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      throw new Error('Permission denied');
    }
  }

  return;
}

Geolocation.setRNConfiguration({
  authorizationLevel: 'always',
  skipPermissionRequests: false,
});

export const watchLocation = async (
  onSuccess,
  onError = null,
  options = {},
) => {
  await requestLocationPermission();
  Geolocation.watchPosition(
    position => {
      console.log('last position', position);
      onSuccess(position);
    },
    error => {
      console.log(error);
      onError && onError(error);
    },
    options,
  );
};
