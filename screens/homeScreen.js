import React from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Button, TouchableHighlight } from 'react-native';

class HomeScreen extends React.Component {
  state = {
    records: [],
    showModule: false,
    fadeAnim: new Animated.Value(0)
  };

  _addRecord = a => {
    this.setState({ showModule: true });
    a();
  };

  _closeMoude = () => {
    this.setState({ showModule: false });
  };

  _animate = () => {
    this.setState({ fadeAnim: new Animated.Value(0) }, () => {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 200 // 2000ms
        }
      ).start();
    });
  };

  _animateFadeOut = a => {
    this.setState({ fadeAnim: new Animated.Value(1) }, () => {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 200 // 2000ms
        }
      ).start(() => {
        if (this.state.fadeAnim.__getValue() == 0) {
          a();
        }
      });
    });
  };

  render() {
    const styles = StyleSheet.create({
      background: {
        backgroundColor: '#007fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      },
      heading: { position: 'absolute', top: '7%', fontSize: 40, color: 'white', fontWeight: '800' },
      plusSign: { fontSize: 240, color: 'yellow', fontWeight: '300', padding: 0, margin: 0 },
      modal: {
        zIndex: 1,
        position: 'absolute',
        top: '20%',
        width: '80%',
        height: '60%',
        backgroundColor: 'white'
      },
      closeButtonMoudle: {
        width: '100%',
        backgroundColor: '#ff8000'
      }
    });
    return (
      <View style={styles.background}>
        <Text style={styles.heading}>ToDo App</Text>
        {this.state.records.length < 1 && (
          <View>
            <TouchableOpacity onPress={() => this._addRecord(this._animate)}>
              <Text style={styles.plusSign}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {this.state.showModule && (
          <Animated.View style={{ ...styles.modal, opacity: this.state.fadeAnim }}>
            <TouchableHighlight style={styles.closeButtonMoudle}>
              <Button title="EXIT" onPress={() => this._animateFadeOut(this._closeMoude)} color="white" />
            </TouchableHighlight>
          </Animated.View>
        )}
      </View>
    );
  }
}

export default HomeScreen;
