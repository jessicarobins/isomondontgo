import React, { FC } from 'react';
import { Text } from 'react-native';
import useInterval from '../hooks/useInterval';
import { watchLocation } from '../api/geolocation';

type Props = {};

const INTERVAL = 5000;

const GeoWatcher: FC<Props> = (props: Props) => {
  const [state, setState] = React.useState({
    position: null,
    points: 0,
    delay: INTERVAL,
  });

  useInterval(() => {
    setState({ ...state, points: state.points + 1 });
    // check for non movement for some amount of time and reset delay
  }, state.delay);

  const onLocationSuccess = position => {
    if (state.position) {
      setState({
        ...state,
        delay: 0,
        points: 0,
      });
    } else {
      setState({
        ...state,
        position,
      });
    }
  };

  React.useEffect(() => {
    watchLocation(onLocationSuccess, null, {
      distanceFilter: 1, // 1 meter, for testing. TODO: make higher
      enableHighAccuracy: true,
      interval: INTERVAL,
    });
  }, []);

  return <Text>{state.points}</Text>;
};

export default GeoWatcher;
