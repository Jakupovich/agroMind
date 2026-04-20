import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppNotification, buildNotificationRecord } from '@/services/notificationService';

const STORAGE_KEY = 'agro_notifications';
const MAX_STORED = 100;

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (
    type: AppNotification['type'],
    title: string,
    body: string,
    priority?: AppNotification['priority']
  ) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  clearAll: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setNotifications(JSON.parse(raw));
        } catch {}
      }
    });
  }, []);

  const persist = useCallback((items: AppNotification[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_STORED)));
  }, []);

  const addNotification = useCallback(
    (
      type: AppNotification['type'],
      title: string,
      body: string,
      priority: AppNotification['priority'] = 'normal'
    ) => {
      const record = buildNotificationRecord(type, title, body, priority);
      setNotifications((prev) => {
        const updated = [record, ...prev].slice(0, MAX_STORED);
        persist(updated);
        return updated;
      });
    },
    [persist]
  );

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      persist(updated);
      return updated;
    });
  }, [persist]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      persist(updated);
      return updated;
    });
  }, [persist]);

  const clearAll = useCallback(() => {
    setNotifications([]);
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, addNotification, markAllRead, markRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
