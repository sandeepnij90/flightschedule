import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Flights } from '../Flights'

afterEach(cleanup)

const flights = [
    {
        id: 'F1',
        depaturetime: 3000,
        arrivaltime: 6000,
        readable_departure: "00:20",
        readable_arrival: "00:30",
        origin: 'LDN',
        destination: 'NYC'

    },
    {
        id: 'F2',
        depaturetime: 3000,
        arrivaltime: 6000,
        readable_departure: "00:20",
        readable_arrival: "00:30",
        origin: 'LDN',
        destination: 'NYC'
    }
]

test('Should render flights', () => {
    const { getByTestId } = render(<Flights flights={flights} />)
    expect(getByTestId('flight-F1')).toBeInTheDocument();
    expect(getByTestId('flight-F2')).toBeInTheDocument();
})

test('Should render origin', () => {
    const { getByTestId } = render(<Flights flights={flights} />)
    expect(getByTestId('flight-F1-departure')).toHaveTextContent('LDN');
})

test('Should render destination', () => {
    const { getByTestId } = render(<Flights flights={flights} />)
    expect(getByTestId('flight-F1-arrival')).toHaveTextContent('NYC');
})

test('Should render departure time of flight', () => {
    const { getByTestId } = render(<Flights flights={flights} />)
    expect(getByTestId('flight-F1-departure-time')).toHaveTextContent('00:20');
})

test('Should render arrival time of flight', () => {
    const { getByTestId } = render(<Flights flights={flights} />)
    expect(getByTestId('flight-F1-arrival-time')).toHaveTextContent('00:30');
})