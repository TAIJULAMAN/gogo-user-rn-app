import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [hasTaxDetails, setHasTaxDetails] = useState(false);
  const [isTaxModalVisible, setIsTaxModalVisible] = useState(false);

  // Form states
  const [trnNo, setTrnNo] = useState('');
  const [trnAddress, setTrnAddress] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleConfirmTax = () => {
    setHasTaxDetails(true);
    setIsTaxModalVisible(false);
  };

  const handleLogout = () => {
     // User logout logic here (e.g., clearing async storage or context)
     router.replace('/(auth)/sign-in');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Background watermark icon (simulated) */}
        <View style={styles.watermarkContainer}>
           <Ionicons name="person-circle-outline" size={240} color="#E2E8F0" style={{ opacity: 0.3, transform: [{ rotate: '-15deg' }] }} />
        </View>

        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity 
             style={styles.viewProfileBtn}
             onPress={() => router.replace('/(user)/profile-details')}
          >
            <Text style={styles.viewProfileText}>Edit</Text>
            <Ionicons name="chevron-forward" size={14} color="#0052cc" style={{marginTop: 1}} />
          </TouchableOpacity>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>RH</Text>
            </View>
            <View style={styles.avatarBadge}>
              <Ionicons name="star" size={12} color="#FFF" />
            </View>
          </View>

          <Text style={styles.userName}>Roshan Hegde</Text>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>hshaaj@gmail.com</Text>
            {hasTaxDetails ? (
              <Ionicons name="checkmark-circle" size={16} color="#00C853" style={styles.verifiedIcon} />
            ) : (
              <TouchableOpacity style={styles.verifyBtn}>
                 <Text style={styles.verifyText}>Verify</Text>
              </TouchableOpacity>
            )}
          </View>

          {hasTaxDetails ? (
            <View style={styles.trnBadgeContainer}>
              <Text style={styles.trnBadgeText}>TRN: {trnNo || '104143405900003'}</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addTaxBtn}
              onPress={() => setIsTaxModalVisible(true)}
            >
              <Ionicons name="document-text" size={18} color="#0052cc" />
              <Text style={styles.addTaxBtnText}>Add Tax Details</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Two Card Row */}
        <View style={styles.twoCardRow}>
          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => router.push('/(user)/user/address-book')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F0F9FF' }]}>
              <Ionicons name="location" size={22} color="#0284C7" />
            </View>
            <Text style={styles.gridCardText}>Saved Addresses</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => router.push('/(user)/user/help-center')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="headset" size={22} color="#DC2626" />
            </View>
            <Text style={styles.gridCardText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Refer and Earn Card */}
        <View style={styles.referCard}>
          <View style={styles.referCardLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#FEF9C3', marginBottom: 0 }]}>
              <Ionicons name="gift" size={22} color="#CA8A04" />
            </View>
            <View style={styles.referTextCombo}>
              <Text style={styles.referTitle}>Refer and earn</Text>
              <Text style={styles.referSubtitle}>Get AED 10 for each friend</Text>
            </View>
          </View>
          <View style={styles.referCardRight}>
             <TouchableOpacity 
               style={styles.inviteBtn}
               onPress={() => router.push('/(user)/user/referral')}
             >
               <Ionicons name="share-social" size={16} color="#fff" />
               <Text style={styles.inviteBtnText}>Invite</Text>
             </TouchableOpacity>
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuList}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/(user)/user/edit-profile')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="settings" size={20} color="#475569" />
            </View>
            <Text style={styles.menuItemText}>Account Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>
          
          <View style={styles.menuDivider} />

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/(user)/user/terms-of-service')}
          >
            <View style={[styles.menuIconCircle, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="document-text" size={20} color="#475569" />
            </View>
            <Text style={styles.menuItemText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.menuIconCircle, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="log-out" size={20} color="#EF4444" style={{ marginLeft: 3 }} />
            </View>
            <Text style={[styles.menuItemText, { color: '#EF4444' }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
          </TouchableOpacity>
        </View>

        {/* Version Text */}
        <Text style={styles.versionText}>App version 6.57.1</Text>
        
      </ScrollView>

      {/* Add Tax Modal */}
      <Modal
        visible={isTaxModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsTaxModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
             style={styles.modalCloseOutBtn}
             onPress={() => setIsTaxModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#1E293B" />
          </TouchableOpacity>

          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add UAE Tax Document</Text>
              <Text style={styles.modalSubtitle}>Please enter your TRN details</Text>
            </View>
            
            <TextInput
              style={styles.inputField}
              placeholder="TRN No."
              placeholderTextColor="#94A3B8"
              value={trnNo}
              onChangeText={setTrnNo}
              keyboardType="number-pad"
            />
            
            <TextInput
              style={styles.inputField}
              placeholder="TRN Address"
              placeholderTextColor="#94A3B8"
              value={trnAddress}
              onChangeText={setTrnAddress}
            />
            
            <TextInput
              style={styles.inputField}
              placeholder="Name / Company Name"
              placeholderTextColor="#94A3B8"
              value={companyName}
              onChangeText={setCompanyName}
            />
            
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmTax}>
              <Text style={styles.confirmBtnText}>Confirm Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  watermarkContainer: {
    position: 'absolute',
    top: -20,
    right: -40,
    opacity: 0.6,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
    position: 'relative',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
      web: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      }
    }),
  },
  viewProfileBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
  },
  viewProfileText: {
    color: '#0052cc',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
    marginLeft: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0052cc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#EFF6FF',
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#EAB308',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    fontSize: 15,
    color: '#64748B',
    marginRight: 8,
  },
  verifyBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifyText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0052cc',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  addTaxBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    marginTop: 16,
    borderStyle: 'dashed',
  },
  addTaxBtnText: {
    color: '#0052cc',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  trnBadgeContainer: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  trnBadgeText: {
    color: '#1E3A8A',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Card Styles
  twoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flex: 1,
    padding: 20,
    marginHorizontal: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }
    }),
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gridCardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  referCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }
    }),
  },
  referCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  referTextCombo: {
    marginLeft: 16,
    flex: 1,
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  referSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  referCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0052cc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  inviteBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      }
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginLeft: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 76,
    marginRight: 20,
  },
  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCloseOutBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHeader: {
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  inputField: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  confirmBtn: {
    backgroundColor: '#0052cc',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        shadowColor: '#0052cc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }
    }),
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
