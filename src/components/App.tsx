import React, { FC } from 'react'
import { getTomorrowDate } from '../util/getTomorrowDate'
import { Datepicker } from './Datepicker'
import styled from 'styled-components'

const PageWrapper = styled.div`
    width: 100%;
    max-width: 768px;
    margin: auto;
`

export const App: FC = () => {

    return (
        <PageWrapper>
            <Datepicker date={getTomorrowDate()} />
        </PageWrapper>
    )
}