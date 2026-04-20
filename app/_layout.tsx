<<<<<<< HEAD
import 'react-native-get-random-values';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/theme/ui/context';
import { AuthProvider } from '@/theme/auth/supabase/context';
import { StatusBar } from 'expo-status-bar';
import { NotificationProvider }from '@/context/NotificationContext';
import { requestNotificationPermissions } from '@/services/notificationService';
import { useEffect } from 'react';

function NotificationSetup() {
  useEffect(() => {
    requestNotificationPermissions();
  }, []);
=======
import { Stack, router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/theme';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/theme';

function AppGate() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarding_complete').then((val) => {
      setChecked(true);
      if (!val) {
        router.replace('/onboarding');
      }
    });
  }, []);

  if (!checked) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.green} size="large" />
      </View>
    );
  }

>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
  return null;
}

export default function RootLayout() {
  return (
    <AlertProvider>
<<<<<<< HEAD
      <AuthProvider>
        <SafeAreaProvider>
          <NotificationProvider>
            <StatusBar style="light" />
            <NotificationSetup />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="login" />
            </Stack>
          </NotificationProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
=======
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
        </Stack>
        <AppGate />
      </SafeAreaProvider>
    </AlertProvider>
  );
}
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
