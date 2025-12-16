import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { authService } from '../services/auth';
import api from '../services/api';

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      await fetchBloodBanks();
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBloodBanks = async () => {
    try {
      const response = await api.get('/api/auth/me');
      setBloodBanks([]);
    } catch (error) {
      console.error('Error fetching blood banks:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const checkEligibility = () => {
    if (!user) return { eligible: false, message: 'Loading...' };

    const lastDonationDate = user.last_donation_date
      ? new Date(user.last_donation_date)
      : null;

    if (!lastDonationDate) {
      return { eligible: true, message: 'You are eligible to donate!' };
    }

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    if (lastDonationDate < threeMonthsAgo) {
      return { eligible: true, message: 'You are eligible to donate!' };
    }

    const nextEligibleDate = new Date(lastDonationDate);
    nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3);

    return {
      eligible: false,
      message: `Next eligible: ${nextEligibleDate.toLocaleDateString()}`,
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC2626" />
      </View>
    );
  }

  const eligibility = checkEligibility();

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name}!</Text>
        <Text style={styles.subGreeting}>Ready to save lives today?</Text>
      </View>

      <View
        style={[
          styles.eligibilityCard,
          eligibility.eligible ? styles.eligibleCard : styles.notEligibleCard,
        ]}
      >
        <Text style={styles.eligibilityIcon}>
          {eligibility.eligible ? '✅' : '⏳'}
        </Text>
        <View style={styles.eligibilityContent}>
          <Text style={styles.eligibilityTitle}>
            {eligibility.eligible ? 'Eligible to Donate' : 'Not Eligible Yet'}
          </Text>
          <Text style={styles.eligibilityMessage}>{eligibility.message}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user?.blood_group || 'N/A'}</Text>
          <Text style={styles.statLabel}>Blood Group</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Total Donations</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Lives Saved</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Blood Banks</Text>
        {bloodBanks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏥</Text>
            <Text style={styles.emptyText}>No blood banks found</Text>
            <Text style={styles.emptySubtext}>
              Blood banks will appear here when available
            </Text>
          </View>
        ) : (
          bloodBanks.map((bank) => (
            <TouchableOpacity key={bank.id} style={styles.bloodBankCard}>
              <View style={styles.bloodBankIcon}>
                <Text style={styles.bloodBankIconText}>🏥</Text>
              </View>
              <View style={styles.bloodBankInfo}>
                <Text style={styles.bloodBankName}>{bank.name}</Text>
                <Text style={styles.bloodBankAddress}>{bank.address}</Text>
              </View>
              <Text style={styles.bloodBankArrow}>›</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📍</Text>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Find Blood Drives</Text>
            <Text style={styles.actionSubtitle}>Nearby donation events</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📅</Text>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Book Appointment</Text>
            <Text style={styles.actionSubtitle}>Schedule your donation</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🩺</Text>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Health Tips</Text>
            <Text style={styles.actionSubtitle}>Prepare for donation</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#DC2626',
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#FEE2E2',
  },
  eligibilityCard: {
    flexDirection: 'row',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  eligibleCard: {
    backgroundColor: '#D1FAE5',
    borderWidth: 2,
    borderColor: '#10B981',
  },
  notEligibleCard: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  eligibilityIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  eligibilityContent: {
    flex: 1,
  },
  eligibilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  eligibilityMessage: {
    fontSize: 14,
    color: '#374151',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  bloodBankCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bloodBankIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bloodBankIconText: {
    fontSize: 24,
  },
  bloodBankInfo: {
    flex: 1,
  },
  bloodBankName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  bloodBankAddress: {
    fontSize: 14,
    color: '#6B7280',
  },
  bloodBankArrow: {
    fontSize: 24,
    color: '#9CA3AF',
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});
