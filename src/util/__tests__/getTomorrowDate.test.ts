import '@testing-library/jest-dom'
import { getTomorrowDate } from '../getTomorrowDate'

test('should return tomorrows date', () => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const result = getTomorrowDate()
    const currentDate = new Date()
    const tomorrowDate = new Date(currentDate)
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    const day = tomorrowDate.getDate()
    const month = tomorrowDate.getMonth()
    const year = tomorrowDate.getFullYear()

    expect(result).toEqual(`${day} ${months[month]} ${year}`)
})