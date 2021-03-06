export const getTomorrowDate = () => {
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

    const currentDate = new Date()
    const tomorrowDate = new Date(currentDate)
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    const day = tomorrowDate.getDate()
    const month = tomorrowDate.getMonth()
    const year = tomorrowDate.getFullYear()

    return `${day} ${months[month]} ${year}`
}