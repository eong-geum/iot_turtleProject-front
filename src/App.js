import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading/Loading';
import DashBoard from './components/DashBoard/DashBoard';
import Detect from './components/Detect/Detect';
import Stretching from './components/Stretching/Stretching';
import { firebaseApp, vapidKey } from './firebase/firebaseConfig';

import { initializeApp } from 'firebase/app';
import { onMessage, getMessaging, getToken } from 'firebase/messaging';

function App() {
	useEffect(() => {
		if (!('Notification' in window)) {
			alert('알람 기능을 사용할 수 없습니다.');
		} else if (Notification.permission === 'granted') {
			console.log('granted');
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then(function (permission) {
				if (permission === 'granted') {
					console.log('사용자가 알람 권한을 허용 하였습니다.');
				}
			});
		}

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

			const notificationTab = new Notification(title, options);
			notificationTab.onclick = function (event) {
				event.preventDefault(); // prevent the browser from focusing the Notification's tab
				window.open('http://localhost:3000/stretching');
			};
		});
	}, []);

	return (
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
	);
}

export default App;
