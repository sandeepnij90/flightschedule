import React, { FC } from 'react'
import styled from 'styled-components'


interface Data {
    base: string;
    economySeats: number;
    ident: string;
    type: string;
}

interface Props {
    aircrafts: Data[]
}

const Wrapper = styled.div`
    border-right: 1px solid #cccccc;
`

const Aircraft = styled.div`
    width: 300px;
    height: 50px;
    display: grid;
    justify-content: center;
    align-items: center;
`

export const Aircrafts: FC<Props> = ({ aircrafts }) => {

    console.log({aircrafts})
    const renderAircrafts = () => {
        return aircrafts.map(({ ident }) => {
            return (
                <Aircraft key={ident}>
                    {ident}
                </Aircraft>
            )
        })
    }

    return (
        <Wrapper>
            <h1>aircrafts</h1>
            {renderAircrafts()}
        </Wrapper>
    )
}