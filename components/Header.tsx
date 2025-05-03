import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

interface HeaderProps {
    title: string;
    colors: {
        background: string;
        text: string;
    };
}

const Header: React.FC<HeaderProps> = ({ title, colors }) => {
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Image
                source={require('@/assets/images/WalletMate-removebg-preview.png')}
                style={styles.icon}
            />
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingTop: 32, // Increased padding to lower the header
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
    },
});

export default Header;