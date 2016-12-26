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
		top: 20,
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
	}

	readData = () => {
		// database.ref('random').once('value').then(function(snapshot) {
		// 	var string = snapshot.val().string;
		// 	console.log('STRING:', string);
		// });
		database.ref('random').on('value', (snap) => {
			var str = snap.val().string;
			console.log('STR:', str);
			this.setState({
				string: str
			});
		})
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

		return (
			<View style={styles.container}>
				<Text style={styles.text}>{this.state.string}</Text>
			</View>
		);
	}
};

export default App;