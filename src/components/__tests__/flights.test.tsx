import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Flights } from '../Flights'

afterEach(cleanup)

const flights = [
    {
        ident: 'F1',
        depaturetime: 3000,
        arrivaltime: 6000,
        readable_departure: "00: 20",
        readable_arrival: "00: 30",
        origin: 'LDN',
        destination: 'NYC'

    },
    {
        ident: 'F2',
        depaturetime: 3000,
        arrivaltime: 6000,
        readable_departure: "00: 20",
        readable_arrival: "00: 30",
        origin: 'LDN',
        destination: 'NYC'
    }
]

test('Should render flights', () => {
    const { getByTestId } = render(<Flights flights={flights} />)
    expect(getByTestId('flight-F1')).toBeInTheDocument();
    expect(getByTestId('flight-F2')).toBeInTheDocument();
})