import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Colors from "../../styles/Color";
import Font from "../../styles/Font";
import ProgressDots from "../atoms/ProgressDots";
import Card from "./Card";
import Timer from "../molecules/Timer";
import CircularButton from "../atoms/CircularButton";
import AbSetup from "./AbSetup";

function AbstructionCompletedCard(props) {
  return (
    <Card>
      <View style={styles.completedContainer}>
        <Text style={styles.mega}>Completed</Text>
        <Text style={styles.body}>Way to go! Feel stronger yet?</Text>
        <View style={styles.completedIconContainer}>
          <Icon name="check" size={40} style={{ color: Colors.Primary }} />
        </View>
      </View>
    </Card>
  );
}

/**
 * This function will return a timer card that has the following props:
 * - exercises: string[] => An array of the exercises to be done
 * @param {Object} props All the props for this function
 */
export function AbTimerCard(props) {
  const [play, setPlay] = useState(true);

  return (
    <View>
      <Card style={styles.noBottomMargin}>
        <View style={styles.center}>
          <Timer
            paused={!play}
            onFinish={props.onFinish}
            timerVal={props.duration}
          />
          <Text style={styles.exercise}>{props.exercise}</Text>
          <View style={styles.row}>
            <CircularButton
              style={styles.circularButton}
              icon="step-backward"
              onPress={() => props.onRewind()}
            />
            <CircularButton
              style={styles.circularButton}
              icon={play ? "pause" : "play"}
              onPress={() => setPlay(!play)}
            />
            <CircularButton
              style={styles.circularButton}
              icon="step-forward"
              onPress={() => props.onFastForward()}
            />
          </View>
          <ProgressDots
            style={[{ margin: 80 / props.exerciseCount }]}
            numDots={props.exerciseCount}
            numEnabled={props.exerciseIndex + 1}
          />
        </View>
      </Card>
      <View style={styles.upNextView}>
        <Text style={styles.upNextText}>
          {" "}
          Up Next:
          {props.nextExercise}
        </Text>
      </View>
    </View>
  );
}

export default function AbCard(props) {
  const [duration, setDuration] = useState(0);
  const [numExercises, setNumExercises] = useState(0);

  const [progressState, setProgressState] = useState("setup");
  const MAX_INDEX = numExercises - 1;
  const [index, setIndex] = useState(0);

  const [totalTime, setTotalTime] = useState("");

  useEffect(() => {
    const totalSeconds = duration * numExercises;
    const minutes = Number.parseInt(totalSeconds / 60, 10);
    const seconds = totalSeconds - minutes * 60;
    if (minutes < 10) {
      setTotalTime(`0${minutes}:${seconds === 0 ? "00" : seconds}`);
    } else {
      setTotalTime(`${minutes}:${seconds === 0 ? "00" : seconds}`);
    }
  }, [duration, numExercises]);

  switch (progressState) {
    case "setup":
      return (
        <AbSetup
          totalTime={totalTime}
          onPress={(button) => setDuration(button)}
          onChange={(val) => setNumExercises(val)}
          onFinish={() => {
            if (duration !== 0) {
              setProgressState("in_progress");
            }
          }}
        />
      );
    case "in_progress":
      return (
        <AbTimerCard
          key={index}
          title="Abstruction"
          onFinish={() => {
            if (index < MAX_INDEX) {
              setIndex(index + 1);
            }
            if (index === MAX_INDEX) {
              setProgressState("completed");
            }
          }}
          onRewind={() => {
            if (index > 0) {
              setIndex(index - 1);
            }
            if (index === 0) {
              setProgressState("setup");
            }
          }}
          onFastForward={() => {
            if (index < MAX_INDEX) {
              setIndex(index + 1);
            }
            if (index === MAX_INDEX) {
              setProgressState("completed");
            }
          }}
          exercise={props.exercises[index]}
          nextExercise={
            index === MAX_INDEX ? "None" : props.exercises[index + 1]
          }
          exerciseCount={numExercises}
          duration={duration}
          exerciseIndex={index}
        />
      );
    case "completed":
      return <AbstructionCompletedCard />;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.SurfaceContrast,
    fontFamily: Font.Header,
    textAlign: "left",
    margin: 10,
  },
  mega: {
    fontSize: 36,
    fontFamily: Font.Header,
  },
  body: {
    fontSize: 16,
    fontFamily: Font.Header,
    marginVertical: 16,
  },
  timer: {
    fontSize: 69,
    fontFamily: Font.Header,
    margin: 10,
  },
  exercise: {
    fontSize: 24,
    fontFamily: Font.Header,
    marginBottom: 10,
  },
  progressDots: {
    marginTop: 20,
  },
  circularButton: {
    margin: 10,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  completedContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  completedIconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 30,
    borderColor: Colors.Primary,
  },
  noBottomMargin: {
    marginBottom: 0,
  },
  upNextView: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.SurfaceContrast2,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  upNextText: {
    fontFamily: Font.Header,
  },
});
