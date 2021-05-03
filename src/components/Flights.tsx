import React, { FC } from 'react'
import styled from 'styled-components'

const Flight = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items;
    justify-content;
    background-color: #d3f3f24D;
    transition: 0.3s;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    &:hover {
        background-color: #d3f3f280;
    };

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

interface Flights {
    ident: string;
    depaturetime: number;
    arrivaltime: number;
    readable_departure: string;
    readable_arrival: string;
    origin: string;
    destination: string;
}

interface Props {
    flights: Flights[]
}

export const Flights: FC<Props> = ({ flights }) => {

    const renderFlights = () => {
        return flights.map(({ ident, origin, destination, readable_arrival, readable_departure}) => {
            return (
                <Flight key={ident} data-testid={`flight-${ident}`}>
                    <Departure data-testid={`flight-${ident}-depature`}>{origin}</Departure>
                    <DepartureTime data-testid={`flight-${ident}-depature-time`}>{readable_departure}</DepartureTime>
                    <Arrival data-testid={`flight-${ident}-arrival`}>{destination}</Arrival>
                    <ArrivalTime data-testid={`flight-${ident}-arrival-time`}>{readable_arrival}</ArrivalTime>
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