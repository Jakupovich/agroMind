<<<<<<< HEAD
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
=======
import { Colors, FontSize, Radius, Spacing } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Check,
  ChevronRight,
  Cpu,
  Leaf,
  MapPin,
  Shield,
} from "lucide-react-native";
import { MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    image: require("@/assets/images/onboarding-1.jpg"),
    tag: "SMART FARMING",
    title: "Know Your\nField's Future",
    subtitle:
      "AI-powered climate analysis tailored to your exact field location and crop variety.",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    accent: Colors.green,
    icon: MapPin,
  },
  {
<<<<<<< HEAD
    image: require('@/assets/images/onboarding-2.jpg'),
    tag: 'AI ENGINE',
    title: 'Predict Before\nRisks Arrive',
    subtitle: 'Ensemble models trained on 20 years of regional climate data deliver 91% forecast accuracy.',
=======
    image: require("@/assets/images/onboarding-2.jpg"),
    tag: "AI ENGINE",
    title: "Predict Before\nRisks Arrive",
    subtitle:
      "Ensemble models trained on 20 years of regional climate data deliver 91% forecast accuracy.",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    accent: Colors.amber,
    icon: Cpu,
  },
  {
<<<<<<< HEAD
    image: require('@/assets/images/onboarding-3.jpg'),
    tag: 'HAILGUARD',
    title: 'Automated\nPlant Protection',
    subtitle: 'Smart hardware deploys hail shields the moment sensors detect incoming storm cells.',
=======
    image: require("@/assets/images/onboarding-3.jpg"),
    tag: "HAILGUARD",
    title: "Automated\nPlant Protection",
    subtitle:
      "Smart hardware deploys hail shields the moment sensors detect incoming storm cells.",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    accent: Colors.green,
    icon: Shield,
  },
];

<<<<<<< HEAD
const CROPS = ['Corn', 'Wheat', 'Soybeans', 'Barley', 'Rapeseed', 'Potatoes'];
const SIZES = ['< 5 ha', '5–20 ha', '20–50 ha', '50–100 ha', '> 100 ha'];

export default function OnboardingScreen() {
=======
const CROPS = ["Corn", "Wheat", "Soybeans", "Barley", "Rapeseed", "Potatoes"];
const SIZES = ["< 5 ha", "5–20 ha", "20–50 ha", "50–100 ha", "> 100 ha"];

export default function OnboardingScreen() {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [mapRegion, setmapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const handleMapPress = (e: MapPressEvent): void => {
    const { coordinate } = e.nativeEvent;
    setMarkerPosition(coordinate);
  };
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5;
  
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem("user_location");
        
        if (savedLocation) {
          const { coords } = JSON.parse(savedLocation);
          setmapRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
          setMarkerPosition(coords);
        } else if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadSavedLocation, 2000); 
        }
      } catch (e) {
        console.error("Failed to load location", e);
      }
    };
  
    loadSavedLocation();
  }, []);
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
<<<<<<< HEAD
  const [farmName, setFarmName] = useState('');
