import React, { FC, Fragment, useState, useEffect } from 'react'
import { getTomorrowDate } from '../util/getTomorrowDate'
import { Datepicker } from './Datepicker'
import styled, { keyframes } from 'styled-components'
import { useApi } from '../hooks/useApi'
import { Aircrafts } from './Aircrafts'
import { Flights, FlightsStructure } from './Flights'
import { Rotation } from './Rotation'
import { Timeline, TimelineKey } from './Timeline'

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

const Title = styled.h2`
    text-align: center;
`

const pulse = keyframes`
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
`

const Placeholder = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 8px;
    background-color: #FAFAFA;
    animation: ${pulse} 0.3s linear infinite;
`

const TimelineWrapper = styled.div`
    grid-column: 2;
    grid-row: 2;
    margin-top: 24px;
`

const NoFlightsSelected = styled.h3`
    text-align: center;
    padding-top: 50px;
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

    const renderRotation = () => {
        if (schedule.length) {
            return (
                <Rotation schedule={schedule} />
            )
        }

        return (
            <NoFlightsSelected>Please select a flight</NoFlightsSelected>
        )
    }

    const renderTimeline = () => {
        if (schedule.length) {
            return (
                <Fragment>
                    <Timeline schedule={schedule}/>
                    <TimelineKey />
                </Fragment>
            )
        }
    }

    return (
        <PageWrapper>
            <Datepicker date={getTomorrowDate()} />
            <Content>
                <div>
                    <Title>Aircrafts</Title>
                    {renderAircrafts()}
                </div>
                <div>
                    <Title>Rotation for {getAircraftName()}</Title>
                    {renderRotation()}
                </div>
                <TimelineWrapper>
                    {renderTimeline()}
                </TimelineWrapper>
                <div>
                    <Title>Flights</Title>
                    {renderFlights()}
                </div>
            </Content>
        </PageWrapper>
    )
}