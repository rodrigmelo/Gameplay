import React from 'react';
import { View, Text } from 'react-native'
import { styles } from './styles';

import { useAuth } from '../../hooks/auth';

import { Avatar } from '../Avatar';

const MessageArray = ['Hoje é dia de vitória', 'Prepara-se para a batalha', 'Pronto para vencer ?', 'Não use hacker :)']
const welcomeMessage = MessageArray[Math.floor(Math.random()*MessageArray.length)]

export function Profile() {
    const { user } = useAuth();
    
    return (
        <View style={styles.container}>
            <Avatar urlImage={user.avatar} />
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