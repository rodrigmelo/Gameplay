import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

import { ListDivider } from '../../components/ListDivider';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentsProps} from '../../components/Appointments';
import { Background } from '../../components/Background';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENTS } from '../../config/database';

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentsProps[]>([]);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentsProps) {
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    function handleAppointmenCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentsProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item=> item.category == category));
        }else{
            setAppointments(storage)
        }

        setLoading(false)
    }

    useFocusEffect(useCallback(() => {
        loadAppointments()
    },[category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmenCreate}/>
            </View>
             
                <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
              />
            
            {
                loading ? <Load /> :
            <>
                <ListHeader 
                    title="Partidas agendadas"
                    subtitle={`${appointments.length}`}
                    />
                
                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment 
                        data={item}
                        onPress={() => handleAppointmentDetails(item)}
                        />
                    )}
                    ItemSeparatorComponent={ ()=> <ListDivider />}
                    contentContainerStyle={{paddingBottom: 69}}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
            </>             
            }
        </Background>
 
    )

}