import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from the expo/vector-icons package

// Import your data source
import resultsData from '../data/results.json'; // Assuming you have a JSON file named results.json
import commercialAdsData from '../data/commercialAds.json'; // Assuming you have a JSON file named commercialAds.json

const HomeScreen = ({ navigation }) => {
    // State to hold the results and commercial ads data
    const [results, setResults] = useState([]);
    const [commercialAds, setCommercialAds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulate fetching data from a file or database
    useEffect(() => {
        // Set results data
        setResults(resultsData);

        // Set commercial ads data
        setCommercialAds(commercialAdsData);
    }, []);

    // Function to filter results based on category
    const filterResultsByCategory = (category) => {
        setSelectedCategory(category);
    };

    // Function to clear category filter
    const clearCategoryFilter = () => {
        setSelectedCategory(null);
    };

    
    // Function to handle search query change
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };

    const filteredResults = results.filter(result => {
        const matchesCategory = !selectedCategory || result.category === selectedCategory;
        const matchesSearchQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });
    
    return (
        <View style={{ flex: 1 }}>
            {/* Search Bar */}
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingHorizontal: 10 }}
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearchQueryChange}
            />

            <TouchableOpacity style={{ margin: 10 }} onPress={() => clearCategoryFilter()}>
                <Text>Clear Filter</Text>
            </TouchableOpacity>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height: 210}}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => filterResultsByCategory('Automotive')}>
                    <Image source={require('.././assets/automotive.png')} style={{ width: 100, height: 100 }} />
                    <Text>Automotive</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => filterResultsByCategory('Property')}>
                    <Image source={require('.././assets/property.png')} style={{ width: 100, height: 100 }} />
                    <Text>Property</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => filterResultsByCategory('Electronics')}>
                    <Image source={require('.././assets/electronics.png')} style={{ width: 100, height: 100 }} />
                    <Text>Electronics</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Results Component */}
            <ScrollView>
                {filteredResults.map((result, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}
                        onPress={() => navigation.navigate('Details', { itemId: result.id })}
                    >
                        <Image source={require('.././assets/ads2.jpg')} style={{ width: 50, height: 50, marginRight: 10 }} />
                        <View>
                            <Text>{result.title}</Text>
                            <Text>{result.price}</Text>
                            <Text>{result.details}</Text>
                            <Text>{result.datePublished}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Commercial Ads Component */}
            <ScrollView horizontal>
                {
                    commercialAds.map((ad, index) => (
                        <Image key={index} source={require('.././assets/ads1.jpg')} style={{ width: 150, height: 100, margin: 10 }} />
                    ))
                }
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'lightgray', paddingVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home" size={24} color="black" />
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Commercial')}>
                    <Ionicons name="newspaper" size={24} color="black" />
                    <Text>Commercials</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                    <Text>Post an Ad</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Ionicons name="search" size={24} color="black" />
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;
