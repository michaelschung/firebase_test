import React from 'react';
import {
	Menu,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native';

import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyAPKcoQB6qvSVPyGBLgeVwRA8sns7TllYI",
	authDomain: "fir-test-b5c57.firebaseapp.com",
	databaseURL: "https://fir-test-b5c57.firebaseio.com",
	storageBucket: "fir-test-b5c57.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const { Component } = React;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
	text: {
		flex: 1,
		fontFamily: 'Avenir',
		fontSize: 50,
	},
	button: {
		position: 'absolute',
		backgroundColor: 'blue',
		width: 100,
		top: 100,
		padding: 10,
	},
	container: {
		flex: 1,
		borderLeftWidth: 1,
		borderColor: '#8E8E8E',
	},
});

class Button extends Component {
	handlePress(e) {
		console.log('button pressed!');
	}

	render() {
		return (
			<TouchableOpacity
				onPress={this.handlePress.bind(this)}
				style={styles.button}
			>
				<Text>button</Text>
			</TouchableOpacity>
		);
	}
}

class TestText extends Component {
	render() {
		return (
			<Text style = {styles.text}>{str}</Text>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			string: 'hello'
		};

		console.log('constructor');
	}

	readData(state, update) {
		console.log('readData() called!');
		// database.ref('random').once('value').then(function(snapshot) {
		// 	var string = snapshot.val().string;
		// 	console.log('STRING:', string);
		// });
		database.ref('random').once('value').then(function(snap) {
			var str = snap.val().string;
			console.log('STR:', str);
			// this.setState({
			// 	string: str
			// });
			state.string = str;
			console.log('string after set (from readData):', state.string);
			update();
		});
	}

	handlePress = () => {
		console.log('button pressed!');
		var rootUpdate = this.forceUpdate.bind(this);
		this.readData(this.state, rootUpdate);
		console.log('string after set (from handlePress):', this.state.string);
	}

	/* Render everything */
	render() {
		console.log('rendering App');

		database.ref('random').set({
			number: 123,
			string: 'hi'
		});

		// var data = this.readData();
		// console.log('DATA:', data);

		console.log('string initial:', this.state.string);

		return (
			<View style={styles.container}>
				<Text style={styles.text}>{this.state.string}</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => this.handlePress()}
				>
					<Text>hello</Text>
				</TouchableOpacity>
			</View>
		);
	}
};

export default App;