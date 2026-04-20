import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface AppNotification {
  id: string;
  type: 'hail' | 'shield' | 'sowing' | 'frost' | 'storm';
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  priority: 'critical' | 'high' | 'normal';
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleLocalNotification(
  title: string,
  body: string,
  data?: Record<string, any>
): Promise<string | null> {
  try {
    const granted = await requestNotificationPermissions();
    if (!granted) return null;
    const id = await Notifications.scheduleNotificationAsync({
      content: { title, body, data: data ?? {}, sound: true },
      trigger: null,
    });
    return id;
  } catch {
    return null;
  }
}

export async function sendHailAlert(location: string): Promise<void> {
  await scheduleLocalNotification(
    '⚠️ Hail Risk Detected',
    `Active hail storm approaching ${location}. HailGuard shields deploying automatically.`,
    { type: 'hail' }
  );
}

export async function sendShieldDeployAlert(zone: string): Promise<void> {
  await scheduleLocalNotification(
    '🛡️ HailGuard Deployed',
    `${zone} shields are now active. Crops are protected against incoming hail.`,
    { type: 'shield' }
  );
}

export async function sendShieldRetractAlert(zone: string): Promise<void> {
  await scheduleLocalNotification(
    '✅ HailGuard Retracted',
    `${zone} shields retracted after all-clear signal. System ready for next event.`,
    { type: 'shield' }
  );
}

export async function sendSowingWindowAlert(crop: string, dates: string): Promise<void> {
  await scheduleLocalNotification(
    `🌱 ${crop} Sowing Window Open`,
    `Optimal planting conditions for ${crop} detected. Sow between ${dates} for best results.`,
    { type: 'sowing' }
  );
}

export async function sendFrostAlert(probability: number, date: string): Promise<void> {
  await scheduleLocalNotification(
    '❄️ Frost Risk Alert',
    `${probability}% frost probability detected on ${date}. Consider delaying sowing.`,
    { type: 'frost' }
  );
}

export function buildNotificationRecord(
  type: AppNotification['type'],
  title: string,
  body: string,
  priority: AppNotification['priority'] = 'normal'
): AppNotification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    title,
    body,
    timestamp: Date.now(),
    read: false,
    priority,
  };
}
