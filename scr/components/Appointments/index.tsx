import React from 'react';
import { View, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButtonProps, RectButton } from 'react-native-gesture-handler'

import { categories } from '../../utils/categories';
import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';
import PlayerSVG from '../../assets/player.svg';
import CalendarSVG from '../../assets/calendar.svg'

import { theme } from '../../global/styles/theme';
import { GuildProps } from '../Guild';

export type AppointmentsProps = {
    id: string,
    guild: GuildProps,
    category: string,
    date: string
    description: string;
}

type Props = RectButtonProps & {
    data: AppointmentsProps;
}

export function Appointment({data, ...rest}: Props) {
    const [category] = categories.filter(item => item.id === data.category);
    const { owner } = data.guild
    const { primary, on, secondary50, secondary70 } = theme.colors
    
    return (
    <RectButton {...rest}>
        <View style={styles.container}>
            <LinearGradient 
            style={styles.guildIconContainer}
            colors={[secondary50, secondary70]}
            >
            <GuildIcon />
            </LinearGradient>

        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {data.guild.name}
                </Text>


                <Text style={styles.category}>
                    {category.title}
                </Text>
            </View>
            
            <View style={styles.footer}>
                <View style={styles.dateInfo}>
                    <CalendarSVG />
                    <Text style={styles.date}>
                        {data.date}
                    </Text>
                </View>
            
                <View style={styles.playersInfo}>
                    <PlayerSVG fill={owner ? primary : on}/>
                    <Text style={[
                        styles.player, 
                        { color: owner ? primary : on}
                    ]}>
                        { owner ? 'Anfitrião' : 'Visitante' }
                    </Text>
                </View>
            </View>
        </View>
    </View>


    </RectButton>
    )
}
