import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Colors from '../../styles/Color';
import Font from '../../styles/Font';
import DecrementButton from '../molecules/DecrementButton';
import CompleteSetButton from '../molecules/CompleteSetButton';
import ScrollPicker from '../molecules/ScrollPicker';
import Card from './Card';
import {getAlternativesForExercises} from '../../utilities/api';

function capitalize(text) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * This component is a controller for a single 'row' in the WorkoutCard
 * container. It allows users to mark a set completed, change the weight,
 * and change the reps.
 */
function SingleSetRow(props) {
  return (
    <View style={styles.rows}>
      <View style={styles.singleRowView}>
        <DecrementButton
          onChange={props.onChangeReps}
          style={styles.decrementButton}
          maxValue={props.initialReps}
          value={props.reps}
        />
        <Icon style={styles.smallX} size={24} name={'times'} />
        <TouchableOpacity onPress={props.onEdit} style={styles.editButton}>
          <Text style={styles.weightText}> {props.weight} lbs. </Text>
        </TouchableOpacity>
      </View>
      <CompleteSetButton
        icon={'check'}
        onPress={() => props.onCompleted(moment(new Date()).toISOString())}
        radius={25}
        completed={props.completed}
        fontSize={20}
      />
    </View>
  );
}

/**
 * This will create a special card called workout card, where we have rows
 * of Scroll Wheels, and the dataVals for each scroll wheel is passed in as
 * an array in a list of arrays
 *
 * @param {Object} props Contains props of workout card
 */
export default function WorkoutCard(props) {
  const [alternatives, setAlternatives] = useState(null);

  useEffect(() => {
    if (alternatives === null) {
      getAlternativesForExercises(props.exercise_id).then((data) => {
        setAlternatives(data);
      });
    }
    return () => {};
  });

  // Stores the index of the set for which the weight is currently being
  // edited. If no sets are currently being edited, then the editedSetIndex
  // should be -1.
  const NotCurrentlyEditingWeight = -1;
  const [editedSetIndex, setEditedSetIndex] = useState(
    NotCurrentlyEditingWeight,
  );

  const [chooseAlternatives, setChooseAlternatives] = useState(false);

  // Defining a constant which will make the appropriate amount
  // of scroll wheel rows
  const rowsView = (props.results || []).map((result, index) => {
    const enabled = index === 0 || props.results[index - 1].created !== null;

    return (
      <SingleSetRow
        key={index}
        weight={result.weight}
        reps={result.reps}
        initialReps={result.initalReps}
        completed={result.created !== null}
        onChangeReps={(reps) => {
          if (!props.results || !enabled) {
            return;
          }
          props.results[index].reps = reps;
          props.onChange(props.results);
        }}
        onCompleted={(timestamp) => {
          if (!props.results || !enabled) {
            return;
          }
          props.results[index].created = timestamp;
          props.onChange(props.results);
        }}
        onEdit={() => setEditedSetIndex(index)}
      />
    );
  });

  const editView =
    editedSetIndex === NotCurrentlyEditingWeight ? (
      rowsView
    ) : (
      <View style={styles.editView}>
        <ScrollPicker
          initialValue={props.results[editedSetIndex].weight}
          onChange={(weight) => {
            if (!props.results) {
              return;
            }
            props.results[editedSetIndex].weight = weight;
            props.onChange(props.results);
          }}
          data={[...Array(100).keys()].map((x) => (x + 1) * 5)}
        />
        <TouchableOpacity
          onPress={() => setEditedSetIndex(NotCurrentlyEditingWeight)}
          style={styles.setWeight}>
          <Text style={styles.editText}> Set Weight </Text>
        </TouchableOpacity>
      </View>
    );

  const alternativesView = (
    <View style={styles.alternativesView}>
      {(alternatives || []).map((a, i) => (
        <TouchableOpacity
          key={i}
          onPress={props.onEdit}
          style={styles.alternativeButton}>
          <Text style={styles.alternativeText}> {a.name} </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Card barColor={props.barColor}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{capitalize(props.title)}</Text>
        {chooseAlternatives ? (
          <Icon
            onPress={() => setChooseAlternatives(!chooseAlternatives)}
            style={styles.xIcon}
            size={24}
            name={'times'}
          />
        ) : (
          <Icon
            onPress={() => setChooseAlternatives(!chooseAlternatives)}
            style={styles.xIcon}
            size={24}
            name={'bars'}
          />
        )}
      </View>
      {chooseAlternatives ? alternativesView : editView}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: Colors.SurfaceContrast,
    fontFamily: Font.Header,
    textAlign: 'left',
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallX: {
    marginHorizontal: 8,
  },
  rows: {
    flexDirection: 'row',
    borderColor: '#EEE',
    borderTopWidth: 1,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decrementButton: {
    paddingHorizontal: 8,
    backgroundColor: Colors.Primary,
  },
  editButton: {
    borderColor: Colors.Primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  setWeight: {
    marginTop: 20,
    borderColor: Colors.Primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  weightText: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.Primary,
  },
  editView: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  editText: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.Primary,
  },
  alternativesView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  alternativeButton: {
    marginVertical: 6,
    borderColor: Colors.Primary,
    borderWidth: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  alternativeText: {
    fontSize: 22,
    textAlign: 'center',
    color: Colors.Primary,
  },
  xIcon: {
    width: 60,
    textAlign: 'center',
  },
});
