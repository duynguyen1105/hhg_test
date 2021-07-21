import React, {useState} from 'react'


const Counter = () => {
    const [count, setCount] = useState(0)
    const handleIncrease = () =>{
        setCount(x=>x+1)
    }
    const handleReset = () =>{
        setCount(0)
    }
    return (
        <div>
            {count}
            <button onClick={handleIncrease}>
                Increase
            </button>
            <button onClick={handleReset}>
                Reset
            </button>
        </div>
    )
}

export default Counter
