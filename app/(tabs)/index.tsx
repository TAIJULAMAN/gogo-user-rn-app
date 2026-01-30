import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get('window');

// Mock Data
const VEHICLES = [
  { id: 'bike', name: 'Bike Delivery', price: 78.90, capacity: '20kg', time: '8 mins', icon: require('../../assets/images/react-logo.png') },
  { id: 'car', name: 'Car Delivery', price: 87.82, capacity: '1050kg', time: '7 mins', icon: require('../../assets/images/react-logo.png') },
  { id: 'truck', name: 'Truck Delivery', price: 120.00, capacity: '3000kg', time: '15 mins', icon: require('../../assets/images/react-logo.png') },
];

const STEPS = ['Locations', 'Vehicle', 'Payment'];

export default function HomeScreen() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Locations, 1: Vehicle, 2: Payment
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0].id);

  // Dubai Coordinates (Approx)
  const initialRegion = {
    latitude: 25.1972,
    longitude: 55.2744,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const renderStepHeader = () => (
    <View style={styles.stepHeader}>
      <TouchableOpacity onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>CREATE ORDER</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  const renderStepper = () => (
    <View style={styles.stepperContainer}>
      {STEPS.map((step, index) => (
        <View key={index} style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep >= index ? styles.stepActive : styles.stepInactive]}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
          </View>
          <Text style={styles.stepLabel}>{step}</Text>
          {index < STEPS.length - 1 && <View style={styles.stepLine} />}
        </View>
      ))}
    </View>
  );

  const renderLocationsStep = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Journey Details</Text>
      <Text style={styles.sectionSubtitle}>From Pickup to Drop off</Text>

      <View style={styles.locationList}>
        {/* Mock Locations */}
        <View style={styles.locationItem}>
          <View style={styles.locationIconContainer}>
            <View style={[styles.locationIcon, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.locationIconText}>A</Text>
            </View>
            <View style={styles.dottedLine} />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationName}>Roshan Hegde • +971552239345</Text>
            <Text style={styles.locationAddress}>3401, Escape Tower, Business Bay, Dubai.</Text>
          </View>
        </View>

        <View style={styles.locationItem}>
          <View style={styles.locationIconContainer}>
            <View style={[styles.locationIcon, { backgroundColor: '#F44336' }]}>
              <Text style={styles.locationIconText}>1</Text>
            </View>
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationName}>Roshan Hegde • +971552239345</Text>
            <Text style={styles.locationAddress}>1609, Elite 8 Sports Residence, Dubai Sports City...</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle-outline" size={20} color="black" />
          <Text style={styles.actionButtonText}>Add Stop</Text>
        </TouchableOpacity>
        <View style={styles.dividerVertical} />
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="pencil-outline" size={20} color="black" />
          <Text style={styles.actionButtonText}>Edit Location</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Continue to Vehicle"
        onPress={() => setCurrentStep(1)}
        style={{ marginTop: 20 }}
      />
    </View>
  );

  const renderVehicleStep = () => (
    <View style={styles.card}>
      <Text style={[styles.sectionTitle, { textAlign: 'center', marginBottom: 20 }]}>Choose your rider</Text>

      {VEHICLES.map((vehicle) => (
        <TouchableOpacity
          key={vehicle.id}
          style={[
            styles.vehicleCard,
            selectedVehicle === vehicle.id && styles.vehicleCardSelected
          ]}
          onPress={() => setSelectedVehicle(vehicle.id)}
        >
          <View style={styles.vehicleImageContainer}>
            {/* Placeholder for Vehicle Image - Using a colored box if image fails */}
            <View style={{ width: 60, height: 40, backgroundColor: '#eee', borderRadius: 5 }} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleName}>{vehicle.name}</Text>
            <Text style={styles.vehicleDetails}>{vehicle.capacity} • Just {vehicle.time} away</Text>
          </View>
          <Text style={styles.vehiclePrice}>D {vehicle.price}</Text>
        </TouchableOpacity>
      ))}

      <Button
        title="Continue to Payment"
        onPress={() => setCurrentStep(2)}
        style={{ marginTop: 20 }}
      />
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.card}>
      <Text style={[styles.sectionTitle, { textAlign: 'center', marginBottom: 20 }]}>Order Summary</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Total Distance</Text>
        <Text style={styles.summaryValue}>28km</Text>
      </View>

      <View style={[styles.summaryRow, { marginTop: 20 }]}>
        <Text style={styles.summaryLabel}>Cost</Text>
        <Text style={styles.summaryValue}>D 74.95</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>VAT (Value Added Tax)</Text>
        <Text style={styles.summaryValue}>D 3.95</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { fontWeight: 'bold', color: '#000' }]}>Total Delivery Cost</Text>
        <Text style={[styles.summaryValue, { fontWeight: 'bold', color: '#000' }]}>D 78.90</Text>
      </View>

      <Button
        title="Pay Now : D 78.90"
        onPress={() => alert('Order Placed!')}
        style={{ marginTop: 30 }}
      />

      <View style={styles.securePayment}>
        <Ionicons name="lock-closed" size={16} color="#666" />
        <Text style={styles.secureText}>Secure Payments • Trusted UAE Payment Partners</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Map Background - Placeholder for web */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map-outline" size={48} color="#999" />
        <Text style={{ color: '#999', marginTop: 10 }}>Map View</Text>
      </View>

      {/* Overlay Content */}
      <View style={styles.overlay}>
        {renderStepHeader()}
        {renderStepper()}

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {currentStep === 0 && renderLocationsStep()}
          {currentStep === 1 && renderVehicleStep()}
          {currentStep === 2 && renderPaymentStep()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary, // Green background from screenshot
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.5, // Map takes top half
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.5,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: 100, // Start below status bar area
    backgroundColor: 'transparent',
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#000', // Or very dark green
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepActive: {
    backgroundColor: Colors.light.primary,
  },
  stepInactive: {
    backgroundColor: '#ddd',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  stepLine: {
    width: 30,
    height: 1,
    backgroundColor: '#ddd',
    marginRight: 8,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 400,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  locationList: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    marginBottom: 0,
    minHeight: 60,
  },
  locationIconContainer: {
    alignItems: 'center',
    width: 40,
  },
  locationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  locationIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dottedLine: {
    flex: 1,
    width: 1,
    backgroundColor: '#ccc',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#ccc', // Simplified for RN
    marginVertical: 4,
  },
  locationTextContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  locationName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary, // Green
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-around',
    opacity: 0.8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  dividerVertical: {
    width: 1,
    backgroundColor: '#000',
    opacity: 0.1,
  },
  // Vehicle Step Styles
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff', // Or specific blue as per design
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  vehicleCardSelected: {
    backgroundColor: '#00BCD4', // Cyan/Blue from screenshot
    borderColor: '#00BCD4',
  },
  vehicleImageContainer: {
    marginRight: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333', // White if selected logic needed
  },
  vehicleDetails: {
    fontSize: 12,
    color: '#666',
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  // Payment Styles
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#888',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  securePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  secureText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
});
