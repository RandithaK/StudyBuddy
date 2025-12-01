import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import {
  ChevronLeftIcon,
  HelpCircleIcon,
} from '../components/Icons';

interface DeveloperContactScreenProps {
  onBack: () => void;
}

const DeveloperContactScreen: React.FC<DeveloperContactScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Developer Contact</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <LinearGradient
              colors={['#3b82f6', '#6366f1']}
              style={styles.iconContainer}
            >
              <HelpCircleIcon size={32} color="#fff" />
            </LinearGradient>
            <Text style={styles.cardTitle}>About the Team</Text>
            <Text style={styles.cardSubtitle}>
              Meet the minds behind StudyBuddy
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>GitHub Repositories</Text>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => Linking.openURL('https://github.com/RandithaK/StudyBuddy_Backend')}
            >
              <Text style={styles.linkText}>StudyBuddy_Backend</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.linkItem}
              onPress={() => Linking.openURL('https://github.com/RandithaK/StudyBuddy')}
            >
              <Text style={styles.linkText}>StudyBuddy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Application Designers</Text>
            <View style={styles.designersList}>
              <Text style={styles.designerName}>B.H.A.R. Kulasekera</Text>
              <Text style={styles.designerName}>B.A.A. Chandinu</Text>
              <Text style={styles.designerName}>A.G.A.B. Wimalasuriya</Text>
              <Text style={styles.designerName}>P.P.N. Samarawickrama</Text>
              <Text style={styles.designerName}>S.M.C.S. Senanayaka</Text>
            </View>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: hairline,
    borderBottomColor: subtleBorder,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  card: {
    padding: 24,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linkItem: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  separator: {
    height: 1,
    backgroundColor: subtleBorder,
    marginVertical: 24,
  },
  designersList: {
    gap: 12,
  },
  designerName: {
    fontSize: 16,
    color: '#374151',
    paddingVertical: 4,
  },
});

export default DeveloperContactScreen;
