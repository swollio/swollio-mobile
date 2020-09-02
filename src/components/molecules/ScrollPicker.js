import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colors from "../../styles/Color";

export default class ScrollPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected:
        this.props.data.findIndex(
          (number) => number === this.props.initialValue
        ) + 2,
    };

    this.viewabilityConfig = {
      itemVisiblePercentThreshold: 50,
    };

    this.onViewableItemsChanged.bind(this);
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems[2]) {
      this.setState({
        selected: viewableItems[2].index,
      });
      this.props.onChange(viewableItems[2].item);
    }
  }

  render() {
    return (
      <View style={[{ width: 300, height: 60 }, this.props.style]}>
        <FlatList
          style={{
            width: 300,
            height: 60,
            overflow: "hidden",
            borderRadius: 30,
          }}
          data={["", "", ...this.props.data, "", ""]}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          initialScrollIndex={this.state.selected - 2}
          onViewableItemsChanged={this.onViewableItemsChanged}
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={this.viewabilityConfig}
          horizontal
          snapToInterval={60}
          decelerationRate="fast"
          bounces={false}
          keyExtractor={(data, index) => index.toString()}
          getItemLayout={(data, index) => ({
            length: 60,
            offset: 60 * index,
            index,
          })}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                this.flatListRef.scrollToIndex({ index, viewPosition: 0.5 })
              }
            >
              <View
                style={[
                  styles.item,
                  (item === "" && styles.emptyItem) || {},
                  (index === this.state.selected && styles.selectedItem) || {},
                ]}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color:
                      index === this.state.selected
                        ? Colors.PrimaryContrast
                        : Colors.SurfaceContrast2,
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: Colors.Background,
  },
  emptyItem: {
    backgroundColor: Colors.Surface,
  },
  selectedItem: {
    backgroundColor: Colors.Primary,
  },
});
