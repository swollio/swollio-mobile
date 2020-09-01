import React, {useState, useEffect} from 'react';
import {Text, Vibration} from 'react-native';
import Font from '../../styles/Font';

function zero_pad(num, n) {
  return ('0' + num).slice(-n);
}

/**
 * This function will create a timer with the following attributes:
 * - timerVal : number => The amount of time the timer starts with
 * - onFinish: What to do when timer is finished (should unmount)
 */
export default function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(props.timerVal);

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.paused) {
        return;
      }
      if (timeLeft <= 1) {
        props.onFinish();
        Vibration.vibrate();
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <Text style={styles.timer}>
      {zero_pad(Math.floor(timeLeft / 60), 1)}:{zero_pad(timeLeft % 60, 2)}
    </Text>
  );
}

const styles = {
  timer: {
    fontSize: 69,
    fontFamily: Font.Header,
    margin: 10,
  },
};