=======
  const [farmName, setFarmName] = useState("");
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a

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
<<<<<<< HEAD
    setSelectedCrops(prev =>
      prev.includes(crop) ? prev.filter(c => c !== crop) : [...prev, crop]
=======
    setSelectedCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    );
  };

  const complete = async () => {
<<<<<<< HEAD
    await AsyncStorage.setItem('onboarding_complete', 'true');
    await AsyncStorage.setItem('farm_crops', JSON.stringify(selectedCrops));
    await AsyncStorage.setItem('farm_size', selectedSize ?? '');
    router.replace('/(tabs)');
=======
    await AsyncStorage.setItem("onboarding_complete", "true");
    await AsyncStorage.setItem("farm_crops", JSON.stringify(selectedCrops));
    await AsyncStorage.setItem("farm_size", selectedSize ?? "");
    router.replace("/(tabs)");
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
  };

  if (showSetup) {
    return (
<<<<<<< HEAD
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
=======
      <ScrollView style={[styles.root, { backgroundColor: Colors.bg }]}>
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={[
            styles.setupContainer,
            { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 },
          ]}
        >
          <View style={styles.setupHeader}>
            <View
              style={[
                styles.setupIconWrap,
                {
                  backgroundColor: Colors.greenDim,
                  borderColor: Colors.border,
                },
              ]}
            >
              <MapPin size={24} color={Colors.green} strokeWidth={2} />
            </View>
            <Text style={styles.setupTag}>FARM SETUP</Text>
            <Text style={styles.setupTitle}>Tell us about{"\n"}your farm</Text>
            <Text style={styles.setupSubtitle}>
              We'll personalise predictions for your specific field conditions.
            </Text>
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
                    transition={{ type: 'timing', duration: 300, delay: i * 60 }}
=======
                    transition={{
                      type: "timing",
                      duration: 300,
                      delay: i * 60,
                    }}
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
                  >
                    <Pressable onPress={() => toggleCrop(crop)}>
                      <MotiView
                        animate={{
<<<<<<< HEAD
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
=======
                          backgroundColor: selected
                            ? Colors.green + "22"
                            : Colors.bgCardAlt,
                          borderColor: selected
                            ? Colors.green + "66"
                            : Colors.borderSubtle,
                        }}
                        transition={{ type: "timing", duration: 150 }}
                        style={styles.cropChip}
                      >
                        {selected ? (
                          <Check
                            size={13}
                            color={Colors.green}
                            strokeWidth={2.5}
                          />
                        ) : null}
                        <Text
                          style={[
                            styles.cropChipLabel,
                            {
                              color: selected
                                ? Colors.green
                                : Colors.textSecondary,
                            },
                          ]}
                        >
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
                        backgroundColor: selected ? Colors.green + '22' : Colors.bgCardAlt,
                        borderColor: selected ? Colors.green + '66' : Colors.borderSubtle,
                      }}
                      transition={{ type: 'timing', duration: 150 }}
                      style={styles.sizeChip}
                    >
                      <Text style={[styles.sizeChipLabel, { color: selected ? Colors.green : Colors.textSecondary }]}>
=======
                        backgroundColor: selected
                          ? Colors.green + "22"
                          : Colors.bgCardAlt,
                        borderColor: selected
                          ? Colors.green + "66"
                          : Colors.borderSubtle,
                      }}
                      transition={{ type: "timing", duration: 150 }}
                      style={styles.sizeChip}
                    >
                      <Text
                        style={[
                          styles.sizeChipLabel,
                          {
                            color: selected
                              ? Colors.green
                              : Colors.textSecondary,
                          },
                        ]}
                      >
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
                        {size}
                      </Text>
                    </MotiView>
                  </Pressable>
                );
              })}
            </View>
          </View>
