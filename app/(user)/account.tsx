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
     // User logout logic here
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Background watermark icon (simulated) */}
        <View style={styles.watermarkContainer}>
           <Ionicons name="location" size={180} color="#FFFFFF" style={{ opacity: 0.5, transform: [{ rotate: '-15deg' }] }} />
        </View>

        {/* Top Header Section */}
        <View style={styles.header}>
          <TouchableOpacity 
             style={styles.viewProfileBtn}
             onPress={() => router.push('/(user)/profile-details')}
          >
            <Text style={styles.viewProfileText}>View</Text>
            <Ionicons name="chevron-forward" size={14} color="#0052cc" style={{marginTop: 1}} />
          </TouchableOpacity>

          <Text style={styles.userName}>Roshan Hegde</Text>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>hshaaj@gmail.com</Text>
            {hasTaxDetails ? (
              <Ionicons name="checkmark-circle" size={16} color="#00C853" style={styles.verifiedIcon} />
            ) : (
              <TouchableOpacity>
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
              <Ionicons name="add" size={16} color="#0052cc" />
              <Text style={styles.addTaxBtnText}>Add Tax Details</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Two Card Row */}
        <View style={styles.twoCardRow}>
          <TouchableOpacity style={styles.gridCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="heart" size={20} color="#334155" />
            </View>
            <Text style={styles.gridCardText}>Saved Addresses</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="chatbubble" size={18} color="#334155" />
              <Text style={styles.questionMarkOverlay}>?</Text>
            </View>
            <Text style={styles.gridCardText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* Refer and Earn Card */}
        <View style={styles.referCard}>
          <View style={styles.referCardLeft}>
            <View style={[styles.iconCircle, { backgroundColor: '#F1F5F9' }]}>
              <Ionicons name="gift" size={20} color="#334155" />
            </View>
            <View style={styles.referTextCombo}>
              <Text style={styles.referTitle}>Refer and earn</Text>
              <Text style={styles.referTitle}>AED 10</Text>
            </View>
          </View>
          <View style={styles.referCardRight}>
            <TouchableOpacity style={styles.inviteBtn}>
              <Ionicons name="share-social" size={16} color="#0052cc" />
              <Text style={styles.inviteBtnText}>Invite</Text>
            </TouchableOpacity>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </View>
        </View>

        {/* Menu Options List */}
        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconCircle, { width: 36, height: 36, borderRadius: 18 }]}>
              <Ionicons name="settings" size={18} color="#334155" />
            </View>
            <Text style={styles.menuItemText}>Account Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.iconCircle, { width: 36, height: 36, borderRadius: 18 }]}>
              <Ionicons name="document-text" size={18} color="#334155" />
            </View>
            <Text style={styles.menuItemText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.iconCircle, { width: 36, height: 36, borderRadius: 18 }]}>
              <Ionicons name="log-out" size={18} color="#334155" style={{ marginLeft: 4 }} />
            </View>
            <Text style={styles.menuItemText}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
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
          {/* Close button outside modal */}
          <TouchableOpacity 
             style={styles.modalCloseOutBtn}
             onPress={() => setIsTaxModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add UAE Tax Document</Text>
            
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
              <Text style={styles.confirmBtnText}>Confirm</Text>
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
    backgroundColor: '#F3F5F9', // Soft light blue-grey
  },
  watermarkContainer: {
    position: 'absolute',
    top: -40,
    left: -40,
    opacity: 0.6,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
    position: 'relative',
  },
  viewProfileBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProfileText: {
    color: '#0052cc',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailText: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 8,
  },
  verifyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0052cc',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  addTaxBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0052cc',
    backgroundColor: 'transparent',
  },
  addTaxBtnText: {
    color: '#0052cc',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  trnBadgeContainer: {
    backgroundColor: '#E6EFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  trnBadgeText: {
    color: '#003A99',
    fontSize: 14,
    fontWeight: '700',
  },
  // Card Styles
  twoCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F5F9', // light grey circle
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  questionMarkOverlay: {
    position: 'absolute',
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    top: 13,
  },
  gridCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  referCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  referCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referTextCombo: {
    marginLeft: 12,
  },
  referTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 22,
  },
  referCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0052cc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  inviteBtnText: {
    color: '#0052cc',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  menuList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 16,
  },
  versionText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.6,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCloseOutBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 24,
  },
  inputField: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 16,
  },
  confirmBtn: {
    backgroundColor: '#0052cc', // bright blue
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
