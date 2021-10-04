import { getMessaging, getToken } from 'firebase/messaging';

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
	vapidKey:
		'BMOnrECu4Xa6jXzROT0D5rk-BtjRk-99FYSiu4CUIABbE9H1avYvp14UbR5FHhZeDjz5KXvpKfRFqsi73D5sYE0',
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
