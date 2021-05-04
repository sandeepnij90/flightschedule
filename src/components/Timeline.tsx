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

const TimelineKeyWrapper= styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 16px;
`

const TimelineItem = styled.div`
    display: grid;
    grid-template-columns: 16px auto;
    column-gap: 10px;
    align-items: center;
`
interface TimelineBoxProps {
    type: 'idle' | 'service' | 'turnaround'
}

const TimelineBox = styled.div<TimelineBoxProps>`
    width: 16px;
    height: 16px;
    background-color: ${({ type }) => type === 'idle' ? '#ccc' : type === 'service' ? 'green' : 'purple'}
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

export const TimelineKey: FC = () => {
    return (
        <TimelineKeyWrapper>
            <TimelineItem>
                <TimelineBox type="idle" />
                idle
            </TimelineItem>
            <TimelineItem>
                <TimelineBox type="service" />
                in service
            </TimelineItem>
            <TimelineItem>
                <TimelineBox type="turnaround" />
                turnaround time
            </TimelineItem>
        </TimelineKeyWrapper>
    )
}