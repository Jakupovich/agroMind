import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MapPin, Cpu, Shield, ChevronRight, Check } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    image: require('@/assets/images/onboarding-1.jpg'),
    tag: 'SMART FARMING',
    title: 'Know Your\nField\'s Future',
    subtitle: 'AI-powered climate analysis tailored to your exact field location and crop variety.',
    accent: Colors.green,
    icon: MapPin,
  },
  {
    image: require('@/assets/images/onboarding-2.jpg'),
    tag: 'AI ENGINE',
    title: 'Predict Before\nRisks Arrive',
    subtitle: 'Ensemble models trained on 20 years of regional climate data deliver 91% forecast accuracy.',
    accent: Colors.amber,
    icon: Cpu,
  },
  {
    image: require('@/assets/images/onboarding-3.jpg'),
    tag: 'HAILGUARD',
    title: 'Automated\nPlant Protection',
    subtitle: 'Smart hardware deploys hail shields the moment sensors detect incoming storm cells.',
    accent: Colors.green,
    icon: Shield,
  },
];

const CROPS = ['Corn', 'Wheat', 'Soybeans', 'Barley', 'Rapeseed', 'Potatoes'];
const SIZES = ['< 5 ha', '5–20 ha', '20–50 ha', '50–100 ha', '> 100 ha'];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [farmName, setFarmName] = useState('');

  const goNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      const next = currentSlide + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrentSlide(next);
    } else {
      setShowSetup(true);
    }
  };

  const toggleCrop = (crop: string) => {
    setSelectedCrops(prev =>
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
    );
  };

  const complete = async () => {
    await AsyncStorage.setItem('onboarding_complete', 'true');
    await AsyncStorage.setItem('farm_crops', JSON.stringify(selectedCrops));
    await AsyncStorage.setItem('farm_size', selectedSize ?? '');
    router.replace('/(tabs)');
  };

  if (showSetup) {
    return (
      <View style={[styles.root, { backgroundColor: Colors.bg }]}>
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={[styles.setupContainer, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}
        >
          <View style={styles.setupHeader}>
            <View style={[styles.setupIconWrap, { backgroundColor: Colors.greenDim, borderColor: Colors.border }]}>
              <MapPin size={24} color={Colors.green} strokeWidth={2} />
            </View>
            <Text style={styles.setupTag}>FARM SETUP</Text>
            <Text style={styles.setupTitle}>Tell us about{'\n'}your farm</Text>
            <Text style={styles.setupSubtitle}>We'll personalise predictions for your specific field conditions.</Text>
          </View>

          <View style={styles.setupSection}>
            <Text style={styles.setupSectionLabel}>Select your crops</Text>
            <View style={styles.cropGrid}>
              {CROPS.map((crop, i) => {
                const selected = selectedCrops.includes(crop);
                return (
                  <MotiView
                    key={crop}
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'timing', duration: 300, delay: i * 60 }}
                  >
                    <Pressable onPress={() => toggleCrop(crop)}>
                      <MotiView
                        animate={{
                          backgroundColor: selected ? Colors.green + '22' : Colors.bgCardAlt,
                          borderColor: selected ? Colors.green + '66' : Colors.borderSubtle,
                        }}
                        transition={{ type: 'timing', duration: 150 }}
                        style={styles.cropChip}
                      >
                        {selected ? (
                          <Check size={13} color={Colors.green} strokeWidth={2.5} />
                        ) : null}
                        <Text style={[styles.cropChipLabel, { color: selected ? Colors.green : Colors.textSecondary }]}>
                          {crop}
                        </Text>
                      </MotiView>
                    </Pressable>
                  </MotiView>
                );
              })}
            </View>
          </View>

          <View style={styles.setupSection}>
            <Text style={styles.setupSectionLabel}>Farm size</Text>
            <View style={styles.sizeRow}>
              {SIZES.map((size) => {
                const selected = selectedSize === size;
                return (
                  <Pressable key={size} onPress={() => setSelectedSize(size)}>
                    <MotiView
                      animate={{
                        backgroundColor: selected ? Colors.green + '22' : Colors.bgCardAlt,
                        borderColor: selected ? Colors.green + '66' : Colors.borderSubtle,
                      }}
                      transition={{ type: 'timing', duration: 150 }}
                      style={styles.sizeChip}
                    >
                      <Text style={[styles.sizeChipLabel, { color: selected ? Colors.green : Colors.textSecondary }]}>
                        {size}
                      </Text>
                    </MotiView>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            onPress={complete}
            style={({ pressed }) => [styles.completeBtn, { opacity: pressed ? 0.85 : 1 }]}
          >
            <MotiView
              style={[styles.completeBtnInner, {
                backgroundColor: selectedCrops.length > 0 && selectedSize ? Colors.green : Colors.bgCardAlt,
              }]}
            >
              <Text style={[styles.completeBtnLabel, {
                color: selectedCrops.length > 0 && selectedSize ? '#000' : Colors.textMuted,
              }]}>
                Launch Agro-Predict
              </Text>
              <ChevronRight size={18} color={selectedCrops.length > 0 && selectedSize ? '#000' : Colors.textMuted} strokeWidth={2.5} />
            </MotiView>
          </Pressable>

          <Pressable onPress={complete} style={styles.skipSetup}>
            <Text style={styles.skipSetupLabel}>Skip setup for now</Text>
          </Pressable>
        </MotiView>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: Colors.bg }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.slideScroll}
      >
        {SLIDES.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <View key={index} style={[styles.slide, { width }]}>
              <Image
                source={slide.image}
                style={styles.slideImage}
                contentFit="cover"
                transition={400}
              />
              <View style={styles.slideOverlay} />
              <View style={[styles.slideContent, { paddingBottom: insets.bottom + 160, paddingTop: insets.top + 32 }]}>
                <MotiView
                  key={`tag-${index}-${currentSlide}`}
                  from={{ opacity: 0, translateY: -20 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, translateY: currentSlide === index ? 0 : -20 }}
                  transition={{ type: 'timing', duration: 600, delay: 200 }}
                  style={styles.slideTagRow}
                >
                  <View style={[styles.slideIconWrap, { backgroundColor: slide.accent + '22', borderColor: slide.accent + '44' }]}>
                    <Icon size={16} color={slide.accent} strokeWidth={2} />
                  </View>
                  <Text style={[styles.slideTag, { color: slide.accent }]}>{slide.tag}</Text>
                </MotiView>
                <MotiView
                  key={`title-${index}-${currentSlide}`}
                  from={{ opacity: 0, translateY: 30 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, translateY: currentSlide === index ? 0 : 30 }}
                  transition={{ type: 'timing', duration: 650, delay: 300 }}
                >
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                </MotiView>
                <MotiView
                  key={`sub-${index}-${currentSlide}`}
                  from={{ opacity: 0, translateY: 20 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, translateY: currentSlide === index ? 0 : 20 }}
                  transition={{ type: 'timing', duration: 600, delay: 450 }}
                >
                  <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                </MotiView>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <BlurView intensity={20} tint="dark" style={[styles.bottomPanel, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <MotiView
              key={i}
              animate={{
                width: currentSlide === i ? 24 : 6,
                backgroundColor: currentSlide === i ? Colors.green : Colors.textMuted,
              }}
              transition={{ type: 'timing', duration: 250 }}
              style={styles.dot}
            />
          ))}
        </View>

        <Pressable onPress={goNext} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
          <View style={styles.nextBtn}>
            <Text style={styles.nextBtnLabel}>
              {currentSlide < SLIDES.length - 1 ? 'Continue' : 'Get Started'}
            </Text>
            <ChevronRight size={20} color="#000" strokeWidth={2.5} />
          </View>
        </Pressable>

        {currentSlide < SLIDES.length - 1 ? (
          <Pressable onPress={complete} style={styles.skipBtn}>
            <Text style={styles.skipLabel}>Skip</Text>
          </Pressable>
        ) : null}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  slideScroll: {
    flex: 1,
  },
  slide: {
    flex: 1,
    height,
  },
  slideImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 17, 23, 0.62)',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  slideTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slideIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideTag: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  slideTitle: {
    fontSize: 40,
    color: Colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: 46,
  },
  slideSubtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    fontWeight: '500',
    lineHeight: 22,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    overflow: 'hidden',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    borderRadius: Radius.md,
    height: 54,
    gap: 6,
  },
  nextBtnLabel: {
    fontSize: FontSize.base,
    color: '#000',
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  skipLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  setupContainer: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
  },
  setupHeader: {
    gap: Spacing.sm,
  },
  setupIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  setupTag: {
    fontSize: FontSize.xs,
    color: Colors.green,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  setupTitle: {
    fontSize: FontSize.xxl,
    color: Colors.textPrimary,
    fontWeight: '800',
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  setupSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
    lineHeight: 20,
  },
  setupSection: {
    gap: Spacing.md,
  },
  setupSectionLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  cropChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  cropChipLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sizeChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  sizeChipLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  completeBtn: {
    marginTop: Spacing.md,
  },
  completeBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    height: 54,
    gap: 6,
  },
  completeBtnLabel: {
    fontSize: FontSize.base,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  skipSetup: {
    alignItems: 'center',
  },
  skipSetupLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
