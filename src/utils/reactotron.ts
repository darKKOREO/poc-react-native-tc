import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({ host: '10.0.2.2' })
    .useReactNative()
    .connect();
}

export default Reactotron;
