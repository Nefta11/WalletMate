import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const AboutModal = ({ colors, onClose }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' }}>
                <View style={{ alignItems: 'center', marginBottom: 8 }}>
                    <Image source={require('@/assets/images/WalletMate-removebg-preview.png')} style={{ width: 70, height: 70, marginBottom: -15 }} resizeMode="contain" />
                </View>
                <Text style={{ fontSize: 20, fontFamily: 'Inter-SemiBold', color: colors.primary, marginBottom: 12, textAlign: 'center' }}>Acerca de WalletMate</Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10, textAlign: 'center' }}>
                    WalletMate es una aplicación diseñada para ayudarte a gestionar tus finanzas personales de manera sencilla y eficiente. Permite registrar tus ingresos y gastos, visualizar estadísticas y aprender sobre educación financiera.
                </Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>¿Qué busca?</Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10 }}>
                    WalletMate busca empoderar a los usuarios para que tomen el control de su dinero, tomen mejores decisiones y alcancen sus metas financieras.
                </Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>Misión</Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10 }}>
                    Brindar una herramienta intuitiva y educativa que facilite la administración financiera y fomente el aprendizaje sobre finanzas personales.
                </Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>Visión</Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10 }}>
                    Ser la app de referencia en educación y gestión financiera personal en Latinoamérica.
                </Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>Desarrollador</Text>
                <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 16 }}>
                    WalletMate fue desarrollada por Neftali Vergara, apasionado por la tecnología y la educación financiera.
                </Text>
                <TouchableOpacity onPress={onClose} style={{ alignSelf: 'center', marginTop: 8, padding: 10 }}>
                    <Text style={{ color: colors.primary, fontFamily: 'Inter-SemiBold', fontSize: 16 }}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AboutModal;