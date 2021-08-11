import React from 'react';
import { View, Text, Alert } from 'react-native'
import { styles } from './styles';
import { RectButton } from 'react-native-gesture-handler';

import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';

const MessageArray = ['Hoje é dia de vitória', 'Prepara-se para a batalha', 'Pronto para vencer ?', 'Não use hacker :)']
const welcomeMessage = MessageArray[Math.floor(Math.random()*MessageArray.length)]

export function Profile() {
    const { user, signOut } = useAuth();

    function handleSignOut(){
        Alert.alert('Logout', 'Deseja sair do GamePlay ?',
        [
            {
                text:'Não',
                style: 'cancel'
            },
            {
                text:'Sim',
                onPress: () => signOut()
            }
        ])
    }
    
    return (
        <View style={styles.container}>
            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar} />
            </RectButton>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>

                    <Text style={styles.username}>
                        {user.firstName}
                    </Text>
                </View>
                    <Text style={styles.message}>
                        {welcomeMessage}
                    </Text>
                </View>
            </View>
        )
    }