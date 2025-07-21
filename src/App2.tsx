
import { useEffect, useState } from "react";

function App2() {
  const options = ["truncate", "ceil", "round off", "floor", "none"];
  const options2 = ["none", "single", "two"];
  const options3 = ["recursive based", "formula based"];
  const [selectedOption, setSelectedOption] = useState<string>("truncate");
  const [selectedOption2, setSelectedOption2] = useState<string>("two");
  const [selectedOption3, setSelectedOption3] = useState<string>("recursive based");
  const [baseWeight, setBaseWeight] = useState(0);

  const [modifier, setModifier] = useState(10.25);
  const [targetAge, setTargetAge] = useState(1);



  const FormulaBasedNextAge = (target_age: number) => {
    const getRoundingMethod = () => {
      switch (selectedOption) {
        case "truncate":
          return parseInt(((baseWeight + (target_age * (baseWeight / modifier))) * 100).toString()) / 100
        case "none":
          return (baseWeight + (target_age * (baseWeight / modifier)));
        case "ceil":
          return Math.ceil((baseWeight + (target_age * (baseWeight / modifier))) * 100) / 100;
        case "floor":
          return Math.floor((baseWeight + (target_age * (baseWeight / modifier))) * 100) / 100;
        case "round off":
          return Math.round((baseWeight + (target_age * (baseWeight / modifier))) * 100) / 100;

        default:
          return 0;
      }
    }

    return getRoundingMethod()
  }
  const RecursiveNextAge = (absolute: number, weight: number, current_age: number, target_age: number) => {
    if (isNaN(weight)) {
      return { value: 0, absolute: 0 }
    }

    if (current_age >= target_age) {
      return { value: weight, absolute: absolute };
    }

    const getDecimalPoints = () => {
      switch (selectedOption2) {
        case "none":
          return weight;
        case "single":
          return parseInt((weight * 10).toString()) / 10
        default:
          return 0;
      }
    }

    let weight_decimal = getDecimalPoints();
    const getRoundingMethod = () => {
      switch (selectedOption) {
        case "truncate":
          return parseInt(((weight_decimal + (baseWeight / modifier)) * 100).toString()) / 100
        case "none":
          return weight_decimal + (baseWeight / modifier)
        case "ceil":
          return Math.ceil((weight_decimal + (baseWeight / modifier)) * 100) / 100
        case "floor":
          return Math.floor((weight_decimal + (baseWeight / modifier)) * 100) / 100
        case "round off":
          return Math.round((weight_decimal + (baseWeight / modifier)) * 100) / 100
        default:
          return 0;
      }
    }
    const calculated_weight = getRoundingMethod();
    let absolute_weight = 0;
    if ((current_age + 1) == target_age) {
      absolute_weight = weight_decimal + (baseWeight / modifier);
    }


    return RecursiveNextAge(absolute_weight, calculated_weight, current_age + 1, target_age);

  }

  const mappedValues = [1.18, 1.29, 1.4, 1.51, 1.61, 1.72, 1.83, 1.94, 2.05, 2.15, 2.26, 2.37, 2.48, 2.58]

  useEffect(() => {

  }, [modifier])
  return (
    <>
      {/* <div className="absolute size-20 -translate-x-10 -translate-y-15">
        <LiquidGlass className="rounded-md size-20 border">
          <p>Tests</p>
        </LiquidGlass>

      </div> */}
      <div className="w-[600px] h-max mx-auto mt-5 rounded-lg border border-black px-2 py-1.5">
        <div className="flex gap-2 h-52">
          <div className="border rounded-md flex-1/3 border-black p-2">
            <p className="font-bold">Calculation Method:</p>
            {options3.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rounding3"
                  value={option}
                  checked={selectedOption3 === option}
                  onChange={() => setSelectedOption3(option)}
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>
          <div className="border rounded-md flex-1/3 border-black p-2">
            <p className="font-bold">Select Rounding Method:</p>

            {options.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>
          {selectedOption3 == "recursive based" &&
            <div className="border rounded-md flex-1/3 border-black p-2">


              <p className="font-bold">Select decimal point:</p>
              {options2.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rounding2"
                    value={option}
                    checked={selectedOption2 === option}
                    onChange={() => setSelectedOption2(option)}
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>}
        </div>
        {
          selectedOption2 == "single" &&
          parseInt((baseWeight * 10).toString()) / 10
        }


        <br />
        <p>Modifier:</p>
        <input
          type="number"
          value={modifier}
          step={0.01}
          onChange={e => { setModifier(e.currentTarget.valueAsNumber) }}
          className="w-full px-2 py-1 bg-slate-100 border border-slate-500 rounded-md"
        />
        <br />
        <p>Age:{targetAge}</p>
        <input
          type="range"
          min={1}
          max={50}
          value={targetAge}
          onChange={e => { setTargetAge(e.currentTarget.valueAsNumber) }}
          className="w-full"
        />
        <br />

        <p>Base weight:</p>
        <input
          type="number"
          value={baseWeight}
          onChange={e => { setBaseWeight(e.currentTarget.valueAsNumber) }}
          step={0.01}
          className=" w-full px-2 py-1 bg-slate-100 border border-slate-500 rounded-md mb-4"
        />

        {

        }



        {selectedOption3 == "recursive based" ?

          <>
            <p className="mb-2">Predicted Weight at {targetAge}: {RecursiveNextAge(0, baseWeight, targetAge, 50).value || "loading"} kg</p>
            {Array.from({ length: 50 }, (_, i) => {
              const value = RecursiveNextAge(0, baseWeight, 1, i + 1);

              return (
                // <p key={i}>{i + 1}</p>
                <div key={i} className="flex">
                  <div className="w-10">
                    {i + 1}
                  </div>
                  <div className={"min-w-16 max-w-52  pl-2 " + ((mappedValues[i] === (value.value || 0)) ? "bg-green-300" : "bg-red-300")}>
                    {value.value || "loading"}
                  </div>
                  <div className="w-10 pl-2">
                    {value.absolute || ""}
                  </div>


                </div>
              )
            })}
          </>
          : <>
            <p className="mb-2">Predicted Weight at {targetAge}: {FormulaBasedNextAge(targetAge) || "loading"} kg</p>
            {Array.from({ length: 50 }, (_, i) => {
              const value = FormulaBasedNextAge(i);
              return (
                <div key={i} className="flex">
                  <div className="w-10">
                    {i + 1}
                  </div>
                  <div className={"min-w-16 max-w-52 pl-2 " + ((mappedValues[i] === value || 0) ? "bg-green-300" : "bg-red-300")}>
                    {value || "loading"}
                  </div>
                  <div className="w-10 pl-2">

                  </div>
                </div>
              )
            })

            }
          </>
        }


      </div >
    </>
  )
}

export default App2;
