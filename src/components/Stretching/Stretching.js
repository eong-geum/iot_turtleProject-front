import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

import turtleImg from '../../assets/detectTutle.png';
import calendar from '../../assets/calendar.png';

import '../../css/stretching.css';

const Stretching = (props) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const [stretchState, setStretchState] = useState('stop');

	const buttonUI = (props) => {
		if (stretchState === 'stop') {
			return 'stop';
		} else {
			return 'close';
		}
	};

	const [seconds, setSeconds] = useState(30);

	useEffect(() => {
		const countdown = setInterval(() => {
			if (parseInt(seconds) > 0) {
				setSeconds(parseInt(seconds) - 1);
			}
		}, 1000);

		if ( stretchState === "close") {
			 clearInterval(countdown) 
		}
		return () => clearInterval(countdown);
	}, [seconds]);

	const handleStretchButton = () => {
		if (stretchState === 'stop') {
			setStretchState('close');
		} else {
			appDispatch({ type: 'finishStretch' });
			props.history.push('/home')
		}
	};

	return (
		<div className="stretching-page">
			<>
				<h2>30초만 스트레칭</h2>
				<div className="count-circle">
					<p className="count-number"> {seconds} </p>
				</div>

				<div
					className="stretching__button"
					onClick={() => handleStretchButton()}
				>
					{buttonUI()}
				</div>
			</>
		</div>
	);
};

export default withRouter(Stretching);
