import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Aircrafts } from '../Aircrafts'

afterEach(cleanup)

test('Should render an aircraft', () => {
    const { getByTestId } = render(<Aircrafts aircrafts={[]} selectedAircraft="" onSelectAircraft={() => null} />)
    expect(getByTestId('aircraft-wrapper')).toBeInTheDocument()
})



test('Should render aircrafts', () => {
    const aircrafts = [{ ident: 'A1', base: '1', economySeats: 1, type: '1' }, { ident: 'A2', base: '1', economySeats: 1, type: '1' }]
    const { getByTestId } = render(<Aircrafts aircrafts={aircrafts} selectedAircraft="" onSelectAircraft={() => null} />)
    expect(getByTestId('aircraft-A1')).toBeInTheDocument()
    expect(getByTestId('aircraft-A2')).toBeInTheDocument()
})

test('Should select aircraft on click', () => {
    const func = jest.fn()
    const aircrafts = [{ ident: 'A1', base: '1', economySeats: 1, type: '1' }, { ident: 'A2', base: '1', economySeats: 1, type: '1' }]
    const { getByTestId } = render(<Aircrafts aircrafts={aircrafts} selectedAircraft="" onSelectAircraft={func} />)
    fireEvent.click(getByTestId('aircraft-A1'))
    expect(func).toBeCalled()

})