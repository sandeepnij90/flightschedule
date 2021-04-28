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
    const day = currentDate.getDate() + 1
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    return `${day} ${months[month]} ${year}`
}