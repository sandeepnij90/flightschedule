import React, { FC } from 'react'
import styled from 'styled-components'
import { FlightsStructure } from './Flights'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
    max-height: 500px;
    overflow-y: auto;
`

const RotationItem = styled.div`
    margin-bottom: 20px;
    padding: 0 16px 16px;
    border-bottom: 1px solid #cccccc;
`

const RotationDetails = styled.div`
    display: grid;
    grid-template-columns: auto 2fr auto;
`

const Departure = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    column-gap: 8px;
`

const Arrival = styled.div`
    grid-column: 3;
    align-items: end;
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    column-gap: 8px;
`

const IconWrapper = styled.div`
    grid-column: 1;
    grid-row: 1 / 3;
`

const Location = styled.div`
    grid-column: 2;
    grid-row: 1;
`

const Time = styled.div`
    grid-column: 2;
    grid-row: 2;
`
interface Props {
    schedule: FlightsStructure[]
}

export const Rotation:FC<Props>= ({schedule}) => {
    const renderRotation = () => {
        return schedule.map(({id, readable_arrival, readable_departure, origin, destination }) => {
            return (
                <RotationItem key={id} data-testid={`rotation-${id}`}>
                    <h4 data-testid={`rotation-${id}-name`}>Flight: {id}</h4>
                    <RotationDetails>
                        <Departure>
                            <IconWrapper><FontAwesomeIcon icon={faPlaneDeparture} /></IconWrapper>
                            <Location data-testid={`rotation-${id}-origin`}>{origin}</Location>
                            <Time data-testid={`rotation-${id}-departure-time`}>{readable_departure}</Time>
                        </Departure>
                        <Arrival>
                            <IconWrapper><FontAwesomeIcon icon={faPlaneArrival} /></IconWrapper>
                            <Location data-testid={`rotation-${id}-destination`}>{destination}</Location>
                            <Time data-testid={`rotation-${id}-arrival-time`}>{readable_arrival}</Time>
                        </Arrival>
                    </RotationDetails>
                </RotationItem>
            )
        })
    }

    return <Wrapper>{renderRotation()}</Wrapper>
}