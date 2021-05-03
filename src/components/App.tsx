import React, { FC, Fragment, useState, useEffect } from 'react'
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

export const App: FC = () => {
    const { data: aircrafts, loading: aircraftsLoading } = useApi('aircrafts')
    const [selectedAircraft, setSelectedAircraft] = useState('')

    console.log({selectedAircraft})
    const flights = useApi('flights')

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
    
    return (
        <PageWrapper>
            <Datepicker date={getTomorrowDate()} />
            <Content>
                <AircraftWrapper>
                    {renderAircrafts()}
                </AircraftWrapper>
                <div>test</div>
                <div>test</div>
            </Content>
        </PageWrapper>
    )
}