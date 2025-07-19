import type { RoundingMethodType } from "../types";




export const getWeightByFormula = (
    rounding_method: RoundingMethodType,
    target_age: number,
    base_weight: number,
    dampening: number,
) => {

    switch (rounding_method) {
        case "none":
            return base_weight + (target_age * (base_weight / dampening));
        case "truncate":
            return parseInt(((base_weight + (target_age * (base_weight / dampening))) * 100).toString()) / 100;
        case "floor":
            return Math.floor((base_weight + (target_age * (base_weight / dampening))) * 100) / 100
        case "ceil":
            return Math.ceil((base_weight + (target_age * (base_weight / dampening))) * 100) / 100
        case "round off":
            return Math.round((base_weight + (target_age * (base_weight / dampening))) * 100) / 100
        default:
            return 0;
    }
}