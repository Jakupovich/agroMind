import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import {
  Bell,
  CloudLightning,
  Shield,
  Sprout,
  Snowflake,
  CloudRain,
  CheckCheck,
  Trash2,
  BellOff,
} from 'lucide-react-native';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { useNotificationHistory } from '@/hooks/useNotificationHistory';
import { AppNotification } from '@/services/notificationService';

type FilterType = 'all' | 'hail' | 'shield' | 'sowing' | 'frost' | 'storm';

const TYPE_CONFIG: Record<AppNotification['type'], { icon: any; color: string; label: string }> = {
  hail: { icon: CloudLightning, color: Colors.amber, label: 'Hail' },
  shield: { icon: Shield, color: Colors.green, label: 'Shield' },
  sowing: { icon: Sprout, color: Colors.green, label: 'Sowing' },
  frost: { icon: Snowflake, color: '#60a5fa', label: 'Frost' },
  storm: { icon: CloudRain, color: Colors.amber, label: 'Storm' },
};

const PRIORITY_COLOR: Record<AppNotification['priority'], string> = {
  critical: Colors.red,
  high: Colors.amber,
  normal: Colors.green,
};

function formatTime(ts: number): string {
  const now = Date.now();
  const diff = now - ts;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function NotificationItem({ item, onPress }: { item: AppNotification; onPress: () => void }) {
  const cfg = TYPE_CONFIG[item.type];
  const Icon = cfg.icon;
  const priorityColor = PRIORITY_COLOR[item.priority];

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <MotiView
          animate={{ opacity: pressed ? 0.85 : 1, scale: pressed ? 0.99 : 1 }}
          transition={{ type: 'timing', duration: 100 }}
        >
          <BlurView intensity={14} tint="dark" style={[
            styles.notifCard,
            { borderColor: item.read ? Colors.borderSubtle : cfg.color + '33' },
            !item.read && { backgroundColor: cfg.color + '06' },
          ]}>
            <View style={[styles.notifIconWrap, { backgroundColor: cfg.color + '1A', borderColor: cfg.color + '33' }]}>
              <Icon size={16} color={cfg.color} strokeWidth={2} />
            </View>
            <View style={styles.notifContent}>
              <View style={styles.notifTopRow}>
                <Text style={[styles.notifTitle, { color: item.read ? Colors.textSecondary : Colors.textPrimary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                {!item.read ? (
                  <View style={[styles.unreadDot, { backgroundColor: priorityColor }]} />
                ) : null}
              </View>
              <Text style={styles.notifBody} numberOfLines={2}>{item.body}</Text>
              <View style={styles.notifMeta}>
                <Text style={styles.notifTime}>{formatTime(item.timestamp)}</Text>
                <View style={[styles.priorityChip, { backgroundColor: priorityColor + '1A' }]}>
                  <Text style={[styles.priorityLabel, { color: priorityColor }]}>{item.priority}</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </MotiView>
      )}
    </Pressable>
  );
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const { notifications, unreadCount, markAllRead, markRead, clearAll } = useNotificationHistory();
  const [filter, setFilter] = useState<FilterType>('all');

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'hail', label: 'Hail' },
    { key: 'shield', label: 'Shield' },
    { key: 'sowing', label: 'Sowing' },
    { key: 'frost', label: 'Frost' },
    { key: 'storm', label: 'Storm' },
  ];

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <View style={[styles.root, { backgroundColor: Colors.bg }]}>
      <View style={[styles.headerArea, { paddingTop: insets.top + Spacing.md }]}>
        <MotiView
          from={{ opacity: 0, translateY: -16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <View style={styles.titleRow}>
              <Bell size={18} color={Colors.green} strokeWidth={2} />
              <Text style={styles.pageTag}>ALERTS</Text>
            </View>
            <Text style={styles.pageTitle}>Notifications</Text>
            {unreadCount > 0 ? (
              <Text style={styles.unreadLabel}>{unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}</Text>
            ) : (
              <Text style={styles.unreadLabel}>All caught up</Text>
            )}
          </View>
          <View style={styles.headerActions}>
            {unreadCount > 0 ? (
              <Pressable onPress={markAllRead} style={({ pressed }) => [styles.actionBtn, { opacity: pressed ? 0.7 : 1 }]}>
                <CheckCheck size={16} color={Colors.green} strokeWidth={2} />
              </Pressable>
            ) : null}
            {notifications.length > 0 ? (
              <Pressable onPress={clearAll} style={({ pressed }) => [styles.actionBtn, { opacity: pressed ? 0.7 : 1 }]}>
                <Trash2 size={16} color={Colors.red} strokeWidth={2} />
              </Pressable>
            ) : null}
          </View>
        </MotiView>

        <View style={styles.filterOuter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {filters.map((f) => (
              <Pressable key={f.key} onPress={() => setFilter(f.key)}>
                <MotiView
                  animate={{
                    backgroundColor: filter === f.key ? Colors.green + '22' : Colors.bgCardAlt,
                    borderColor: filter === f.key ? Colors.green + '55' : Colors.borderSubtle,
                  }}
                  transition={{ type: 'timing', duration: 180 }}
                  style={styles.filterChip}
                >
                  <Text style={[styles.filterLabel, { color: filter === f.key ? Colors.green : Colors.textSecondary }]}>
                    {f.label}
                  </Text>
                  {f.key !== 'all' ? (
                    <View style={[styles.filterCount, { backgroundColor: (TYPE_CONFIG[f.key as AppNotification['type']] || { color: Colors.green }).color + '22' }]}>
                      <Text style={[styles.filterCountText, { color: (TYPE_CONFIG[f.key as AppNotification['type']] || { color: Colors.green }).color }]}>
                        {notifications.filter((n) => n.type === f.key).length}
                      </Text>
                    </View>
                  ) : (
                    <View style={[styles.filterCount, { backgroundColor: Colors.green + '22' }]}>
                      <Text style={[styles.filterCountText, { color: Colors.green }]}>{notifications.length}</Text>
                    </View>
                  )}
                </MotiView>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      {filtered.length === 0 ? (
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.emptyState}
        >
          <View style={styles.emptyIconWrap}>
            <BellOff size={36} color={Colors.textMuted} strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>No alerts yet</Text>
          <Text style={styles.emptySubtitle}>
            Push alerts will appear here when hail risk is detected, shields deploy, or crop windows open.
          </Text>
        </MotiView>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 90 },
          ]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateX: -16 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 400, delay: index * 50 }}
            >
              <NotificationItem item={item} onPress={() => markRead(item.id)} />
            </MotiView>
          )}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  headerArea: { paddingHorizontal: Spacing.md, gap: Spacing.md, paddingBottom: Spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  headerLeft: { gap: 3 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  pageTag: { fontSize: FontSize.xs, color: Colors.green, fontWeight: '800', letterSpacing: 1.5 },
  pageTitle: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: '800', letterSpacing: -0.8 },
  unreadLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  headerActions: { flexDirection: 'row', gap: Spacing.sm, paddingBottom: 4 },
  actionBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: Colors.bgCardAlt, borderWidth: 1, borderColor: Colors.borderSubtle, alignItems: 'center', justifyContent: 'center' },
  filterOuter: { marginHorizontal: -Spacing.md },
  filterScroll: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterLabel: { fontSize: FontSize.sm, fontWeight: '700' },
  filterCount: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  filterCountText: { fontSize: 10, fontWeight: '800' },
  listContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.sm },
  notifCard: { borderRadius: Radius.lg, borderWidth: 1, padding: Spacing.md, flexDirection: 'row', gap: Spacing.sm, overflow: 'hidden' },
  notifIconWrap: { width: 40, height: 40, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifContent: { flex: 1, gap: 4 },
  notifTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  notifTitle: { fontSize: FontSize.sm, fontWeight: '700', flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  notifBody: { fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: '500', lineHeight: 17 },
  notifMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  notifTime: { fontSize: 10, color: Colors.textMuted, fontWeight: '600' },
  priorityChip: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  priorityLabel: { fontSize: 9, fontWeight: '800', textTransform: 'capitalize', letterSpacing: 0.3 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md, paddingHorizontal: Spacing.xl },
  emptyIconWrap: { width: 80, height: 80, borderRadius: 28, backgroundColor: Colors.bgCardAlt, borderWidth: 1, borderColor: Colors.borderSubtle, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: '800' },
  emptySubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500', textAlign: 'center', lineHeight: 20 },
});
