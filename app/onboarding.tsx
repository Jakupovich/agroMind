import React, { useState, useRef, useEffect } from 'react';
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
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { MapPin, Cpu, Shield, ChevronRight, Check, Leaf } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    image: require('@/assets/images/onboarding-1.jpg'),
    tag: 'SMART FARMING',
    title: "Know Your\nField's Future",
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
  
  // Slide State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  
  // Form State
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Load initial location if available
  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem("user_location");
        if (savedLocation) {
          const { coords } = JSON.parse(savedLocation);
          const newRegion = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          setMapRegion(newRegion);
          setMarkerPosition(coords);
        }
      } catch (e) {
        console.error("Failed to load location", e);
      }
    };
    loadSavedLocation();
  }, []);

  const handleMapPress = (e: MapPressEvent) => {
    setMarkerPosition(e.nativeEvent.coordinate);
  };

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
    if (markerPosition) {
      await AsyncStorage.setItem('farm_location', JSON.stringify(markerPosition));
    }
    router.replace('/(tabs)');
  };

  if (showSetup) {
    return (
      <ScrollView 
        style={[styles.root, { backgroundColor: Colors.bg }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={[styles.setupContainer, { paddingTop: insets.top + 32 }]}
        >
          <View style={styles.setupHeader}>
            <View style={[styles.setupIconWrap, { backgroundColor: Colors.greenDim, borderColor: Colors.border }]}>
              <MapPin size={24} color={Colors.green} strokeWidth={2} />
            </View>
            <Text style={styles.setupTag}>FARM SETUP</Text>
            <Text style={styles.setupTitle}>Tell us about{'\n'}your farm</Text>
            <Text style={styles.setupSubtitle}>We'll personalise predictions for your specific field conditions.</Text>
          </View>

          {/* Crop Selection */}
          <View style={styles.setupSection}>
            <Text style={styles.setupSectionLabel}>Select your crops</Text>
            <View style={styles.cropGrid}>
              {CROPS.map((crop, i) => {
                const selected = selectedCrops.includes(crop);
                return (
                  <Pressable key={crop} onPress={() => toggleCrop(crop)}>
                    <MotiView
                      animate={{
                        backgroundColor: selected ? Colors.green + '22' : Colors.bgCardAlt,
                        borderColor: selected ? Colors.green + '66' : Colors.borderSubtle,
                      }}
                      style={styles.cropChip}
                    >
                      {selected && <Check size={13} color={Colors.green} strokeWidth={2.5} />}
                      <Text style={[styles.cropChipLabel, { color: selected ? Colors.green : Colors.textSecondary }]}>
                        {crop}
                      </Text>
                    </MotiView>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Map Section */}
          <View style={styles.setupSection}>
            <Text style={styles.setupSectionLabel}>Field Location</Text>
            <MotiView style={styles.mapContainer}>
              <View style={styles.mapWrapper}>
                <View style={styles.mapHeaderOverlay}>
                   <View style={styles.lwTitleRow}>
                    <Leaf size={14} color={Colors.green} />
                    <Text style={styles.lwTitle}>Satellite Mapping</Text>
                  </View>
                </View>
                <MapView
                  mapType="satellite"
                  style={styles.map}
                  region={mapRegion}
                  onPress={handleMapPress}
                >
                  {markerPosition && (
                    <Marker coordinate={markerPosition}>
                      <View style={styles.customMarker}>
                        <View style={styles.markerCore} />
                      </View>
                    </Marker>
                  )}
                </MapView>
                <View style={styles.mapFooter}>
                  <Text style={styles.mapCoordinates}>
                    {markerPosition 
                      ? `${markerPosition.latitude.toFixed(4)}, ${markerPosition.longitude.toFixed(4)}` 
                      : "Tap map to set field center"}
                  </Text>
                </View>
              </View>
            </MotiView>
          </View>

          {/* Farm Size */}
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

          <Pressable onPress={complete} style={styles.completeBtn}>
            <View style={[styles.completeBtnInner, { 
              backgroundColor: (selectedCrops.length > 0 && selectedSize && markerPosition) ? Colors.green : Colors.bgCardAlt 
            }]}>
              <Text style={[styles.completeBtnLabel, { 
                color: (selectedCrops.length > 0 && selectedSize && markerPosition) ? '#000' : Colors.textMuted 
              }]}>
                Launch Agro-Predict
              </Text>
              <ChevronRight size={18} color={(selectedCrops.length > 0 && selectedSize && markerPosition) ? '#000' : Colors.textMuted} />
            </View>
          </Pressable>
        </MotiView>
      </ScrollView>
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
      >
        {SLIDES.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <View key={index} style={[styles.slide, { width }]}>
              <Image source={slide.image} style={styles.slideImage} contentFit="cover" />
              <View style={styles.slideOverlay} />
              <View style={[styles.slideContent, { paddingBottom: insets.bottom + 160, paddingTop: insets.top + 32 }]}>
                <MotiView style={styles.slideTagRow}>
                  <View style={[styles.slideIconWrap, { backgroundColor: slide.accent + '22', borderColor: slide.accent + '44' }]}>
                    <Icon size={16} color={slide.accent} />
                  </View>
                  <Text style={[styles.slideTag, { color: slide.accent }]}>{slide.tag}</Text>
                </MotiView>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
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
              style={styles.dot}
            />
          ))}
        </View>

        <Pressable onPress={goNext} style={styles.nextBtn}>
          <Text style={styles.nextBtnLabel}>
            {currentSlide < SLIDES.length - 1 ? 'Continue' : 'Get Started'}
          </Text>
          <ChevronRight size={20} color="#000" />
        </Pressable>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  slide: { flex: 1, height },
  slideImage: { ...StyleSheet.absoluteFillObject },
  slideOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13, 17, 23, 0.62)' },
  slideContent: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: Spacing.lg, gap: Spacing.md },
  slideTagRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slideIconWrap: { width: 30, height: 30, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  slideTag: { fontSize: FontSize.xs, fontWeight: '800', letterSpacing: 1.8 },
  slideTitle: { fontSize: 40, color: Colors.textPrimary, fontWeight: '800', lineHeight: 46 },
  slideSubtitle: { fontSize: FontSize.base, color: Colors.textSecondary, fontWeight: '500' },
  bottomPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg, borderTopWidth: 1, borderTopColor: Colors.border },
  dotsRow: { flexDirection: 'row', gap: 6, marginBottom: Spacing.md },
  dot: { height: 6, borderRadius: 3 },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.green, borderRadius: Radius.md, height: 54, gap: 6 },
  nextBtnLabel: { fontSize: FontSize.base, color: '#000', fontWeight: '800' },
  setupContainer: { flex: 1, paddingHorizontal: Spacing.lg, gap: Spacing.xl },
  setupHeader: { gap: Spacing.sm },
  setupIconWrap: { width: 48, height: 48, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  setupTag: { fontSize: FontSize.xs, color: Colors.green, fontWeight: '800' },
  setupTitle: { fontSize: FontSize.xxl, color: Colors.textPrimary, fontWeight: '800', lineHeight: 38 },
  setupSubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  setupSection: { gap: Spacing.md },
  setupSectionLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase' },
  cropGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  cropChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1 },
  cropChipLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  sizeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  sizeChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  sizeChipLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  completeBtn: { marginTop: Spacing.lg },
  completeBtnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, borderRadius: Radius.md, gap: 8 },
  completeBtnLabel: { fontSize: FontSize.base, fontWeight: '800' },
  // Map Styles
  mapContainer: { borderRadius: Radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  mapWrapper: { backgroundColor: '#000' },
  mapHeaderOverlay: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: 12, backgroundColor: 'rgba(0,0,0,0.5)' },
  lwTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  lwTitle: { color: '#fff', fontSize: 12, fontWeight: '700' },
  map: { width: '100%', height: 250 },
  mapFooter: { padding: 8, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center' },
  mapCoordinates: { color: Colors.textMuted, fontSize: 10 },
  customMarker: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.green + '44', borderWidth: 2, borderColor: Colors.green, alignItems: 'center', justifyContent: 'center' },
  markerCore: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
});
