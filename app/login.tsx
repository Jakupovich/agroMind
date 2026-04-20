import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { useAuth } from '@/theme/auth/supabase/hook';
import { useAlert } from '@/theme/ui/hook';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';
import { router } from 'expo-router';

// Izbačen 'otp' mode
type Mode = 'login' | 'register';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  // Izbačeni sendOTP i verifyOTP jer nam više ne trebaju
  const { signInWithPassword, signUpWithPassword, operationLoading } = useAuth();
  const { showAlert } = useAlert();

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      showAlert('Missing Fields', 'Please enter your email and password.');
      return;
    }
    const { error } = await signInWithPassword(email.trim(), password);
    if (error) showAlert('Login Failed', error);
    else {
      router.replace('/(tabs)');
    }
  };

  const handleRegister = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      showAlert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      showAlert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    // DIREKTNA REGISTRACIJA bez OTP-a
    const { error } = await signUpWithPassword(email.trim(), password);

    showAlert('Success', 'Account created successfully! Check your email for confirmation link.');
    setMode('login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: Colors.bg }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image
        source={require('@/assets/images/onboarding-1.jpg')}
        style={styles.bgImage}
        contentFit="cover"
        transition={400}
      />
      <View style={styles.overlay} />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.logoBlock}
        >
          <View style={styles.logoIconWrap}>
            <Leaf size={28} color={Colors.green} strokeWidth={2} />
          </View>
          <Text style={styles.logoText}>AGRO-PREDICT</Text>
          <Text style={styles.logoSub}>AI-Powered Farm Intelligence</Text>
        </MotiView>

        <MotiView
          key={mode}
          from={{ opacity: 0, translateY: 32, scale: 0.97 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <BlurView intensity={24} tint="dark" style={styles.card}>
            <View style={styles.modeToggleRow}>
              {(['login', 'register'] as Mode[]).map((m) => (
                <Pressable key={m} onPress={() => setMode(m)} style={styles.modeToggleBtn}>
                  <MotiView
                    animate={{
                      backgroundColor: mode === m ? Colors.green + '22' : 'transparent',
                      borderColor: mode === m ? Colors.green + '55' : 'transparent',
                    }}
                    transition={{ type: 'timing', duration: 200 }}
                    style={styles.modeToggleBtnInner}
                  >
                    <Text style={[styles.modeToggleLabel, { color: mode === m ? Colors.green : Colors.textSecondary }]}>
                      {m === 'login' ? 'Sign In' : 'Register'}
                    </Text>
                  </MotiView>
                </Pressable>
              ))}
            </View>

            <View style={styles.fields}>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Email Address</Text>
                <View style={styles.inputRow}>
                  <Mail size={16} color={Colors.textMuted} strokeWidth={1.8} />
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="farmer@example.com"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Password</Text>
                <View style={styles.inputRow}>
                  <Lock size={16} color={Colors.textMuted} strokeWidth={1.8} />
                  <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Min. 6 characters"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
                    {showPassword ? (
                      <EyeOff size={16} color={Colors.textMuted} strokeWidth={1.8} />
                    ) : (
                      <Eye size={16} color={Colors.textMuted} strokeWidth={1.8} />
                    )}
                  </Pressable>
                </View>
              </View>

              {mode === 'register' && (
                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldLabel}>Confirm Password</Text>
                  <View style={styles.inputRow}>
                    <Lock size={16} color={Colors.textMuted} strokeWidth={1.8} />
                    <TextInput
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Re-enter password"
                      placeholderTextColor={Colors.textMuted}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>
              )}
            </View>

            <Pressable
              onPress={mode === 'login' ? handleLogin : handleRegister}
              disabled={operationLoading}
              style={({ pressed }) => [{ opacity: pressed || operationLoading ? 0.82 : 1 }]}
            >
              <View style={styles.submitBtn}>
                {operationLoading ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <>
                    <Text style={styles.submitLabel}>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </Text>
                    <ArrowRight size={18} color="#000" strokeWidth={2.5} />
                  </>
                )}
              </View>
            </Pressable>

            <View style={styles.secureRow}>
              <ShieldCheck size={12} color={Colors.textMuted} strokeWidth={2} />
              <Text style={styles.secureText}>Secured with Supabase Auth · End-to-end encrypted</Text>
            </View>
          </BlurView>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bgImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,17,23,0.75)' },
  scroll: { paddingHorizontal: Spacing.md, gap: Spacing.xl },
  logoBlock: { alignItems: 'center', gap: Spacing.sm, paddingTop: Spacing.xl },
  logoIconWrap: {
    width: 64, height: 64, borderRadius: 22,
    backgroundColor: Colors.green + '1A', borderWidth: 1, borderColor: Colors.green + '44',
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: '800', letterSpacing: 3,
  },
  logoSub: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  card: {
    borderRadius: Radius.xl, borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.lg, gap: Spacing.lg, overflow: 'hidden',
  },
  modeToggleRow: {
    flexDirection: 'row', backgroundColor: Colors.bgCardAlt,
    borderRadius: Radius.sm, padding: 4, borderWidth: 1, borderColor: Colors.borderSubtle,
  },
  modeToggleBtn: { flex: 1 },
  modeToggleBtnInner: { paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  modeToggleLabel: { fontSize: FontSize.sm, fontWeight: '700' },
  fields: { gap: Spacing.md },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.bgCardAlt, borderRadius: Radius.sm,
    borderWidth: 1, borderColor: Colors.borderSubtle, paddingHorizontal: 14, paddingVertical: 14,
  },
  input: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary, fontWeight: '500' },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.green, borderRadius: Radius.md, height: 54, gap: 8,
  },
  submitLabel: { fontSize: FontSize.base, color: '#000', fontWeight: '800', letterSpacing: 0.2 },
  secureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 10 },
  secureText: { fontSize: 10, color: Colors.textMuted, fontWeight: '500' },
});