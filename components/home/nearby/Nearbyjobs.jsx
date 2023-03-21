import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'


const Nearbyjobs  = () => {
  const router = useRouter()

  const {data, isLoading, error} = useFetch('search', { query: 'Desenvolvedor Backend Brasil', num_pages: 1 })


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trabalhos Novos</Text>
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
            data?.map((job) => (
              <NearbyJobCard 
                job={job}
                key={`nearby-job-${job.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))
          )
        }
      </View>


    </View>
  )
}

export default Nearbyjobs