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
		initializeApp(firebaseApp);
		const messaging = getMessaging();

		getToken(messaging, {
			vapidKey: vapidKey,
		})
			.then((currentToken) => {
				if (currentToken) {
					// Send the token to your server and update the UI if necessary
					// ...
					console.log(currentToken);
				} else {
					// Show permission request UI
					console.log(
						'No registration token available. Request permission to generate one.',
					);
					// ...
				}
			})
			.catch((err) => {
				console.log('An error occurred while retrieving token. ', err);
				// ...
			});

		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			var title = payload.notification.title;
			var options = {
				body: payload.notification.body,
				icon: payload.notification.icon,
			};
			var notification = new Notification(title, options);

			console.log(options);
			// ...
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
