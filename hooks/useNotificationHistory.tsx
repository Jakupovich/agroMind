import { useContext } from 'react';
import { NotificationContext } from '@/context/NotificationContext';

export function useNotificationHistory() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotificationHistory must be used within NotificationProvider');
  return context;
}
