import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Flights } from '../Flights'

afterEach(cleanup)

const flights = [
    {
        id: 'F1',
        departuretime: 3000,
        arrivaltime: 6000,
        readable_departure: "00:20",
        readable_arrival: "00:30",
        origin: 'LDN',
        destination: 'NYC'

    },
    {
        id: 'F2',
        departuretime: 3000,
        arrivaltime: 6000,
        readable_departure: "00:20",
        readable_arrival: "00:30",
        origin: 'LDN',
        destination: 'NYC'
    }
]

test('Should render flights', () => {
    const { getByTestId } = render(<Flights flights={flights} schedule={[]} onSelectFlight={() => null} />)
    expect(getByTestId('flight-F1')).toBeInTheDocument();
    expect(getByTestId('flight-F2')).toBeInTheDocument();
})

test('Should render origin', () => {
    const { getByTestId } = render(<Flights flights={flights} schedule={[]} onSelectFlight={() => null} />)
    expect(getByTestId('flight-F1-departure')).toHaveTextContent('LDN');
})

test('Should render destination', () => {
    const { getByTestId } = render(<Flights flights={flights} schedule={[]} onSelectFlight={() => null} />)
    expect(getByTestId('flight-F1-arrival')).toHaveTextContent('NYC');
})

test('Should render departure time of flight', () => {
    const { getByTestId } = render(<Flights flights={flights} schedule={[]} onSelectFlight={() => null} />)
    expect(getByTestId('flight-F1-departure-time')).toHaveTextContent('00:20');
})

test('Should render arrival time of flight', () => {
    const { getByTestId } = render(<Flights flights={flights} schedule={[]} onSelectFlight={() => null} />)
    expect(getByTestId('flight-F1-arrival-time')).toHaveTextContent('00:30');
})

test('Should call function when clicked', () => {
    const func = jest.fn()
    const { getByTestId } = render(<Flights flights={flights} schedule={[]} onSelectFlight={func} />)
    fireEvent.click(getByTestId('flight-F1'))
    expect(func).toBeCalled()
})


 // Running out of time - would add in tests for all validation cases
        // Previous destination must be matching flight origin
        // Cant be flown during midnight
        // Cant be betwen turnaround time
        // Cant have previous flight departure time greater than current flight departure time