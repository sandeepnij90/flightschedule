import React, { FC } from 'react'
import styled from 'styled-components'

const Flight = styled.div`
  transition: 0.3s;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    background-color: #d3f3f24D;
    &:hover {
        background-color: #d3f3f280;
    };
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
    depaturetime: number;
    arrivaltime: number;
    readable_departure: string;
    readable_arrival: string;
    origin: string;
    destination: string;
}

interface Props {
    flights: FlightsStructure[];
    onSelectFlight: (flightInfo: FlightsStructure) => void;
}

export const Flights: FC<Props> = ({ flights, onSelectFlight }) => {

    const handleSelect = (flight: FlightsStructure) => () => {
        onSelectFlight(flight)
    }

    const renderFlights = () => {
        return flights.map((flight) => {
            return (
                <Flight key={flight.id} onClick={handleSelect(flight)}>
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
        <div data-testid="flights">
            {renderFlights()}
        </div>
    )
}