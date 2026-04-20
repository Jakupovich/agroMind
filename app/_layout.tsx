import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Providers and Contexts
import { AlertProvider } from '@/theme/ui/context';
import { AuthProvider } from '@/theme/auth/supabase/context';
import { NotificationProvider } from '@/context/NotificationContext';

// Services and Constants
import { requestNotificationPermissions } from '@/services/notificationService';
import { Colors } from '@/constants/theme';

/**
 * Handles initial app state, such as onboarding checks 
 * and requesting permissions.
 */
function AppGate() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 1. Request Notifications
    requestNotificationPermissions();

    // 2. Check Onboarding Status
    const checkOnboarding = async () => {
      try {
        const val = await AsyncStorage.getItem('onboarding_complete');
        if (!val) {
          router.replace('/onboarding');
        }
      } catch (e) {
        console.error("Failed to fetch onboarding status", e);
      } finally {
        setChecked(true);
      }
    };

    checkOnboarding();
  }, []);

  if (!checked) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={Colors.green} size="large" />
      </View>
    );
  }

  return null;
}

export default function RootLayout() {
  return (
    <AlertProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <NotificationProvider>
            <StatusBar style="light" />
            
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="login" />
            </Stack>

            <AppGate />
          </NotificationProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
