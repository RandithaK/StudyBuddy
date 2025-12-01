import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  Polyline,
  G,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// Home Icon
export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="9,22 9,12 15,12 15,22"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Calendar Icon
export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={4}
      width={18}
      height={18}
      rx={2}
      stroke={color}
      strokeWidth={2}
    />
    <Line x1={16} y1={2} x2={16} y2={6} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={8} y1={2} x2={8} y2={6} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={3} y1={10} x2={21} y2={10} stroke={color} strokeWidth={2} />
  </Svg>
);

// Book Icon
export const BookIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5A2.5 2.5 0 016.5 17H20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// CheckSquare Icon
export const CheckSquareIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="9,11 12,14 22,4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// TrendingUp Icon
export const TrendingUpIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="23,6 13.5,15.5 8.5,10.5 1,18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="17,6 23,6 23,12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Plus Icon
export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={12} y1={5} x2={12} y2={19} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={5} y1={12} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Clock Icon
export const ClockIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Polyline
      points="12,6 12,12 16,14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// AlertCircle Icon
export const AlertCircleIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Line x1={12} y1={8} x2={12} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={12} y1={16} x2={12.01} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// User Icon
export const UserIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={2} />
  </Svg>
);

// ChevronLeft Icon
export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="15,18 9,12 15,6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ChevronRight Icon
export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="9,18 15,12 9,6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Target Icon
export const TargetIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Circle cx={12} cy={12} r={6} stroke={color} strokeWidth={2} />
    <Circle cx={12} cy={12} r={2} stroke={color} strokeWidth={2} />
  </Svg>
);

// Award Icon
export const AwardIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={8} r={6} stroke={color} strokeWidth={2} />
    <Path
      d="M9 15l-3 9 6-3 6 3-3-9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Bell Icon
export const BellIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21a2 2 0 01-3.46 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// X Icon
export const XIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={18} y1={6} x2={6} y2={18} stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1={6} y1={6} x2={18} y2={18} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Mail Icon
export const MailIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="22,6 12,13 2,6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Edit Icon
export const EditIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Lock Icon
export const LockIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={11}
      width={18}
      height={11}
      rx={2}
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M7 11V7a5 5 0 0110 0v4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// HelpCircle Icon
export const HelpCircleIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} />
    <Path
      d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1={12} y1={17} x2={12.01} y2={17} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// LogOut Icon
export const LogOutIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="16,17 21,12 16,7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1={21} y1={12} x2={9} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Palette Icon
export const PaletteIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.81-.15 2.64-.43a2 2 0 001.41-2.44l-.83-3.29c-.16-.64.12-1.31.69-1.69A8 8 0 0012 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={7.5} cy={11.5} r={1.5} fill={color} />
    <Circle cx={12} cy={7.5} r={1.5} fill={color} />
    <Circle cx={16.5} cy={11.5} r={1.5} fill={color} />
  </Svg>
);

// Tag Icon
export const TagIcon: React.FC<IconProps> = ({ size = 24, color = '#6b7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1={7} y1={7} x2={7.01} y2={7} stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// Check Icon
export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Polyline
      points="20,6 9,17 4,12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Save Icon
export const SaveIcon: React.FC<IconProps> = ({ size = 24, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="17,21 17,13 7,13 7,21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="7,3 7,8 15,8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// App Logo
export const AppLogo: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <Svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <Defs>
      <LinearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#6366f1" />
        <Stop offset="50%" stopColor="#a855f7" />
        <Stop offset="100%" stopColor="#ec4899" />
      </LinearGradient>
      <LinearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#ffffff" />
        <Stop offset="100%" stopColor="#f0f9ff" />
      </LinearGradient>
    </Defs>
    <Circle cx={80} cy={80} r={70} fill="url(#logoGradient)" opacity={0.95} />
    <G transform="translate(45, 40)">
      <Rect x={0} y={10} width={70} height={70} rx={6} fill="url(#bookGradient)" opacity={0.95} />
      <Rect x={32} y={10} width={6} height={70} fill="#e0f2fe" opacity={0.6} />
      <G transform="translate(15, 25)">
        <Path
          d="M 10 20 L 18 28 L 35 10"
          stroke="#6366f1"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
      <Line x1={15} y1={55} x2={30} y2={55} stroke="#cbd5e1" strokeWidth={2} opacity={0.5} />
      <Line x1={40} y1={55} x2={55} y2={55} stroke="#cbd5e1" strokeWidth={2} opacity={0.5} />
      <Line x1={15} y1={63} x2={30} y2={63} stroke="#cbd5e1" strokeWidth={2} opacity={0.5} />
      <Line x1={40} y1={63} x2={55} y2={63} stroke="#cbd5e1" strokeWidth={2} opacity={0.5} />
      <Line x1={15} y1={71} x2={30} y2={71} stroke="#cbd5e1" strokeWidth={2} opacity={0.5} />
      <Line x1={40} y1={71} x2={55} y2={71} stroke="#cbd5e1" strokeWidth={2} opacity={0.5} />
    </G>
    <Circle cx={130} cy={40} r={3} fill="#fbbf24" opacity={0.8} />
    <Circle cx={30} cy={120} r={2.5} fill="#fbbf24" opacity={0.6} />
    <Circle cx={140} cy={100} r={2} fill="#fbbf24" opacity={0.7} />
  </Svg>
);
