import type { RoundingMethodType } from "../types";
import { getWeightByFormula } from "./formulaBased";



function findWeightRange(roundingMethod: RoundingMethodType, currentAge: number, currentWeight: number, dampening: number, maxWeight = 500.0, precision = 0.001) {
    let base_weight_start = -1;
    let base_weight_end = -1;
    let totalAttempts = 0;

    // Binary search for base_weight_start (first occurrence of currentWeight)
    function findWeightStart(low: number, high: number) {
        let result = -1;

        while (low <= high) {
            totalAttempts++;
            const mid = (low + high) / 2;
            const weight_value = getWeightByFormula(roundingMethod, currentAge - 1, mid, dampening);

            console.log(`Start search - attempt:${totalAttempts} base_weight:${mid.toFixed(3)} weight:${weight_value}`);

            if (weight_value === currentWeight) {
                result = mid;
                high = mid - precision; // Continue searching left for first occurrence
            } else if (weight_value < currentWeight) {
                low = mid + precision;
            } else {
                high = mid - precision;
            }
        }

        return result;
    }

    // Binary search for base_weight_end (first value > currentWeight after start)
    function findWeightEnd(startWeight: number, high: number) {
        let result = -1;
        let low = startWeight;

        while (low <= high) {
            totalAttempts++;
            const mid = (low + high) / 2;
            const weight_value = getWeightByFormula(roundingMethod, currentAge - 1, mid, dampening);

            console.log(`End search - attempt:${totalAttempts} base_weight:${mid.toFixed(3)} weight:${weight_value}`);

            if (weight_value > currentWeight) {
                result = mid;
                high = mid - precision; // Look for earlier occurrence
            } else {
                low = mid + precision;
            }
        }

        return result;
    }

    // Step 1: Find the start weight
    base_weight_start = findWeightStart(0, maxWeight);

    // Step 2: If start found, find the end weight
    if (base_weight_start !== -1) {
        base_weight_end = findWeightEnd(base_weight_start, maxWeight);
    }

    console.log(`Binary Search completed in ${totalAttempts} attempts (vs ${maxWeight * 1000} linear attempts)`);



    return {
        min: base_weight_start,
        max: base_weight_end,
        avg: (base_weight_start + base_weight_end) / 2
    }
}
export default findWeightRange;