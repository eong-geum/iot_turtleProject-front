export const getPermission = () => {
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
};
