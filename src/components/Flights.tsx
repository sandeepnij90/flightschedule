import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { validateFlight } from '../util/validateFlights' 

interface FlightProps {
    isDisabled: boolean;
}

const Wrapper = styled.div`
    max-height: 500px;
    overflow-y: auto;
`

const Flight = styled.div<FlightProps>`
    transition: 0.3s;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    background-color: #d3f3f24D;
    &:hover {
        background-color: #d3f3f280;
    };
    ${({ isDisabled }) => isDisabled && css`
        opacity: 0.3;
        cursor: default;
    `}
`

const Details = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items;
    justify-content;
`

const Departure = styled.div`
    text-transform: uppercase;
    grid-column: 1;
    grid-row: 1;
`

const DepartureTime = styled.div`
    grid-column: 1;
    grid-row: 2;
`

const Arrival = styled.div`
    text-transform: uppercase;
    grid-column: 3;
    grid-row: 1;
`

const ArrivalTime = styled.div`
    grid-column: 3;
    grid-row: 2;
`

const ID = styled.div`
    text-align: center;
    padding-bottom: 8px;
`

export interface FlightsStructure {
    id: string;
    departuretime: number;
    arrivaltime: number;
    readable_departure: string;
    readable_arrival: string;
    origin: string;
    destination: string;
}

interface Props {
    flights: FlightsStructure[];
    onSelectFlight: (flightInfo: FlightsStructure) => void;
    schedule: FlightsStructure[]
}

export const Flights: FC<Props> = ({ flights, onSelectFlight, schedule }) => {

    const handleSelect = (flight: FlightsStructure, isDisabled: boolean) => () => {
        if(!isDisabled) {
            onSelectFlight(flight)
        }
    }

    const getDisabled = (flight: FlightsStructure) => {
        if (schedule.length) {
            return validateFlight(flight, schedule[schedule.length -1])
        }
    }

    const renderFlights = () => {
        return flights.map((flight) => {
            return (
                <Flight key={flight.id} onClick={handleSelect(flight, getDisabled(flight))} isDisabled={getDisabled(flight)}>
                    <ID data-testid={`flight-${flight.id}`}>{flight.id}</ID>
                    <Details>
                        <Departure data-testid={`flight-${flight.id}-departure`}>{flight.origin}</Departure>
                        <DepartureTime data-testid={`flight-${flight.id}-departure-time`}>{flight.readable_departure}</DepartureTime>
                        <Arrival data-testid={`flight-${flight.id}-arrival`}>{flight.destination}</Arrival>
                        <ArrivalTime data-testid={`flight-${flight.id}-arrival-time`}>{flight.readable_arrival}</ArrivalTime>
                    </Details>
                </Flight>
            )
        })
    }

    return (
        <Wrapper data-testid="flights">
            {renderFlights()}
        </Wrapper>
    )
}