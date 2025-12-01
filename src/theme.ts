import { StyleSheet, PixelRatio } from 'react-native';

export const hairline = StyleSheet.hairlineWidth || 1 / PixelRatio.get();
export const subtleBorder = 'rgba(255, 255, 255, 0.18)';
export const cardBG = 'rgba(255, 255, 255, 0.58)';
export const bgSoft = 'rgba(255, 255, 255, 0.6)';

export default {
  hairline,
  subtleBorder,
  cardBG,
  bgSoft,
};
