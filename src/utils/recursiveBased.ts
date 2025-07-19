import type { RoundingMethodType } from "../types";






export const getAgeByRecursion = (
    rounding_method: RoundingMethodType,
    current_age: number,
    target_age: number,
    current_weight: number,
    absolute_weight: number,
    base_weight: number,
    dampening: number,
) => {

    if (isNaN(current_weight)){
        return {}
    }

}