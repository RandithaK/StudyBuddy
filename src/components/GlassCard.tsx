import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, PixelRatio } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, style, onPress }) => {
  const content = (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const hairline = StyleSheet.hairlineWidth || 1 / PixelRatio.get();

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
    borderRadius: 20,
    borderWidth: hairline,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});

export default GlassCard;
