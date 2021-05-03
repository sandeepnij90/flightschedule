import { useEffect, useState } from 'react'

export const useApi = (endpoint : 'aircrafts' | 'flights') => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchApi = async (url: 'https://infinite-dawn-93085.herokuapp.com/aircrafts' | 'https://infinite-dawn-93085.herokuapp.com/flights') => {
        const res = await fetch(url)
        const response = await res.json()
        setData(response.data)
        setLoading(false)
    }


    const getData = () => {
        switch(endpoint) {
            case 'aircrafts': return fetchApi('https://infinite-dawn-93085.herokuapp.com/aircrafts')
            case 'flights': return fetchApi('https://infinite-dawn-93085.herokuapp.com/flights')
            default: return fetchApi('https://infinite-dawn-93085.herokuapp.com/aircrafts')
        }
    }

    useEffect(() => {
        getData()
    },[])

    return {
        data,
        loading
    }
}