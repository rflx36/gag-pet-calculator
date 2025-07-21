import type React from "react";
import { getStrokeStyleLg, getStrokeStyleMd, getStrokeStyleSm, getStrokeStyleXl, type strokeOpacityType } from "./strokes";
import { useState } from "react";


interface InputGAGProps {
    type: "text" | "number",
    value: string | number,
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    textClassName?: string,
    strokeSize?: 'sm' | 'md' | 'lg' | 'xl';
    strokeOpacity?: strokeOpacityType;
    concatValue?: string,
    step?: string | number | undefined,
    min?: string | number | undefined,
    max?: string | number | undefined,
}



function InputGAG({
    type = "number",
    value = 0,
    onChange,
    className,
    textClassName,
    strokeSize = 'xl',
    strokeOpacity = 100,
    concatValue,
    step,
    min,
    max,
}: InputGAGProps) {

    const [isFocused, setIsFocued] = useState(false);

    const strokeSizeClasses = {
        sm: getStrokeStyleSm(strokeOpacity),
        md: getStrokeStyleMd(strokeOpacity),
        lg: getStrokeStyleLg(strokeOpacity),
        xl: getStrokeStyleXl(strokeOpacity)
    }

    let valid = true;

    if (type == "number") {
        valid = !isNaN(parseInt(value.toString()))
    }

    const display_value = (valid) ? value : (type == "number") ? 0 : "";
    const input_value = (valid) ? value : 0;

    return (
        <div className={`relative h-full pl-2 group bg-[#714227]  border-2 border-black/50 overflow-hidden w-full shadow-[inset_0_0_10px_2px_rgba(0,0,0,0.5)] ${isFocused ? " border-blue-400" : ""}`}>
            <div className="absolute top-0 font-comic w-full h-full">

                <input
                    type={type}
                    value={input_value}
                    onChange={e => { onChange(e) }}
                    step={step}
                    min={min}
                    max={max}
                    onFocus={() => setIsFocued(true)}
                    onBlur={() => setIsFocued(false)}
                    className={`input-style text-2xl select-none text-high w-full h-full  text-transparent overflow-hidden ` + className}
                />
                <div className="absolute top-2 select-none pointer-events-none">
                    <p className={`text-2xl text-white  relative z-20 ${textClassName}`}>{display_value} {concatValue}</p>
                    <p className={`text-2xl absolute text-black top-0 z-10 ${strokeSizeClasses[strokeSize]} ${textClassName}`}>{display_value} {concatValue}</p>
                </div>
            </div>
        </div>
    )
}



export default InputGAG;