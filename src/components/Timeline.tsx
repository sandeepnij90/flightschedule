import React, { FC } from 'react'
import styled from 'styled-components'
import { FlightsStructure } from './Flights'

interface Props {
    schedule: FlightsStructure[]
}

interface BlockProps {
    width: number
    type: 'idle' | 'service' | 'turnaround'
}
const Block = styled.div<BlockProps>`
    display: inline-block;
    height: 16px;
    width: ${({ width }) => width || '0'}%;
    background-color: ${({ type }) => type === 'idle' ? '#ccc' : type === 'service' ? 'green' : 'purple'}
`

const Wrapper = styled.div`
    width: 100%;
    position: relative;
    &:before {
        content: '00:00';
        position: absolute;
        bottom: 20px;
    }
    &:after {
        content: '12:00';
        position: absolute;
        left: 50%;
        bottom: 20px;
    }
`

export const Timeline:FC<Props> = ({ schedule }) => {
    const day = 86400;

    const renderTimeline = () => {
        const component: any = [];

        schedule.forEach(({ departuretime, arrivaltime, id }, index) => {
            // initial idle
            if (index === 0) {
                const width = Math.round((departuretime / day) * 100)
                component.push(<Block key={`timeline${id}-initial-idle`} type="idle" width={width} />)
            }

            // turn around
            if (index >= 1 ) {
                const width = Math.round(((departuretime - schedule[index - 1].arrivaltime) / day) * 100)
                component.push(<Block key={`timeline${id}-turnaround`} type="turnaround" width={width} />)
            }

            // in service
            const serviceWidth = Math.round(((arrivaltime - departuretime) / day) * 100)
            component.push(<Block key={`timeline${id}-service`} type="service" width={serviceWidth} />)

            // final idle
            if (index === schedule.length - 1) {
                const width = Math.round((((day - arrivaltime) / day) * 100))
                component.push(<Block key={`timeline${id}-idle`}  type="idle" width={width} />)

            }

        })
        return component
    }
    

    return (
        <Wrapper>{renderTimeline()}</Wrapper>
    )
}