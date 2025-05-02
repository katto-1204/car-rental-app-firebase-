import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons'; // Updated import to include FontAwesome
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; // Added import for useRouter
const teslaCybertruckImage = require('./teslacybertruck.png');
const nissan370zImage = require('./nissan370z.png');
const userImage = require('./user.png');
const couponImage = require('./coupon 1.png');
const bmwLogo = require('../brandlogos/BMW-logo.png');
const bugattiLogo = require('../brandlogos/bugatti-logo.png');
const hondaLogo = require('../brandlogos/honda-logo.png');
const mitsubishiLogo = require('../brandlogos/mitsubishi-logo.png');
const teslaLogo = require('../brandlogos/tesla-logo.png');
const toyotaLogo = require('../brandlogos/toyota-logo.png');
const volvoLogo = require('../brandlogos/volvo-logo.png');

const cars = [
  // All Cars
  { id: 1, brand: 'Tesla', model: 'Tesla Cybertruck', price: '6.5k/day', rating: 4.9, seats: 6, image: { uri: 'https://placehold.co/300x200' } },
  { id: 2, brand: 'Nissan', model: 'Nissan 370Z', price: '₱850/day', rating: 4.7, seats: 2, image: { uri: 'https://placehold.co/300x200' } },
  { id: 3, brand: 'Jeep', model: 'Jeep Wrangler', price: '2.5k/day', rating: 4.8, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 4, brand: 'Toyota', model: 'Toyota Innova', price: '₱750/day', rating: 4.6, seats: 7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 5, brand: 'Tesla', model: 'Tesla Model 3', price: '7.2k/day', rating: 4.9, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 6, brand: 'Audi', model: 'Audi Q5', price: '4.8k/day', rating: 4.7, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 7, brand: 'Toyota', model: 'GR Supra', price: '3.2k/day', rating: 4.8, seats: 2, image: { uri: 'https://placehold.co/300x200' } },

  // Mercedes
  { id: 8, brand: 'Mercedes', model: 'Mercedes A-Class', price: '5.5k/day', rating: 4.5, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 9, brand: 'Mercedes', model: 'Mercedes C-Class', price: '6.8k/day', rating: 4.7, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 10, brand: 'Mercedes', model: 'Mercedes E-Class', price: '8.5k/day', rating: 4.8, seats: 5, image: { uri: 'https://placehold.co/300x200' } },

  // Tesla
  { id: 11, brand: 'Tesla', model: 'Tesla Model S', price: '7.8k/day', rating: 4.9, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 12, brand: 'Tesla', model: 'Tesla Model X', price: '8.9k/day', rating: 4.8, seats: 7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 13, brand: 'Tesla', model: 'Tesla Roadster', price: '12k/day', rating: 5.0, seats: 2, image: { uri: 'https://placehold.co/300x200' } },

  // BMW
  { id: 14, brand: 'BMW', model: 'BMW X5', price: '7.2k/day', rating: 4.7, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 15, brand: 'BMW', model: 'BMW 3 Series', price: '6.1k/day', rating: 4.6, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 16, brand: 'BMW', model: 'BMW 7 Series', price: '9.5k/day', rating: 4.9, seats: 5, image: { uri: 'https://placehold.co/300x200' } },

  // Toyota
  { id: 17, brand: 'Toyota', model: 'Toyota Corolla', price: '₱650/day', rating: 4.5, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 18, brand: 'Toyota', model: 'Toyota Camry', price: '₱850/day', rating: 4.7, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 19, brand: 'Toyota', model: 'Toyota RAV4', price: '2.2k/day', rating: 4.8, seats: 5, image: { uri: 'https://placehold.co/300x200' } },

  // Volvo
  { id: 20, brand: 'Volvo', model: 'Volvo XC90', price: '8.3k/day', rating: 4.8, seats: 7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 21, brand: 'Volvo', model: 'Volvo S60', price: '6.1k/day', rating: 4.6, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 22, brand: 'Volvo', model: 'Volvo V60', price: '7.2k/day', rating: 4.7, seats: 5, image: { uri: 'https://placehold.co/300x200' } },

  // Bugatti
  { id: 23, brand: 'Bugatti', model: 'Bugatti Chiron', price: '55k/day', rating: 5.0, seats: 2, image: { uri: 'https://placehold.co/300x200' } },
  { id: 24, brand: 'Bugatti', model: 'Bugatti Veyron', price: '50k/day', rating: 4.9, seats: 2, image: { uri: 'https://placehold.co/300x200' } },
  { id: 25, brand: 'Bugatti', model: 'Bugatti Divo', price: '60k/day', rating: 5.0, seats: 2, image: { uri: 'https://placehold.co/300x200' } },

  // Honda
  { id: 26, brand: 'Honda', model: 'Honda Civic', price: '₱580/day', rating: 4.5, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 27, brand: 'Honda', model: 'Honda Accord', price: '₱750/day', rating: 4.6, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 28, brand: 'Honda', model: 'Honda CR-V', price: '₱850/day', rating: 4.7, seats: 5, image: { uri: 'https://placehold.co/300x200' } },
];
const username = "Luis"; // Replace with actual Firebase user's name later
export default function HomeScreen({ navigation }) {
  const router = useRouter(); // Added useRouter hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default to "All"
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const scrollViewRef = useRef(null);

  const filteredCars = selectedCategory === 'All'
    ? cars // Show all cars when "All" is selected
    : cars.filter((car) => car.brand.toLowerCase() === selectedCategory.toLowerCase());

  const handleChat = () => {
    navigation.navigate('Chat');
  };

  const handleViewInfo = (car) => {
    router.push({
      pathname: "/cardetails",
      params: { 
        id: car.id,
        brand: car.brand,
        model: car.model,
        price: car.price,
        rating: car.rating,
        seats: car.seats
      }
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    if (query.trim() === '') {
      setSuggestions([]); // Clear suggestions if the query is empty
      return;
    }
  
    const filteredSuggestions = cars.filter(
      (car) =>
        car.model.toLowerCase().includes(query.toLowerCase()) ||
        car.brand.toLowerCase().includes(query.toLowerCase())
    );
  
    setSuggestions(filteredSuggestions);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View>
          <View style={styles.backgroundDesign} />
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Text style={styles.locationLabel}>Location</Text>
              <Text style={styles.locationValue}>PH, Davao City</Text>
            </View>
            <View style={styles.icons}>
              <TouchableOpacity>
                <Ionicons name="notifications" size={24} color="#1054CF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="heart" size={24} color="#1054CF" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Search bar */}
          <View style={styles.searchSection}>
            <TextInput
              placeholder="Search cars..."
              placeholderTextColor="#ccc"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={handleSearch} // Call handleSearch on input change
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="filter" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((car) => (
                <TouchableOpacity
                  key={car.id}
                  style={styles.suggestionItem}
                  onPress={() => {
                    setSearchQuery(car.model); // Set the search query to the selected suggestion
                    setSuggestions([]); // Clear suggestions
                  }}
                >
                  <Text style={styles.suggestionText}>{`${car.brand} ${car.model}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <FlatList
            data={[{ id: 1 }, { id: 2 }, { id: 3 }]} // Replace with actual coupon data
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={screenWidth - 32}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            renderItem={({ item }) => (
              <View style={styles.couponCard}>
                <Image source={couponImage} style={styles.couponImage} />
              </View>
            )}
            onScroll={(event) => {
              const x = event.nativeEvent.contentOffset.x;
              const index = Math.round(x / (screenWidth - 32));
              setCurrentIndex(index);
            }}
            scrollEventThrottle={16}
          />
          {/* Item Indicator */}
          <View style={styles.indicatorContainer}>
            {[1, 2, 3].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>
        {/* Car Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Brands</Text>
          <View style={styles.brandGrid}>
            {[
              { name: 'tesla', logo: teslaLogo },
              { name: 'toyota', logo: toyotaLogo },
              { name: 'bmw', logo: bmwLogo },
              { name: 'honda', logo: hondaLogo },
              { name: 'mitsubishi', logo: mitsubishiLogo },
              { name: 'bugatti', logo: bugattiLogo },
              { name: 'volvo', logo: volvoLogo },
              { name: 'more', logo: null }, // Add "More" circle
            ].map((brand, index) => (
              <TouchableOpacity
                key={index}
                style={styles.brandCircle}
                onPress={() => {
                  if (brand.name === 'more') {
                    // Scroll to the "Top Deals" section
                    const topDealsSection = document.getElementById('top-deals');
                    if (topDealsSection) {
                      topDealsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {brand.logo ? (
                  <Image source={brand.logo} style={styles.brandLogo} />
                ) : (
                  <Text style={styles.brandText}>More</Text> // Display "More" text
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Top Deals */}
        <View id="top-deals" style={styles.section}>
          <Text style={styles.sectionTitle}>Top Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
            {['All', 'Jeep','Audi','Mercedes', 'Tesla', 'BMW', 'Toyota', 'Volvo', 'Bugatti', 'Honda'].map((cat, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && { backgroundColor: '#FFB700' }, // Highlight selected category
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.cardContainer}>
            {filteredCars.map((car) => (
              <View key={car.id} style={styles.carCard}>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={styles.locationContainer}>
                      <FontAwesome name="map-marker" size={16} color="#ccc" />
                      <Text style={styles.locationText}>Davao City</Text>
                    </View>
                    <Ionicons name="heart-outline" size={20} color="white" />
                  </View>
                  <Image source={car.image} style={styles.carImage} />
                  <View style={styles.modelPriceContainer}>
                    <Text style={styles.carModel}>{car.model}</Text>
                    <Text style={styles.carPrice}>{car.price}</Text>
                  </View>
                  <View style={styles.carInfoRow}>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.carRating}>⭐ {car.rating}</Text>
                      <View style={styles.carLabelContainer}>
                        <Text style={styles.carLabel}>USED</Text>
                      </View>
                    </View>
                    <View style={styles.seatsContainer}>
                      <Ionicons name="car-seat" size={14} color="#ccc" />
                      <Text style={styles.seatsText}>{car.seats} Seats</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.arrowButton} 
                  onPress={() => handleViewInfo(car)}
                >
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  backgroundDesign: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 550, // Keep the height if needed for layout
    // backgroundColor: '#1054CF', // Removed the blue background color
    borderBottomLeftRadius: 50, // Keep rounded bottom-left corner
    borderBottomRightRadius: 50, // Keep rounded bottom-right corner
    zIndex: -1, // Place behind other elements
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40, // Add spacing from the top
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'column',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  locationLabel: {
    color: 'black', // Change to black
    fontSize: 14, // Smaller font size for H2
    marginBottom: 4,
  },
  locationValue: {
    color: 'black', // Change to black
    fontSize: 20, // Larger font size for H1
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: 'grey',
    borderWidth: 1.5,
    borderColor: '#1054CF',
  },
  filterButton: {
    backgroundColor: '#1054CF',
    padding: 12,
    marginLeft: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  couponCard: {
    width: screenWidth - 32,
    height: screenWidth * 0.5, // Adjust height to maintain aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 0, // Remove horizontal margin
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  couponImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 20,
    columnGap: 5,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  brandCircle: {
    width: (screenWidth - 64) / 4,
    height: (screenWidth - 64) / 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  brandText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  brandLogo: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#1054CF',
    borderRadius: 16,
    marginRight: 8, // Add spacing between buttons horizontally
    marginBottom: 10, // Add spacing between rows if they wrap
  },
  categoryText: {
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    padding: 8,
  },
  carCard: {
    width: (screenWidth - 64) / 2, // Adjust width considering padding and gap
    backgroundColor: '#1054CF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    height: 280, // Reduced from 340 to 280
    position: 'relative',
  },
  cardContent: {
    flex: 1,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '500',
  },
  carImage: {
    width: '100%',
    height: 100, // Reduced from 120 to 100 to maintain proportions
    resizeMode: 'contain',
    marginVertical: 8,
  },
  modelPriceContainer: {
    flexDirection: 'row', // Changed to row
    justifyContent: 'space-between', // Space between name and price
    alignItems: 'center', // Center items vertically
    marginBottom: 4,
  },
  carModel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1, // Take available space
    marginRight: 8, // Add space between model and price
  },
  carPrice: {
    color: '#FFB700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carRating: {
    color: '#ccc',
    fontSize: 12,
    paddingVertical: 2, // Added padding to align with label
  },
  carInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8, // Changed from -8 to 8 to move down
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  carLabelContainer: {
    backgroundColor: '#2A2C36', // Grey background
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 6, // Horizontal padding
    paddingVertical: 2, // Vertical padding
  },
  carLabel: {
    color: 'white', // White text
    fontSize: 10, // Small font size
    fontWeight: 'bold', // Bold text
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatsText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '500',
  },
  buttonsContainer: {
    marginTop: 'auto',
    paddingTop: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center', // Center the arrow icon
  },
  rentNowButton: {
    backgroundColor: '#FFB700',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 16, // Position at the bottom of the coupon card
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  indicator: {
    width: Math.min(10, Dimensions.get('window').width * 0.02),
    height: Math.min(10, Dimensions.get('window').width * 0.02),
    borderRadius: Math.min(5, Dimensions.get('window').width * 0.01),
    backgroundColor: '#FFFFFF',
    marginHorizontal: Math.min(6, Dimensions.get('window').width * 0.015),
  },
  activeIndicator: {
    backgroundColor: '#FFB700',
    width: Math.min(20, Dimensions.get('window').width * 0.05),
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  suggestionItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    color: '#333',
  },
  arrowButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: '#FFB700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    marginTop: 8, // Added top margin
  },
});


