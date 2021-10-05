/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable default-case */
import React, { useEffect, useReducer, useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import { firebaseApp, vapidKey } from './firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { onMessage, getMessaging, getToken } from 'firebase/messaging';

import Loading from './components/Loading/Loading';
import DashBoard from './components/DashBoard/DashBoard';
import Detect from './components/Detect/Detect';
import Stretching from './components/Stretching/Stretching';
import { getPermission } from './common/getPermission';

function App() {
	const initialState = {
		isTurtle: false,
		detectedCount: JSON.parse(localStorage.getItem('detectedCount'))
			? JSON.parse(localStorage.getItem('detectedCount'))
			: 0,
	};

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'detectTurtle':
				draft.isTurtle = true;
				localStorage.setItem(
					'detectedCount',
					JSON.stringify((draft.detectedCount += 1)),
				);
				console.log('reducer:', draft.isTurtle);
				break;
			case 'finishStretch':
				draft.isTurtle = false;
				console.log('is finished?:', draft.isTurtle);
				break;
		}
	}
	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

	const useFirebaseMessage = () => {
		initializeApp(firebaseApp);
		const messaging = getMessaging();

		// 토큰 확인
		getToken(messaging, {
			vapidKey: vapidKey,
		})
			.then((currentToken) => {
				if (currentToken) {
					console.log(currentToken);
				} else {
					console.log(
						'No registration token available. Request permission to generate one.',
					);
				}
			})
			.catch((err) => {
				console.log('An error occurred while retrieving token. ', err);
			});

		// backgroundMessage는 sw 에서 처리합니다.
		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);

			const title = payload.notification.title;
			const options = {
				body: payload.notification.body,
			};

			dispatch({ type: 'detectTurtle' });
		});
	};

	useEffect(() => {
		getPermission();
		useFirebaseMessage();
	}, []);

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<Switch>
						<Route path="/" exact>
							<Loading />
						</Route>
						<Route path="/home" exact>
							<DashBoard />
						</Route>
						<Route path="/detect" exact>
							<Detect />
						</Route>
						<Route path="/stretching" exact>
							<Stretching />
						</Route>
					</Switch>
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	);
}

export default App;
