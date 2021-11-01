/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable default-case */
import React, {
	useEffect,
	useReducer,
	useContext,
	useState,
	useRef,
} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';

import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

import { firebaseApp, vapidKey } from './firebase/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { onMessage, getMessaging, getToken } from 'firebase/messaging';

import Loading from './components/Loading/Loading';
import DashBoard from './components/DashBoard/DashBoard';
import Detect from './components/Detect/Detect';
import Stretching from './components/Stretching/Stretching';
import { getPermission } from './common/getPermission';

function App() {
	// Firebase
	const app = initializeApp(firebaseApp);
	const useFirebaseMessage = () => {
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
			window.location.href = '/stretching';
		});
	};

	// to adapt DB Date format
	function formatLeftZero(value) {
		if (value >= 10) {
			return value;
		}
		return `0${value}`;
	}
	function toStringByFormatting(source, delimiter = '-') {
		const year = source.getFullYear();
		const month = formatLeftZero(source.getMonth() + 1);
		const day = formatLeftZero(source.getDate());
		return [year, month, day].join(delimiter);
	}

	const database = getDatabase(app);
	const starCountRef = ref(database);

	let getDB = '';
	onValue(starCountRef, (snapshot) => {
		getDB = snapshot.val();
	});

	const initialState = {
		// TODO : 임시로 userName 처리 해둠
		userName: 'kangho',
		todayDate: new Date(),
		isModalClose: true,
		isTurtle: false,
		todayCount: getDB,
		compareCount: getDB,
		countList: [],
	};

	function ourReducer(draft, action) {
		const date = toStringByFormatting(draft.todayDate);

		switch (action.type) {
			case 'getCountList':
				draft.countList = getDB.count[draft.userName];
				console.log(draft.countList);
				break;

			case 'handleDate':
				draft.todayDate = action.todayDate;
				break;

			case 'getCompareCount':
				const yesterday = toStringByFormatting(
					new Date(
						new Date(draft.todayDate).setDate(
							new Date(draft.todayDate).getDate() - 1,
						),
					),
				);

				console.log('오늘', draft.todayDate);
				console.log('어제', yesterday);
				console.log('xㅔ스으', getDB.count[draft.userName][yesterday]);
				draft.compareCount =
					getDB.count[draft.userName][date] &&
					getDB.count[draft.userName][yesterday]
						? getDB.count[draft.userName][date].count -
						  getDB.count[draft.userName][yesterday].count
						: 0;
				break;

			case 'getTodayCount':
				draft.todayCount = getDB.count[draft.userName][date]
					? getDB.count[draft.userName][date].count
					: 0;
				break;

			case 'closeModal':
				draft.isModalClose = true;
				console.log('close', draft.isModalClose);
				break;

			case 'openModal':
				draft.isModalClose = false;
				console.log('open', draft.isModalClose);
				break;

			case 'detectTurtle':
				draft.isTurtle = true;
				// TODO : 메세지 받았을 때 재처리
				onValue(starCountRef, (snapshot) => {
					getDB = snapshot.val();
					return getDB;
				});
				break;

			case 'finishStretch':
				draft.isTurtle = false;
				console.log('is finished?:', draft.isTurtle);
				break;
		}
	}

	const [state, dispatch] = useImmerReducer(ourReducer, initialState);

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
