import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AreaChart, YAxis, XAxis, Grid } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import * as shape from "d3-shape";
import * as scale from "d3-scale";
import moment from "moment";
import Colors from "../../styles/Color";
import Fonts from "../../styles/Font";
import Card from "./Card";

export default function DataCard(props) {
  const WeightGradient = ({ index }) => (
    <Defs key={index}>
      <LinearGradient id="weightGradient" x1="0%" x2="0%" y1="100%" y2="0%">
        <Stop offset="0%" stopColor={Colors.Primary} stopOpacity={0.2} />
        <Stop offset="100%" stopColor={Colors.Primary} stopOpacity={1.0} />
      </LinearGradient>
    </Defs>
  );

  return (
    <Card barColor={Colors.Primary}>
      <Text style={styles.title}>{props.exercise_name}</Text>
      <View style={{ flexDirection: "row", display: "flex" }}>
        <YAxis
          style={{ flex: 0.1, marginBottom: 15 }}
          data={props.data}
          formatLabel={(value) => value}
          numberOfTicks={3}
          yAccessor={({ item }) => item.value}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: Colors.SurfaceContrast,
          }}
        />
        <View style={{ flex: 0.9 }}>
          <AreaChart
            style={{ height: 200 }}
            data={props.data}
            scale={scale.scaleTime}
            xAccessor={({ item }) => item.date}
            yAccessor={({ item }) => item.value}
            numberOfTicks={3}
            curve={shape.curveLinear}
            formatLabel={(value) => value}
            svg={{ fill: "url(#weightGradient)" }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid
              svg={{
                fill: Colors.SurfaceContrast,
                stroke: Colors.SurfaceContrast,
              }}
            />
            <WeightGradient />
          </AreaChart>
          <View style={{ height: 5 }} />
          <XAxis
            data={props.data}
            scale={scale.scaleTime}
            numberOfTicks={6}
            formatLabel={(_, index) =>
              moment(props.data[index].date).format("MM/DD")
            }
            contentInset={{ left: 10, right: 0 }}
            svg={{
              fill: Colors.SurfaceContrast,
              stroke: Colors.SurfaceContrast,
              height: 10,
            }}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  outerView: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.BackgroundContrast,
    fontFamily: Fonts.Header,
    textAlign: "left",
  },
});
