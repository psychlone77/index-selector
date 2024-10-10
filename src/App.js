import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const others = [ // add other random indexes here
    '230657B', '230658E', '230659H', '230660D', '230661G',
    // '230662K', '230663N', '230664T', '230665X', '230666C',
    '230577E', '230580G', '230581K', '230582N', '230584X',
    '230605P', '230609G', '230612J', '230613M', '230614R',
    '230621K', '230622N', '230624X', '230626F', '230627J',
    '230629R', '230636K', '230638T', '230640R', '230642B',
    '230651C', '230653J', '230655R', '230656V'
  ];

  const evenIndexes = [
    '230564L', //add the even index here
  ];
  const oddIndexes = [
    '230515N', //add the odd index here
  ];

const tempOthers = others.filter((item) => !evenIndexes.includes(item) && !oddIndexes.includes(item));
// console.log(tempOthers);
const numbers = tempOthers.concat(evenIndexes, oddIndexes);

const flag = 0; // set for 1 for odd and 0 for even
const targetIndexRef = useRef(null);

if (targetIndexRef.current === null) {
  if (flag === 0) {
    targetIndexRef.current = Math.floor(Math.random() * evenIndexes.length) + tempOthers.length; // even
  } else {
    targetIndexRef.current = Math.floor(Math.random() * oddIndexes.length) + tempOthers.length + evenIndexes.length; // odd
  }
}

const targetIndex = targetIndexRef.current;
console.log(targetIndex);
  // const targetIndex = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startMoving = () => {
    document.querySelector('.index-list').style.opacity = 1; // Disable transition
    if (!isAnimating) {
      setIsAnimating(true);
      let count = 0;
      const stepsToTarget = (targetIndex - currentIndex + numbers.length) % numbers.length + 10;

      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % numbers.length);
        count++;

        if (count >= stepsToTarget) {
          clearInterval(interval);
          setIsAnimating(false);
          setCurrentIndex(targetIndex); // Ensure it stops exactly at the target index
        }
      }, 100);
    }
  };

  return (
    <div className="container">
      <div className="index-list">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`index-item ${index === targetIndex && !isAnimating ? 'highlight' : ''}`}
            style={{
              top: `${((index - currentIndex + numbers.length) % numbers.length) * 300}px`,
            }}
          >
            {number}
          </div>
        ))}
      </div>
      <button onClick={startMoving} disabled={isAnimating}>
        Start
      </button>
    </div>
  );
}

export default App;