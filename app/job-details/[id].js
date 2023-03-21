import React from "react";
import { Text, View, SafeAreaView, ActivityIndicator, RefreshControl } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { ScrollView } from "react-native-gesture-handler";

const tabs = ["Sobre", "Requisitos", "Responsabilidades"]

const JobDetails = () => {
    const params = useSearchParams()
    const router = useRouter()
    const {data, isLoading, error} = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
    const onRefresh = () => {}
    const displayTabContent = () => {
        switch(activeTab) {
            case 'Sobre':
                return <JobAbout 
                            info={data[0].job_description ?? "Sem descrição"}
                        />
            case 'Requisitos':
                return <Specifics 
                            title='Requisitos'
                            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                        />
            case 'Responsabilidades':
                return <Specifics 
                            title='Responsabilidades'
                            points={data[0].job_highlights?.ResponsIbilities ?? ['N/A']}
                        />
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerTitleAlign: 'center',
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn 
                        iconUrl={icons.left}
                        dimension='60%'
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn 
                        iconUrl={icons.share}
                        dimension='60%'
                    />
                ),
                headerTitle: '',
                headerShadowVisible: false
            }} />

            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={COLORS.primary} />
                    ) : error ? (
                        <Text>Alguma coisa deu errado</Text>
                    ) : data.length === 0 ? (
                        <Text>Nenhuma informação</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 10 }}>
                            <Company 
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />

                            <JobTabs 
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                displayTabContent={displayTabContent}
                            />
                        </View>
                    )}
                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
            </>
                
        </SafeAreaView>
    )
}

export default JobDetails