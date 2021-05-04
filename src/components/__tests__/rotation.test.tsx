import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Rotation } from '../Rotation'

afterEach(cleanup)

const schedule = [
    {
        id:'1',
        departuretime: 3000,
        arrivaltime: 4000,
        readable_departure: '02:00',
        readable_arrival: '03:00',
        origin: 'LDN',
        destination: 'NYC'
    }
]

test('Should render rotation based on schedule', () => {
    const { getByTestId } = render(<Rotation schedule={schedule} />)
    expect(getByTestId('rotation-1')).toBeInTheDocument()
})

test('Should render flight name', () => {
    const { getByTestId } = render(<Rotation schedule={schedule} />)
    expect(getByTestId('rotation-1-name')).toHaveTextContent('Flight: 1')
})

test('Should render origin', () => {
    const { getByTestId } = render(<Rotation schedule={schedule} />)
    expect(getByTestId('rotation-1-origin')).toHaveTextContent('LDN')
})

test('Should render destination', () => {
    const { getByTestId } = render(<Rotation schedule={schedule} />)
    expect(getByTestId('rotation-1-destination')).toHaveTextContent('NYC')
})