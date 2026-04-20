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
  return null;
}

export default function RootLayout() {
  return (
    <AlertProvider>
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
