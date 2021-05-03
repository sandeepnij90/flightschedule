import React, { FC, Fragment } from 'react'
import styled from 'styled-components'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Data {
    base: string;
    economySeats: number;
    ident: string;
    type: string;
}

interface Props {
    aircrafts: Data[];
    selectedAircraft: string;
    onSelectAircraft: (ident: string) => void;
}

interface WrapperProps {
    isSelected: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 8px;
    background-color:${({ isSelected }) => isSelected ? '#d3f3f280' : '#d3f3f24D'};
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background-color: #d3f3f280;
    }
`

const AircraftName = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
`

const Name = styled.h3`
    margin: 0;
    padding-right: 8px;
    text-align: right;
`

const Utilisation = styled.div`
    display: grid;
    grid-template-colums: 1fr;
    grid-template-rows: auto 5px;
    padding-top: 16px;
`

const UtilisationText = styled.h5`
    margin: 0;
`

const UtilisationBar = styled.div`
    width: 100%;
    height: 5px;
    background-color: #ccc;
    position: relative;
    &:after {
        content: '';
        width: 0;
        height: 5px;
        position: absolute;
        background-color: green;
    }
`

export const Aircrafts: FC<Props> = ({
    aircrafts,
    selectedAircraft,
    onSelectAircraft,
}) => {

    const handleSelectAircraft = (ident: string) => () => {
        onSelectAircraft(ident)
    }

    const renderAircrafts = () => {

        return aircrafts.map(({ ident }) => {
            const isSelected = ident === selectedAircraft
            return (
                <Wrapper
                    isSelected={isSelected} 
                    key={ident} data-testid={`aircraft-${ident}`}
                    onClick={handleSelectAircraft(ident)}
                 >
                    <AircraftName key={ident}>
                        <FontAwesomeIcon icon={faPlane} />
                        <Name>{ident}</Name>
                    </AircraftName>
                    <Utilisation>
                        <UtilisationText>
                            Utilisation 0%
                        </UtilisationText>
                        <UtilisationBar />
                    </Utilisation>
                </Wrapper>
            )
        })
    }

    return (
        <div data-testid="aircraft-wrapper">
            {renderAircrafts()}
        </div>
    )
}