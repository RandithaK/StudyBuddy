import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { AppLogo, TargetIcon, TrendingUpIcon, CalendarIcon } from '../components/Icons';
import GlassCard from '../components/GlassCard';
import LinearGradient from 'react-native-linear-gradient';

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim1 = useRef(new Animated.Value(-100)).current;
  const slideAnim2 = useRef(new Animated.Value(-100)).current;
  const slideAnim3 = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(150, [
        Animated.spring(slideAnim1, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim2, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim3, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated background blobs */}
      <View style={styles.blobContainer}>
        <LinearGradient
          colors={['#c4b5fd', '#a78bfa']}
          style={[styles.blob, styles.blob1]}
        />
        <LinearGradient
          colors={['#93c5fd', '#60a5fa']}
          style={[styles.blob, styles.blob2]}
        />
        <LinearGradient
          colors={['#a5b4fc', '#818cf8']}
          style={[styles.blob, styles.blob3]}
        />
      </View>

      <View style={styles.content}>
        {/* App Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <AppLogo size={160} />
        </Animated.View>

        {/* App Title */}
        <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Study Planner</Text>
          <Text style={styles.subtitle}>Organize. Focus. Succeed.</Text>
        </Animated.View>

        {/* Feature Cards */}
        <View style={styles.cardsContainer}>
          <Animated.View style={{ transform: [{ translateX: slideAnim1 }] }}>
            <GlassCard style={styles.featureCard}>
              <LinearGradient
                colors={['#60a5fa', '#06b6d4']}
                style={styles.iconContainer}
              >
                <TargetIcon size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Track Your Goals</Text>
                <Text style={styles.featureDescription}>
                  Stay on top of deadlines
                </Text>
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateX: slideAnim2 }] }}>
            <GlassCard style={styles.featureCard}>
              <LinearGradient
                colors={['#a78bfa', '#ec4899']}
                style={styles.iconContainer}
              >
                <TrendingUpIcon size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Monitor Progress</Text>
                <Text style={styles.featureDescription}>
                  Visualize your achievements
                </Text>
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View style={{ transform: [{ translateX: slideAnim3 }] }}>
            <GlassCard style={styles.featureCard}>
              <LinearGradient
                colors={['#4ade80', '#10b981']}
                style={styles.iconContainer}
              >
                <CalendarIcon size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Plan Your Schedule</Text>
                <Text style={styles.featureDescription}>
                  Manage your time effectively
                </Text>
              </View>
            </GlassCard>
          </Animated.View>
        </View>

        {/* Continue Button */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={onContinue} activeOpacity={0.8}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.continueButton}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  blobContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.6,
  },
  blob1: {
    top: -50,
    left: -50,
    width: 250,
    height: 250,
  },
  blob2: {
    top: -30,
    right: -50,
    width: 250,
    height: 250,
  },
  blob3: {
    bottom: 100,
    left: 20,
    width: 250,
    height: 250,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
  },
  cardsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  buttonContainer: {
    width: '100%',
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SplashScreen;
