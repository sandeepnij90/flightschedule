import React, { FC } from 'react'
import { getTomorrowDate } from '../util/getTomorrowDate'
import { Datepicker } from './Datepicker'
import styled from 'styled-components'
import { useApi } from '../hooks/useApi'
import { Aircrafts } from './Aircrafts'

const PageWrapper = styled.div`
    width: 100%;
    max-width: 768px;
    margin: auto;
`

export const App: FC = () => {
    const {data: aircrafts, loading: aircraftsLoading } = useApi('aircrafts')
    const flights = useApi('flights')

    const renderAircrafts = () => {
        if (aircraftsLoading) {
            return (
                <h1>loading...</h1>
            )
        }

        return (
            <Aircrafts aircrafts={aircrafts} /> 
        )
    }
    
    return (
        <PageWrapper>
            <Datepicker date={getTomorrowDate()} />
            {renderAircrafts()}
        </PageWrapper>
    )
}