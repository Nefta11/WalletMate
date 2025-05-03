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
        justifyContent: 'center', 
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginTop: 18,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 8, 
    },
    title: {
        fontSize: 25,
        fontFamily: 'Inter-SemiBold',
    },
});

export default Header;