<<<<<<< HEAD

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
=======
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 600, delay: 200 }}
            style={styles.mapContainer}
          >
            <BlurView intensity={20} tint="dark" style={styles.mapWrapper}>
              <View style={styles.mapHeader}>
                <View style={styles.lwTitleRow}>
                  <Leaf size={14} color={Colors.green} strokeWidth={2} />
                  <Text style={styles.lwTitle}>Field Mapping</Text>
                </View>
                <View style={styles.satelliteBadge}>
                  <Text style={styles.satelliteText}>SATELLITE</Text>
                </View>
              </View>

              <MapView
                mapType="satellite"
                style={styles.map}
                region={mapRegion}
                onPress={handleMapPress}
                // Custom map padding so Google/Apple logos don't overlap your UI
                mapPadding={{ top: 0, right: 0, bottom: 20, left: 0 }}
              >
                {markerPosition && (
                  <Marker
                    coordinate={markerPosition}
                    pinColor={Colors.green} // Match app theme
                  >
                    <MotiView
                      from={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={styles.customMarker}
                    >
                      <View style={styles.markerCore} />
                    </MotiView>
                  </Marker>
                )}
              </MapView>

              <View style={styles.mapFooter}>
                <Text style={styles.mapCoordinates}>
                  {markerPosition
                    ? `${markerPosition.latitude.toFixed(
                        4
                      )}, ${markerPosition.longitude.toFixed(4)}`
                    : "Tap map to set boundary"}
                </Text>
              </View>
            </BlurView>
          </MotiView>
          <Pressable
            onPress={complete}
            style={({ pressed }) => [
              styles.completeBtn,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <MotiView
              style={[
                styles.completeBtnInner,
                {
                  backgroundColor:
                    selectedCrops.length > 0 && selectedSize
                      ? Colors.green
                      : Colors.bgCardAlt,
                },
              ]}
            >
              <Text
                style={[
                  styles.completeBtnLabel,
                  {
                    color:
                      selectedCrops.length > 0 && selectedSize
                        ? "#000"
                        : Colors.textMuted,
                  },
                ]}
              >
                Launch Agro-Predict
              </Text>
              <ChevronRight
                size={18}
                color={
                  selectedCrops.length > 0 && selectedSize
                    ? "#000"
                    : Colors.textMuted
                }
                strokeWidth={2.5}
              />
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
            </MotiView>
          </Pressable>

          <Pressable onPress={complete} style={styles.skipSetup}>
            <Text style={styles.skipSetupLabel}>Skip setup for now</Text>
          </Pressable>
        </MotiView>
<<<<<<< HEAD
      </View>
=======
      </ScrollView>
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
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
=======
              <View
                style={[
                  styles.slideContent,
                  {
                    paddingBottom: insets.bottom + 160,
                    paddingTop: insets.top + 32,
                  },
                ]}
              >
                <MotiView
                  key={`tag-${index}-${currentSlide}`}
                  from={{ opacity: 0, translateY: -20 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    translateY: currentSlide === index ? 0 : -20,
                  }}
                  transition={{ type: "timing", duration: 600, delay: 200 }}
                  style={styles.slideTagRow}
                >
                  <View
                    style={[
                      styles.slideIconWrap,
                      {
                        backgroundColor: slide.accent + "22",
                        borderColor: slide.accent + "44",
                      },
                    ]}
                  >
                    <Icon size={16} color={slide.accent} strokeWidth={2} />
                  </View>
                  <Text style={[styles.slideTag, { color: slide.accent }]}>
                    {slide.tag}
                  </Text>
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
                </MotiView>
                <MotiView
                  key={`title-${index}-${currentSlide}`}
                  from={{ opacity: 0, translateY: 30 }}
<<<<<<< HEAD
                  animate={{ opacity: currentSlide === index ? 1 : 0, translateY: currentSlide === index ? 0 : 30 }}
                  transition={{ type: 'timing', duration: 650, delay: 300 }}
=======
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    translateY: currentSlide === index ? 0 : 30,
                  }}
                  transition={{ type: "timing", duration: 650, delay: 300 }}
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
                >
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                </MotiView>
                <MotiView
                  key={`sub-${index}-${currentSlide}`}
                  from={{ opacity: 0, translateY: 20 }}
<<<<<<< HEAD
                  animate={{ opacity: currentSlide === index ? 1 : 0, translateY: currentSlide === index ? 0 : 20 }}
                  transition={{ type: 'timing', duration: 600, delay: 450 }}
=======
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    translateY: currentSlide === index ? 0 : 20,
                  }}
                  transition={{ type: "timing", duration: 600, delay: 450 }}
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
                >
                  <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                </MotiView>
              </View>
            </View>
          );
        })}
      </ScrollView>

<<<<<<< HEAD
      <BlurView intensity={20} tint="dark" style={[styles.bottomPanel, { paddingBottom: insets.bottom + 24 }]}>
=======
      <BlurView
        intensity={20}
        tint="dark"
        style={[styles.bottomPanel, { paddingBottom: insets.bottom + 24 }]}
      >
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <MotiView
              key={i}
              animate={{
                width: currentSlide === i ? 24 : 6,
<<<<<<< HEAD
                backgroundColor: currentSlide === i ? Colors.green : Colors.textMuted,
              }}
              transition={{ type: 'timing', duration: 250 }}
=======
                backgroundColor:
                  currentSlide === i ? Colors.green : Colors.textMuted,
              }}
              transition={{ type: "timing", duration: 250 }}
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
              style={styles.dot}
            />
          ))}
        </View>

<<<<<<< HEAD
        <Pressable onPress={goNext} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}>
          <View style={styles.nextBtn}>
            <Text style={styles.nextBtnLabel}>
              {currentSlide < SLIDES.length - 1 ? 'Continue' : 'Get Started'}
