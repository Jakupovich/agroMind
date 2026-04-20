/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  // Shared brand colors (referenced in your cards)
  green: '#22C55E',
  amber: '#F59E0B',
  red: '#EF4444',
  border: 'rgba(255, 255, 255, 0.1)',
  borderSubtle: 'rgba(255, 255, 255, 0.05)',
  
  light: {
    text: '#11181C',
    textPrimary: '#11181C',
    textSecondary: '#687076',
    background: '#fff',
    bgCardAlt: '#F4F4F5',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    textPrimary: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#151718',
    bgCardAlt: 'rgba(255, 255, 255, 0.05)',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Supporting constants for your components
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
};

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  hero: 48,
};
