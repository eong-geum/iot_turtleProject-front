/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable default-case */
import React, { useContext } from 'react';
import { firebaseApp, vapidKey } from './firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import StateContext from '../StateContext';

const myFirebaseApp = () => {
	const app = initializeApp(firebaseApp);
	return app;
};

const myFirebaseDB = () => {
	const appState = useContext(StateContext);
	// Firebase

	const database = getDatabase(myFirebaseApp());
	const starCountRef = ref(database);

	let getDB = '';

	onValue(starCountRef, (snapshot) => {
		getDB = snapshot.val();
		getDB = getDB.count[appState.userName];
	});

	return getDB;
};

export { myFirebaseApp, myFirebaseDB };
