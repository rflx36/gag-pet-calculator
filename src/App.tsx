import { type RoundingMethodType, type CalculationMethodType, type CalculationResultType, } from "./types";
import React, { useState } from "react";
import TextGAG from "./components/text";
import ContainerGAG from "./components/container";
import InputGAG from "./components/inputs";
// import App2 from "./App2";
import findWeightRange from "./utils/findWeightRange";



function App() {

    const [currentWeight, setCurrentWeight] = useState(1);
    const [currentAge, setCurrentAge] = useState(1);
    // const [enableExperimental, setEnableExperimental] = useState(true);
    const enableExperimental = true;

    const [dampening, setDampening] = useState(11);
    const [baseWeight, setBaseWeight] = useState<CalculationResultType>(-1);
    const [calculationMethod, setCalculationMethod] = useState<CalculationMethodType>("formula");
    const [roundingMethod, setRoundingMethod] = useState<RoundingMethodType>("truncate")
    const [decimalAmount, setDecimalAmount] = useState(0);

    const getBaseWeight = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = findWeightRange(roundingMethod, currentAge, currentWeight, dampening);

        setBaseWeight(result)
    }

    // const toTruncate = (value: number) => {
    //     return parseInt((value * 100).toString()) / 100;
    // }

    return (
        <>
            {/* <App2 /> */}
            <section className="w-max p-4 flex flex-col items-center gap-4 h-screen mx-auto bg-style bg-[#7A3E23] ">
                {/* <input type="" */}
                {
                    enableExperimental &&
                    <ContainerGAG variants="external" className="w-max flex flex-col gap-4">

                        <TextGAG text="These options are experimental and you may modify them to replicate real game data" className="w-[850px]" strokeOpacity={50} strokeSize="md" />
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 w-max ">
                                <ContainerGAG variants="internal">

                                    <TextGAG text="Calculation Method:" strokeOpacity={50} strokeSize="md" />
                                    <div className="flex gap-4">
                                        <button onClick={() => setCalculationMethod("formula")} className={" box-border border-2 border-black/35 " + ((calculationMethod == "formula") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A]  cursor-pointer hover:bg-[#686868]")}>
                                            <TextGAG text="Formula based" className="text-2xl text-center px-2 py-1" strokeSize="md" strokeOpacity={50} />
                                        </button>
                                        <button onClick={() => setCalculationMethod("recursive")} className={" box-border border-2 border-black/35 " + ((calculationMethod == "recursive") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                            <TextGAG text="Recursive based" className="text-2xl text-center px-2 py-1" strokeSize="md" strokeOpacity={50} />
                                        </button>
                                    </div>
                                    <p className=" font-comic text-black/50 italic translate-y-1">type of calculation upon getting the weight</p>
                                </ContainerGAG>
                                <ContainerGAG variants="internal" className=" w-full h-[132px]">
                                    <div className="h-10 flex items-center gap-2 w-full">

                                        <TextGAG text="Dampening:" strokeOpacity={50} strokeSize="md" />
                                        <InputGAG
                                            type="number"
                                            value={dampening}
                                            onChange={e => { setDampening(e.currentTarget.valueAsNumber) }}
                                            className="text-2xl flex-1/2  "
                                            textClassName="text-2xl -translate-y-1"
                                            step={0.01}
                                            min={0.01}
                                            max={1000}
                                            strokeOpacity={50}
                                            strokeSize="md"
                                        />
                                    </div>
                                </ContainerGAG>
                            </div>

                            <div className="flex flex-col gap-2 w-[420px]">

                                <ContainerGAG variants="internal">
                                    <TextGAG text="Rounding Method:" strokeOpacity={50} strokeSize="md" className="text-2xl" />
                                    <div className="flex gap-2">

                                        <button onClick={() => setRoundingMethod("none")} className={" box-border border-2 border-black/35 " + ((roundingMethod == "none") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                            <TextGAG text="none" className="text-lg text-center px-2 py-1" strokeSize="sm" strokeOpacity={50} />
                                        </button>
                                        <button onClick={() => setRoundingMethod("truncate")} className={" box-border border-2 border-black/35 " + ((roundingMethod == "truncate") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                            <TextGAG text="truncate" className="text-lg text-center px-2 py-1" strokeSize="sm" strokeOpacity={50} />
                                        </button>
                                        <button onClick={() => setRoundingMethod("floor")} className={" box-border border-2 border-black/35 " + ((roundingMethod == "floor") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                            <TextGAG text="floor" className="text-lg text-center px-2 py-1" strokeSize="sm" strokeOpacity={50} />
                                        </button>
                                        <button onClick={() => setRoundingMethod("ceil")} className={" box-border border-2 border-black/35 " + ((roundingMethod == "ceil") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                            <TextGAG text="ceil" className="text-lg text-center px-2 py-1" strokeSize="sm" strokeOpacity={50} />
                                        </button>
                                        <button onClick={() => setRoundingMethod("round off")} className={" box-border border-2 border-black/35 " + ((roundingMethod == "round off") ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                            <TextGAG text="round off" className="text-lg text-center px-2 py-1" strokeSize="sm" strokeOpacity={50} />
                                        </button>
                                    </div>
                                </ContainerGAG>
                                {
                                    calculationMethod == "recursive" &&
                                    <ContainerGAG variants="internal" className="w-full">
                                        <TextGAG text="Calculation Limit:" strokeOpacity={50} strokeSize="md" />
                                        <div className="flex gap-2">
                                            <button onClick={() => setDecimalAmount(0)} className={" box-border border-2 border-black/35 " + ((decimalAmount == 0) ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                                <TextGAG text="none" className="text-2xl text-center px-2 py-1" strokeSize="md" strokeOpacity={50} />
                                            </button>
                                            <button onClick={() => setDecimalAmount(1)} className={" box-border border-2 border-black/35 " + ((decimalAmount == 1) ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                                <TextGAG text="one" className="text-2xl text-center px-2 py-1" strokeSize="md" strokeOpacity={50} />
                                            </button>
                                            <button onClick={() => setDecimalAmount(2)} className={" box-border border-2 border-black/35 " + ((decimalAmount == 2) ? "bg-[#3A9CFF] " : "bg-[#8A8A8A] cursor-pointer  hover:bg-[#686868]")}>
                                                <TextGAG text="two" className="text-2xl text-center px-2 py-1" strokeSize="md" strokeOpacity={50} />
                                            </button>
                                        </div>

                                        <p className=" font-comic text-black/50 italic translate-y-1"> weight result decimal limitation before every instance of recursion</p>
                                    </ContainerGAG>


                                }
                            </div>
                        </div>
                    </ContainerGAG>

                }
                <form onSubmit={getBaseWeight}>
                    <ContainerGAG variants="external" className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 w-[600px]  h-[3.75rem]">
                            <TextGAG
                                text="Current Weight:"
                                className="text-4xl flex-1/2"
                                strokeSize="lg"
                                strokeOpacity={50}
                            />
                            <InputGAG
                                type="number"
                                value={currentWeight}
                                onChange={e => { setCurrentWeight(e.currentTarget.valueAsNumber) }}
                                className="text-4xl flex-1/2"
                                textClassName="text-4xl"
                                step={0.01}
                                min={0.01}
                                max={1000}
                                concatValue="kg"
                                strokeOpacity={50}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-[600px] h-[3.75rem]">
                            <TextGAG
                                text="Current Age:"
                                className="text-4xl flex-1/2"
                                strokeSize="lg"
                                strokeOpacity={50}
                            />
                            <InputGAG
                                type="number"
                                value={currentAge}
                                onChange={e => { setCurrentAge(e.currentTarget.valueAsNumber) }}
                                className="text-4xl flex-1/2"
                                textClassName="text-4xl"
                                step={1}
                                min={1}
                                max={100}
                                strokeOpacity={50}
                            />
                        </div>

                        <button type="submit" className="bg-[#26EE26] cursor-pointer hover:bg-[#1DB31D] h-max  py-2 px-6  box-border border-2 border-black/35 ">
                            <TextGAG text="Get Base KG" className="text-4xl text-center " strokeSize="lg" strokeOpacity={50} />
                        </button>

                    </ContainerGAG>
                </form>

                {
                    baseWeight != -1 &&
                    <ContainerGAG variants="glass" className="flex flex-col gap-2">
                        <TextGAG text={"Base weight: " + (parseInt((baseWeight.avg * 100).toString()) / 100) + " KG"} className="text-4xl text-center" strokeSize="lg" strokeOpacity={50} />
                        {
                            enableExperimental &&
                            <>
                                <TextGAG text={"Min: " + baseWeight.min.toFixed(6) + " KG"} className="text-2xl text-center" strokeSize="md" strokeOpacity={50} />
                                <TextGAG text={"Max: " + baseWeight.max.toFixed(6) + " KG"} className="text-2xl text-center" strokeSize="md" strokeOpacity={50} />
                            </>
                        }
                        <TextGAG text="Note: Values are only predicted and may be off set by 0.01kg to 0.1kg" className="text-lg text-yellow-300" strokeSize="md" strokeOpacity={50}/>
                    </ContainerGAG>
                }
            </section>
        </>
    )
}


export default App;