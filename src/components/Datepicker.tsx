import React, { FC } from 'react'
import styled from 'styled-components'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
    display: grid;
    column-gap: 8px;
    grid-template-columns: 20px max-content 20px;
    justify-content: center;
    justify-items: center;
    margin: 24px 0;
`

const IconWrapper = styled.div`
    color: #cccccc;
    cursor: not-allowed;
`

interface Props {
    date: string;
}

export const Datepicker:FC<Props> = ({ date }) => {
    return (
        <Wrapper>
            <IconWrapper>
                <FontAwesomeIcon icon={faChevronLeft} />
            </IconWrapper>
            <div>
                {date}
            </div>
            <IconWrapper>
                <FontAwesomeIcon icon={faChevronRight} />
            </IconWrapper>
        </Wrapper>
    )
}