import {useState} from 'react';
function ClickCount() {
    const [count, setcount] = useState(0);
    return(
        <div>
            <button onClick={() => setcount(count + 1)}>Click me</button>
            <label>Click {count} time</label>
        </div>
    );
}

export default ClickCount;