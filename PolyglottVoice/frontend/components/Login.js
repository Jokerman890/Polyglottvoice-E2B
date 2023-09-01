import React, { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { View, Button, Text } from 'react-native';

GoogleSignin.configure({
  webClientId: 'googleAuthClientId', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        setError(error);
      }
    }
  };

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { user, email, nonce, identityToken } = appleAuthRequestResponse;

      if (identityToken) {
        setUserInfo({ user, email, nonce, identityToken });
      } else {
        throw 'Apple Sign-In failed - no identify token returned';
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <View>
      <Button
        id="loginButton"
        title="Sign in with Google"
        onPress={signInWithGoogle}
      />
      <Button
        id="loginButton"
        title="Sign in with Apple"
        onPress={signInWithApple}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default Login;