=======
        <Pressable
          onPress={goNext}
          style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
        >
          <View style={styles.nextBtn}>
            <Text style={styles.nextBtnLabel}>
              {currentSlide < SLIDES.length - 1 ? "Continue" : "Get Started"}
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
=======
  lwHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lwTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  lwTitle: {
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  lwLiveDot: { width: 6, height: 6, borderRadius: 3 },
  lwLiveLabel: {
    fontSize: 9,
    color: Colors.green,
    fontWeight: "800",
    letterSpacing: 1,
  },
  mapContainer: {
    marginVertical: Spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  mapWrapper: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden", // Crucial for rounded map corners
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)", // Dark overlay for readability
  },
  map: {
    width: "100%",
    height: 350, // Slightly shorter for better dashboard balance
  },
  mapFooter: {
    padding: Spacing.sm,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  mapCoordinates: {
    fontSize: 10,
    color: Colors.textMuted,
    fontFamily: "System", // Use monospace if available
    letterSpacing: 1,
  },
  satelliteBadge: {
    backgroundColor: Colors.green + "22",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.green + "44",
  },
  satelliteText: {
    color: Colors.green,
    fontSize: 9,
    fontWeight: "800",
  },
  // Custom Marker Style
  customMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.green + "44",
    borderWidth: 2,
    borderColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  markerCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
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
=======
    width: "100%",
    height: "100%",
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(13, 17, 23, 0.62)",
  },
  slideContent: {
    flex: 1,
    justifyContent: "flex-end",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  slideTagRow: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    gap: 8,
  },
  slideIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideTag: {
    fontSize: FontSize.xs,
    fontWeight: '800',
=======
    alignItems: "center",
    justifyContent: "center",
  },
  slideTag: {
    fontSize: FontSize.xs,
    fontWeight: "800",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    letterSpacing: 1.8,
  },
  slideTitle: {
    fontSize: 40,
    color: Colors.textPrimary,
<<<<<<< HEAD
    fontWeight: '800',
=======
    fontWeight: "800",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    letterSpacing: -1.2,
    lineHeight: 46,
  },
  slideSubtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
<<<<<<< HEAD
    fontWeight: '500',
    lineHeight: 22,
  },
  bottomPanel: {
    position: 'absolute',
=======
    fontWeight: "500",
    lineHeight: 22,
  },
  bottomPanel: {
    position: "absolute",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
<<<<<<< HEAD
    overflow: 'hidden',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
=======
    overflow: "hidden",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  nextBtn: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    backgroundColor: Colors.green,
    borderRadius: Radius.md,
    height: 54,
    gap: 6,
  },
  nextBtnLabel: {
    fontSize: FontSize.base,
<<<<<<< HEAD
    color: '#000',
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  skipBtn: {
    alignItems: 'center',
=======
    color: "#000",
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  skipBtn: {
    alignItems: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    paddingVertical: 6,
  },
  skipLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
<<<<<<< HEAD
    fontWeight: '600',
=======
    fontWeight: "600",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
    alignItems: 'center',
    justifyContent: 'center',
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    marginBottom: Spacing.sm,
  },
  setupTag: {
    fontSize: FontSize.xs,
    color: Colors.green,
<<<<<<< HEAD
    fontWeight: '800',
=======
    fontWeight: "800",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    letterSpacing: 1.8,
  },
  setupTitle: {
    fontSize: FontSize.xxl,
    color: Colors.textPrimary,
<<<<<<< HEAD
    fontWeight: '800',
=======
    fontWeight: "800",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    letterSpacing: -0.8,
    lineHeight: 38,
  },
  setupSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
<<<<<<< HEAD
    fontWeight: '500',
=======
    fontWeight: "500",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    lineHeight: 20,
  },
  setupSection: {
    gap: Spacing.md,
  },
  setupSectionLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
<<<<<<< HEAD
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
=======
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  cropGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  cropChip: {
    flexDirection: "row",
    alignItems: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  cropChipLabel: {
    fontSize: FontSize.sm,
<<<<<<< HEAD
    fontWeight: '600',
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
=======
    fontWeight: "600",
  },
  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
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
<<<<<<< HEAD
    fontWeight: '600',
=======
    fontWeight: "600",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
  },
  completeBtn: {
    marginTop: Spacing.md,
  },
  completeBtnInner: {
<<<<<<< HEAD
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
=======
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
    borderRadius: Radius.md,
    height: 54,
    gap: 6,
  },
  completeBtnLabel: {
    fontSize: FontSize.base,
<<<<<<< HEAD
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  skipSetup: {
    alignItems: 'center',
=======
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  skipSetup: {
    alignItems: "center",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
  },
  skipSetupLabel: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
<<<<<<< HEAD
    fontWeight: '600',
=======
    fontWeight: "600",
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
  },
});
