import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import { Cpu, Sprout, ChevronDown } from 'lucide-react-native';
import { PredictionCard } from '@/components/PredictionCard';
import { PulseIndicator } from '../../components/Pulseindicator';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { predictions, monthlyForecast } from '@/constants/mockData';

const { width } = Dimensions.get('window');

const cropEmoji: Record<string, string> = {
  Corn: '🌽',
  Wheat: '🌾',
  Soybeans: '🫘',
};

export default function PredictionScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCrop, setSelectedCrop] = useState(0);

  const currentPred = predictions[selectedCrop];

  return (
    <View style={[styles.root, { backgroundColor: Colors.bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + Spacing.md, paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <View style={styles.titleRow}>
            <Cpu size={18} color={Colors.green} strokeWidth={2} />
            <Text style={styles.pageTag}>AI ENGINE</Text>
          </View>
          <Text style={styles.pageTitle}>Crop Predictions</Text>
          <Text style={styles.pageSubtitle}>Ensemble model · 21-day forecast horizon</Text>
        </MotiView>

        <View style={styles.cropSelectorOuter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cropSelector}
          >
            {predictions.map((pred, i) => (
              <Pressable key={pred.id} onPress={() => setSelectedCrop(i)}>
                <MotiView
                  animate={{
                    backgroundColor: selectedCrop === i
                      ? (pred.status === 'optimal' ? Colors.green + '22' : Colors.red + '22')
                      : Colors.bgCardAlt,
                    borderColor: selectedCrop === i
                      ? (pred.status === 'optimal' ? Colors.green + '66' : Colors.red + '66')
                      : Colors.borderSubtle,
                    scale: selectedCrop === i ? 1.02 : 1,
                  }}
                  transition={{ type: 'timing', duration: 200 }}
                  style={styles.cropChip}
                >
                  <Text style={styles.cropEmoji}>{cropEmoji[pred.crop] || '🌱'}</Text>
                  <Text style={[
                    styles.cropLabel,
                    { color: selectedCrop === i ? Colors.textPrimary : Colors.textSecondary }
                  ]}>
                    {pred.crop}
                  </Text>
                  <View style={[
                    styles.cropStatusDot,
                    { backgroundColor: pred.status === 'optimal' ? Colors.green : Colors.red }
                  ]} />
                </MotiView>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <MotiView
          key={selectedCrop}
          from={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 400 }}
          style={styles.predWrap}
        >
          <PredictionCard data={currentPred} delay={0} />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 700, delay: 400 }}
        >
          <BlurView intensity={16} tint="dark" style={styles.forecastCard}>
            <Text style={styles.forecastTitle}>Monthly Forecast Overview</Text>
            <Text style={styles.forecastSubtitle}>Temperature & Rainfall · 12-Month</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.forecastScroll}
            >
              {monthlyForecast.map((m, i) => (
                <MotiView
                  key={m.month}
                  from={{ opacity: 0, translateY: 16 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 400, delay: 500 + i * 50 }}
                  style={styles.forecastMonth}
                >
                  <Text style={styles.monthLabel}>{m.month}</Text>
                  <View style={styles.monthBar}>
                    <MotiView
                      from={{ height: 0 }}
                      animate={{ height: Math.max(4, (m.temp / 25) * 60) }}
                      transition={{ type: 'timing', duration: 600, delay: 600 + i * 50 }}
                      style={[
                        styles.monthBarFill,
                        { backgroundColor: m.temp > 15 ? Colors.amber : m.temp > 8 ? Colors.green : Colors.blue }
                      ]}
                    />
                  </View>
                  <Text style={styles.monthTemp}>{m.temp}°</Text>
                  {m.frost ? (
                    <Text style={styles.frostIcon}>❄️</Text>
                  ) : null}
                </MotiView>
              ))}
            </ScrollView>
          </BlurView>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 24 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
        >
          <BlurView intensity={16} tint="dark" style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <Sprout size={16} color={Colors.green} strokeWidth={2} />
              <Text style={styles.modelTitle}>AI Model Confidence</Text>
            </View>
            <View style={styles.modelGrid}>
              {[
                { label: 'Ensemble Agreement', value: 94 },
                { label: 'Data Coverage', value: 88 },
                { label: 'Forecast Accuracy', value: 91 },
                { label: 'Model Reliability', value: 96 },
              ].map((item, i) => (
                <MotiView
                  key={item.label}
                  from={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'timing', duration: 400, delay: 700 + i * 100 }}
                  style={styles.modelItem}
                >
                  <View style={styles.modelItemHeader}>
                    <Text style={styles.modelItemLabel}>{item.label}</Text>
                    <Text style={[styles.modelItemValue, { color: Colors.green }]}>{item.value}%</Text>
                  </View>
                  <View style={styles.modelBar}>
                    <MotiView
                      from={{ width: '0%' }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ type: 'timing', duration: 800, delay: 750 + i * 100 }}
                      style={[styles.modelBarFill, { backgroundColor: Colors.green }]}
                    />
                  </View>
                </MotiView>
              ))}
            </View>
          </BlurView>
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    gap: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  header: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  pageTag: {
    fontSize: FontSize.xs,
    color: Colors.green,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  pageTitle: {
    fontSize: FontSize.xxl,
    color: Colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  pageSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  cropSelectorOuter: {
    marginHorizontal: -Spacing.md,
  },
  cropSelector: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  cropChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  cropEmoji: {
    fontSize: 16,
  },
  cropLabel: {
    fontSize: FontSize.base,
    fontWeight: '700',
  },
  cropStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  predWrap: {
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 6,
  },
  forecastCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    gap: Spacing.md,
    overflow: 'hidden',
  },
  forecastTitle: {
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  forecastSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: -8,
  },
  forecastScroll: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-end',
    paddingBottom: 4,
  },
  forecastMonth: {
    alignItems: 'center',
    gap: 4,
  },
  monthLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  monthBar: {
    width: 28,
    height: 60,
    justifyContent: 'flex-end',
    borderRadius: 6,
    backgroundColor: Colors.bgCardAlt,
    overflow: 'hidden',
  },
  monthBarFill: {
    width: '100%',
    borderRadius: 6,
  },
  monthTemp: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  frostIcon: {
    fontSize: 10,
  },
  modelCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    gap: Spacing.md,
    overflow: 'hidden',
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modelTitle: {
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  modelGrid: {
    gap: 14,
  },
  modelItem: {
    gap: 6,
  },
  modelItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modelItemLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  modelItemValue: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  modelBar: {
    height: 4,
    backgroundColor: Colors.bgCardAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  modelBarFill: {
    height: '100%',
    borderRadius: 2,
  },
});
