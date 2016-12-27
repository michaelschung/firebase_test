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
	button1: {
		position: 'absolute',
		backgroundColor: 'blue',
		width: 100,
		top: 100,
		padding: 10,
	},
	button2: {
		position: 'absolute',
		backgroundColor: 'blue',
		width: 100,
		top: 200,
		padding: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
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

	readData(state, update, id) {
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
			state.string = id == 'string' ? snap.val().string : snap.val().number;
			console.log('string after set (from readData):', state.string);
			update();
		});
	}

	handlePress = (id) => {
		console.log('button pressed!');
		var rootUpdate = this.forceUpdate.bind(this);
		this.readData(this.state, rootUpdate, id);
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
					style={styles.button1}
					onPress={() => this.handlePress('string')}
				>
					<Text style={styles.buttonText}>string</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button2}
					onPress={() => this.handlePress('number')}
				>
					<Text style={styles.buttonText}>number</Text>
				</TouchableOpacity>
			</View>
		);
	}
};

export default App;