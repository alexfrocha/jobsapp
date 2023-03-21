import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'


const Popularjobs = () => {
  const router = useRouter()

  const {data, isLoading, error} = useFetch('search', { query: 'Programador FullStack Brasil', num_pages: 1 })
  const [selectedJob, setSelectedJob] = useState('')
  const handleCardPress = (item) => {}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trabalhos Populares</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ?
          <ActivityIndicator size={'large'} /> :
          error ? (
            <Text>Alguma coisa deu errado.</Text>
          ) : (
            <FlatList 
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard 
                  item={item}
                />
              )}
              keyExtractor={item => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          )
        }
      </View>


    </View>
  )
}

export default Popularjobs