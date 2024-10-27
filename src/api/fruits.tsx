import axios from 'axios'

import { ApiResponse, FruitResponse } from './types'

export const getFruits = async (): Promise<ApiResponse<FruitResponse>> => {
    try {
        const response = await axios.get<FruitResponse>('/api/get-fruits')
        return {
            isSuccess: true,
            data: response.data
        }
    } catch (e) {
        //Log unexpected errors
        return {
            isSuccess: false,
            data: null
        }
    }
}