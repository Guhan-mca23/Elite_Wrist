import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://img.freepik.com/free-vector/dark-style-realistic-smart-watch-horizontal-banner-with-advertising-site-vector-illustration_1284-30193.jpg?size=626&ext=jpg' }} // Watch shop image
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Welcome to Our EliteWrist</Text>
      <Text style={styles.description}>
        At our watch boutique, we are passionate about offering a curated selection of timepieces that blend style, functionality, and innovation. 
        Whether you're searching for a classic mechanical watch or a modern smartwatch, we have something for everyone.
      </Text>
      <Text style={styles.subtitle}>Our Services</Text>
      <Text style={styles.description}>
        We pride ourselves on providing personalized customer service to help you find the perfect watch. 
        From expert advice to styling tips, we ensure a seamless shopping experience with options for delivery and after-sales support.
      </Text>
      <Text style={styles.subtitle}>Quality Assurance</Text>
      <Text style={styles.description}>
        Our watches are sourced from renowned brands and crafted with precision to ensure durability and timeless elegance. 
        We stand by the quality of our products and offer warranties on all our watches.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF0000', // Red color for title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#C0C0C0', // Silver color for subtitles
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF', // White color for description for better contrast
  },
});
