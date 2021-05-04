import React, { FC, Fragment, useState, useEffect } from 'react'
import { getTomorrowDate } from '../util/getTomorrowDate'
import { Datepicker } from './Datepicker'
import styled from 'styled-components'
import { useApi } from '../hooks/useApi'
import { Aircrafts } from './Aircrafts'
import { Flights, FlightsStructure } from './Flights'
import { Rotation } from './Rotation'
import { Timeline } from './Timeline'

const PageWrapper = styled.div`
    width: 100%;
    max-width: 960px;
    margin: auto;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto auto;
    column-gap: 16px;
`

interface TitleProps {
    center?: boolean; 
}

const Title = styled.h2<TitleProps>`
    text-align: ${({ center }) => center ? 'center' : 'left'};
`

const AircraftWrapper = styled.div``
const RotationWrapper = styled.div``

const Placeholder = styled.div`
    background-color: #cccccc;
`

const FlightsWrapper = styled.div``

const TimelineWrapper = styled.div`
    grid-column: 2;
    grid-row: 2;
    margin-top: 24px;
`

export const App: FC = () => {
    const [selectedAircraft, setSelectedAircraft] = useState('')
    const [availableFlights, setAvailableFlights] = useState([])
    const [schedule, setSchedule] = useState([])
    const [utilisation, setUtilisation] = useState(0);

    const { data: aircrafts, loading: aircraftsLoading } = useApi('aircrafts')
    const { data: flights, loading: flightsLoading } = useApi('flights')

    const getAircraftName = () => {
        const hasAircrafts = aircrafts.length && selectedAircraft
        
        if (hasAircrafts) {
            const aircraft = aircrafts.find(({ ident }) => ident === selectedAircraft)
            return aircraft.ident
        }
        return ''
    }

    const selectAircraft = (ident: string) => {
        setSelectedAircraft(ident)
    }

    const handleSelectFlight = (flight: FlightsStructure ) => {
        const newAvailableFlights = flights.filter(({ id }) => id !== flight.id)

        setSchedule(prevSchedule => [...prevSchedule, flight])
        setAvailableFlights(newAvailableFlights)
    }

    useEffect(() => {
        if (aircrafts.length) {
            setSelectedAircraft(aircrafts[0].ident)
        }
    }, [aircrafts])

    useEffect(() => {
        if (flights.length) {
            setAvailableFlights(flights)
        }
    }, [flights])

    useEffect(() => {
        const totalTime = schedule.reduce((acc, {arrivaltime, departuretime}) => acc + (arrivaltime - departuretime), 0)
        const util = Math.round((totalTime / 86400) * 100)
        setUtilisation(util)
        
    }, [schedule])

    const renderAircrafts = () => {
        if (aircraftsLoading) {
            return (
                <Placeholder />
            )
        }

        return (
            <Aircrafts
            aircrafts={aircrafts}
            onSelectAircraft={selectAircraft}
            selectedAircraft={selectedAircraft}
            utilisation={utilisation}
            /> 
        )
    }

    const renderFlights = () => {
        if (flightsLoading) {
            return (
                <Placeholder />
            )
        }
        return (
            <Flights
            flights={availableFlights}
            onSelectFlight={handleSelectFlight}
            schedule={schedule}
            />
        )
    }

    return (
        <PageWrapper>
            <Datepicker date={getTomorrowDate()} />
            <Content>
                <AircraftWrapper>
                    <Title>Aircrafts</Title>
                    {renderAircrafts()}
                </AircraftWrapper>
                <RotationWrapper>
                    <Title center>Rotation for {getAircraftName()}</Title>
                    <Rotation schedule={schedule} />
                </RotationWrapper>
                <TimelineWrapper>
                    <Timeline schedule={schedule} />
                </TimelineWrapper>
                <FlightsWrapper>
                    <Title>Flights</Title>
                    {renderFlights()}
                </FlightsWrapper>
            </Content>
        </PageWrapper>
    )
}