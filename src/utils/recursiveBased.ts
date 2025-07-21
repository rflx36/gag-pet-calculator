import type { RoundingMethodType } from "../types";






export const getWeightByRecursion = (
    rounding_method: RoundingMethodType,
    target_age: number,
    current_weight: number,
    base_weight: number,
    dampening: number,
    weight_decimal: number
) => {

    if (isNaN(current_weight)) {
        return { value: 0, absolute: 0 }
    }

    const truncateDecimals = (weight: number) => {
        if (weight_decimal == 0) {
            return weight;
        }
        return parseInt((weight * weight_decimal).toString()) / weight_decimal;
    }


    const getNextWeight = (abs_w: number, curr_w: number, curr_a: number) => {
        if (curr_a >= target_age) {
            return { value: curr_w, absolute: abs_w };
        }
        const weight_decimal = truncateDecimals(curr_w);
        let calculated_weight = 0;
        let absolute_weight = 0;
        switch (rounding_method) {
            case "none":
                calculated_weight = weight_decimal + (base_weight / dampening);
                break;
            case "truncate":
                calculated_weight = parseInt(((weight_decimal + (base_weight / dampening)) * 100).toString()) / 100
                break;
            case "floor":
                calculated_weight = Math.floor((weight_decimal + (base_weight / dampening)) * 100) / 100
                break;
            case "ceil":
                calculated_weight = Math.ceil((weight_decimal + (base_weight / dampening)) * 100) / 100
                break;
            case "round off":
                calculated_weight = Math.round((weight_decimal + (base_weight / dampening)) * 100) / 100
                break;
        }
        if ((curr_a + 1) == target_age) {
            absolute_weight = weight_decimal + (base_weight / dampening);
        }
        return getNextWeight(absolute_weight, calculated_weight, curr_a + 1);
    }


    return getNextWeight(0, base_weight, 1);
}

