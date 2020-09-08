import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

import RootHeader from "../../components/organisms/RootHeader";
import WaterMark from "../../components/organisms/WaterMark";
import TabPageStyles from "../styles/TabPage";
import useApi from "../../utilities/api";
import { UserContext } from "../../utilities/UserContext";
import DataCard from "../../components/organisms/DataCard";

export default function AthleteStatisticsScreen() {
  const { user } = useContext(UserContext);
  const [weightSeries, setWeightSeries] = useState(null);
  const { getStatisticsForAthlete } = useApi();
  useEffect(() => {
    if (weightSeries === null) {
      getStatisticsForAthlete(user.athlete_id).then((data) => {
        setWeightSeries(data);
      });
    }
    return () => {};
  });

  return (
    <SafeAreaView style={TabPageStyles.pageContainer}>
      <RootHeader title="Progress." />
      <View style={TabPageStyles.pageMain}>
        {(weightSeries === null && <WaterMark title="Loading..." />) ||
          (weightSeries.length === 0 && (
            <WaterMark title="No Statistics" />
          )) || (
            <ScrollView padding={10} style={{ height: "100%" }}>
              {weightSeries.map((e, index) => {
                return (
                  <DataCard
                    key={index}
                    exercise_name={e.exercise_name}
                    data={e.weight_series.map((x) => ({
                      value: x.avg_weight,
                      date: new Date(x.date),
                    }))}
                  />
                );
              })}
            </ScrollView>
          )}
      </View>
    </SafeAreaView>
  );
}
