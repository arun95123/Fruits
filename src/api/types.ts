export type ApiResponse<T> = {
    isSuccess: boolean
    data: T | null
}

export type Nutritions = {
    calories: number
    fat: number
    sugar: number
    carbohydrates: number
    protein: number
}

export type FruitData = {
    name: string
    id: number
    family: string
    order: string
    genus: string
    nutritions: Nutritions
}

export type FruitResponse = FruitData[]