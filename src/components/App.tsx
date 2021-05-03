import React, { FC, Fragment, useState, useEffect } from 'react'
import { getTomorrowDate } from '../util/getTomorrowDate'
import { Datepicker } from './Datepicker'
import styled from 'styled-components'
import { useApi } from '../hooks/useApi'
import { Aircrafts } from './Aircrafts'
import { Flights } from './Flights'

const PageWrapper = styled.div`
    width: 100%;
    max-width: 960px;
    margin: auto;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    column-gap: 16px;
`

const Title = styled.h2`

`

const AircraftWrapper = styled.div`

`

const Placeholder = styled.div`
    background-color: #cccccc;
`

const FlightsWrapper = styled.div``

export const App: FC = () => {
    const { data: aircrafts, loading: aircraftsLoading } = useApi('aircrafts')
    const { data: flights, loading: flightsLoading} = useApi('flights')
    const [selectedAircraft, setSelectedAircraft] = useState('')


    const selectAircraft = (ident: string) => {
        setSelectedAircraft(ident)
    }

    useEffect(() => {
        if (aircrafts.length) {
            setSelectedAircraft(aircrafts[0].ident)
        }
    },[aircrafts])

    const renderAircrafts = () => {
        if (aircraftsLoading) {
            return (
                <Fragment>
                    <Title>Aircrafts</Title>
                    <Placeholder />
                </Fragment>
            )
        }

        return (
            <Fragment>
                <Title>Aircrafts</Title>
                <Aircrafts
                aircrafts={aircrafts}
                onSelectAircraft={selectAircraft}
                selectedAircraft={selectedAircraft}
                /> 
            </Fragment>
        )
    }

    const renderFlights = () => {
        return (
            <Flights flights={flights} />
        )
    }

    return (
        <PageWrapper>
            <Datepicker date={getTomorrowDate()} />
            <Content>
                <AircraftWrapper>
                    {renderAircrafts()}
                </AircraftWrapper>
                <div>test</div>
                <FlightsWrapper>
                    <Title>Flights</Title>
                    {renderFlights()}
                </FlightsWrapper>
            </Content>
        </PageWrapper>
    )
}