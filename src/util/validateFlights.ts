import { FlightsStructure } from '../components/Flights'

export const validateFlight = (flight: FlightsStructure, previousFlight: FlightsStructure) => {
    const turnaroundTime = 1200;
    const fullDay = 86400

    const didTeleport = flight.origin !== previousFlight.destination
    const didGoBackInTime = flight.departuretime < previousFlight.departuretime
    const turnaroundOverlap = (flight.departuretime - previousFlight.arrivaltime) <= turnaroundTime
    const notGrounded = flight.departuretime > fullDay || flight.arrivaltime > fullDay

    if (didTeleport) return true
    if (didGoBackInTime) return true
    if (turnaroundOverlap) return true
    if (notGrounded) return true
    
    return false
}