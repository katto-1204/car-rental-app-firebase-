import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
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
  { id: 1, brand: 'Tesla', model: 'Tesla Cybertruck', price: '$120/day', rating: 4.9, image: { uri: 'https://placehold.co/300x200' } },
  { id: 2, brand: 'Nissan', model: 'Nissan 370Z', price: '$100/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 3, brand: 'Jeep', model: 'Jeep Wrangler', price: '$150/day', rating: 4.8, image: { uri: 'https://placehold.co/300x200' } },
  { id: 4, brand: 'Toyota', model: 'Toyota Innova', price: '$90/day', rating: 4.6, image: { uri: 'https://placehold.co/300x200' } },
  { id: 5, brand: 'Tesla', model: 'Tesla Model 3', price: '$130/day', rating: 4.9, image: { uri: 'https://placehold.co/300x200' } },
  { id: 6, brand: 'Audi', model: 'Audi Q5', price: '$140/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 7, brand: 'Toyota', model: 'GR Supra', price: '$110/day', rating: 4.8, image: { uri: 'https://placehold.co/300x200' } },

  // Mercedes
  { id: 8, brand: 'Mercedes', model: 'Mercedes A-Class', price: '$100/day', rating: 4.5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 9, brand: 'Mercedes', model: 'Mercedes C-Class', price: '$120/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 10, brand: 'Mercedes', model: 'Mercedes E-Class', price: '$150/day', rating: 4.8, image: { uri: 'https://placehold.co/300x200' } },

  // Tesla
  { id: 11, brand: 'Tesla', model: 'Tesla Model S', price: '$140/day', rating: 4.9, image: { uri: 'https://placehold.co/300x200' } },
  { id: 12, brand: 'Tesla', model: 'Tesla Model X', price: '$160/day', rating: 4.8, image: { uri: 'https://placehold.co/300x200' } },
  { id: 13, brand: 'Tesla', model: 'Tesla Roadster', price: '$200/day', rating: 5.0, image: { uri: 'https://placehold.co/300x200' } },

  // BMW
  { id: 14, brand: 'BMW', model: 'BMW X5', price: '$130/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 15, brand: 'BMW', model: 'BMW 3 Series', price: '$110/day', rating: 4.6, image: { uri: 'https://placehold.co/300x200' } },
  { id: 16, brand: 'BMW', model: 'BMW 7 Series', price: '$180/day', rating: 4.9, image: { uri: 'https://placehold.co/300x200' } },

  // Toyota
  { id: 17, brand: 'Toyota', model: 'Toyota Corolla', price: '$80/day', rating: 4.5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 18, brand: 'Toyota', model: 'Toyota Camry', price: '$100/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },
  { id: 19, brand: 'Toyota', model: 'Toyota RAV4', price: '$120/day', rating: 4.8, image: { uri: 'https://placehold.co/300x200' } },

  // Volvo
  { id: 20, brand: 'Volvo', model: 'Volvo XC90', price: '$150/day', rating: 4.8, image: { uri: 'https://placehold.co/300x200' } },
  { id: 21, brand: 'Volvo', model: 'Volvo S60', price: '$110/day', rating: 4.6, image: { uri: 'https://placehold.co/300x200' } },
  { id: 22, brand: 'Volvo', model: 'Volvo V60', price: '$130/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },

  // Bugatti
  { id: 23, brand: 'Bugatti', model: 'Bugatti Chiron', price: '$1000/day', rating: 5.0, image: { uri: 'https://placehold.co/300x200' } },
  { id: 24, brand: 'Bugatti', model: 'Bugatti Veyron', price: '$900/day', rating: 4.9, image: { uri: 'https://placehold.co/300x200' } },
  { id: 25, brand: 'Bugatti', model: 'Bugatti Divo', price: '$1100/day', rating: 5.0, image: { uri: 'https://placehold.co/300x200' } },

  // Honda
  { id: 26, brand: 'Honda', model: 'Honda Civic', price: '$70/day', rating: 4.5, image: { uri: 'https://placehold.co/300x200' } },
  { id: 27, brand: 'Honda', model: 'Honda Accord', price: '$90/day', rating: 4.6, image: { uri: 'https://placehold.co/300x200' } },
  { id: 28, brand: 'Honda', model: 'Honda CR-V', price: '$100/day', rating: 4.7, image: { uri: 'https://placehold.co/300x200' } },
];
const username = "Luis"; // Replace with actual Firebase user's name later
export default function HomeScreen({ navigation }) {
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
  const handleViewInfo = () => {
    navigation.navigate('CarDetails');
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
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.couponCard}>
              <Image source={couponImage} style={styles.couponImage} />
            </View>
          )}
          onScroll={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setCurrentIndex(index);
          }}
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
              <View style={styles.cardHeader}>
                <FontAwesome5 name={car.brand} size={20} color="white" />
                <Ionicons name="heart-outline" size={20} color="white" />
              </View>
              <Image source={car.image} style={styles.carImage} />
              <Text style={styles.carModel}>{car.model}</Text>
              <Text style={styles.carPrice}>{car.price}</Text>
              <Text style={styles.carRating}>
                ⭐ {car.rating}
                <View style={styles.carLabelContainer}>
                  <Text style={styles.carLabel}>{car.isNew ? 'NEW' : 'USED'}</Text>
                </View>
              </Text>
              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.chatButton]} onPress={handleChat}>
                  <Text style={styles.chatButtonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.viewInfoButton]} onPress={handleViewInfo}>
                  <Text style={styles.viewInfoButtonText}>View Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    width: Dimensions.get('window').width * 0.9, // 90% of the screen width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16, // Keep the rounded corners
    padding: 8, // Add padding inside the card
    marginHorizontal: Dimensions.get('window').width * 0.05, // Center the card horizontally
  },
  couponImage: {
    width: '100%', 
    height: Dimensions.get('window').width * 0.45, 
    borderRadius: 16,
  },
  brandGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    rowGap: 10, 
  },
  brandCircle: {
    width: (screenWidth - 64) / 4, // Adjust width for 4 items per row
    height: (screenWidth - 64) / 4, // Make it a square
    backgroundColor: '#ffffff', // White background
    borderWidth: 2, // Border width
    borderColor: 'grey', // Border color
    borderRadius: 12, // Rounded edges
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    marginBottom: 10, // Spacing between squares
  },
  brandText: {
    color: 'BLACK', // White text
    fontSize: 12, // Adjusted font size for smaller circles
    textTransform: 'capitalize', // Capitalize the text
  },
  brandLogo: {
    width: '70%', // Adjust the size of the logo
    height: '70%', // Maintain aspect ratio
    resizeMode: 'contain', // Ensure the logo scales properly
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
    flexWrap: 'wrap', // Allow wrapping to create a grid
    justifyContent: 'space-between', // Space between cards
  },
  carCard: {
    width: '48%',
    backgroundColor: '#1054CF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carImage: {
    width: '110%', // Slightly larger than the card width
    height: 200, // Increased height for a larger image
    resizeMode: 'contain', // Ensure the image scales properly
    marginVertical: 8,
    alignSelf: 'center', // Center the image within the card
  },
  carModel: {
    color: 'white',
    fontSize: 20, // Bigger font size for H1
    fontWeight: 'bold', // Bold text
    textAlign: 'left', // Align to the left
  },
  carPrice: {
    color: '#FFB700',
    fontSize: 18, // Slightly bigger font size for H2
    fontWeight: 'bold', // Bold text
    textAlign: 'right', // Align to the right
  },
  carRating: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'left',
  },
  carRatingLabel: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: 'bold', // Bold label
    marginLeft: 4, // Add spacing between stars and label
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '48%',
  },
  chatButton: {
    backgroundColor: 'transparent', // Transparent background
    borderColor: '#ffffff', // Blue border
    borderWidth: 1,
  },
  chatButtonText: {
    color: '#ffffff', // Blue text
    fontWeight: 'bold', // Bold text
    textAlign: 'center',
    fontSize: 14,
  },
  viewInfoButton: {
    backgroundColor: '#FFFFFF',
  },
  viewInfoButtonText: {
    color: '#1054CF',
    fontWeight: 'bold', // Bold text
    textAlign: 'center',
    fontSize: 14,
  },
  carLabelContainer: {
    backgroundColor: '#2A2C36', // Grey background
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 6, // Horizontal padding
    paddingVertical: 2, // Vertical padding
    marginLeft: 8, // Spacing from the stars
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  carLabel: {
    color: 'white', // White text
    fontSize: 10, // Small font size
    fontWeight: 'bold', // Bold text
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#007BFF', // Active indicator color
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
});


