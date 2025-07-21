import { useState } from "react";
import TextGAG from "./components/text";
import ContainerGAG from "./components/container";
import InputGAG from "./components/inputs";



function App() {

    const [currentWeight, setCurrentWeight] = useState(1);
    const [currentAge, setCurrentAge] = useState(1);

    const getBaseWeight = () => {

    }

    return (
        <>
            {/* <App2/> */}
            <section className="max-w-[1400px] p-4 flex w-full  h-screen mx-auto bg-style bg-[#7A3E23] ">
                {/* <input type="" */}

                <ContainerGAG variants="external" className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 w-[600px]">
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
                    <div className="flex items-center gap-2 w-[600px]">
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

                    <button onClick={getBaseWeight} className="bg-[#26EE26] cursor-pointer hover:bg-[#1DB31D] h-max  py-2 px-6  box-border border-2 border-black/35 ">
                        <TextGAG text="Get Base KG" className="text-4xl text-center " strokeSize="lg" strokeOpacity={50} />
                    </button>
                </ContainerGAG>
            </section>
        </>
    )
}


export default App;