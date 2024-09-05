import React, { useState, useRef } from 'react';
import './App.css';

function App() {
const others = [
  '230001K', '230002N', '230003T', '230004X', '230005C',
  '230006F', '230007J', '230008M', '230009R', '230010L',
  // '230011P', '230012U', '230013A', '230014D', '230015G',
  '230016K', '230017N', '230018T', '230019X', '230020R',
  '230021V', '230022B', '230023E', '230024H', '230025L',
  '230026P', '230027U', '230028A', '230029D', '230030X',
  // '230031C', '230032F', '230033J', '230034M', '230035R',
  '230036V', '230037B', '230038E', '230039H', '230040D',
  '230041G', '230042K', '230043N', '230044T', '230045X',
  // '230046C', '230047F', '230048J', '230049M', '230050H',
  '230051L', '230052P', '230053U', '230054A', '230055D',
  // '230056G', '230057K', '230058N', '230059T', '230060M',
  '230061R', '230062V', '230063B', '230064E', '230065H',
  '230066L', '230067P', '230068U', '230069A', '230070T',
  // '230071X', '230072C', '230073F', '230074J', '230075M',
  // '230076R', '230077V', '230078B', '230079E', '230080A',
  '230081D', '230082G'
];

const evenIndexes = [
  '230010L', '230026P', '230028A', '230030X', '230038E',
  '230054A', '230068U'
];

const oddIndexes = [
  '230027U', '230041G', '230045X', '230069A', '230079E'
];

const tempOthers = others.filter((item) => !evenIndexes.includes(item) && !oddIndexes.includes(item));
// console.log(tempOthers);
const numbers = tempOthers.concat(evenIndexes, oddIndexes);

const flag = 1; // set for 1 for odd and 0 for even
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