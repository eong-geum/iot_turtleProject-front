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
		} else if (stretchState === 'stop') {
			return 'close';
		} else {
			return 'play';
		}
	};

	const [seconds, setSeconds] = useState(30);

	useEffect(() => {
		let countdown = setInterval(() => {
			if (parseInt(seconds) > 0) {
				setSeconds(parseInt(seconds) - 1);
			} else {
				appDispatch({ type: 'finishStretch' });
				props.history.push('/');
			}
		}, 1000);

		if (stretchState === 'pause') {
			clearInterval(countdown);
		}
		return () => clearInterval(countdown);
	}, [seconds]);

	const handleStretchButton = () => {
		if (stretchState === 'stop') {
			setStretchState('pause');
		} else if (stretchState === 'pause') {
			setSeconds(parseInt(seconds) - 1);
			setStretchState('play');
		} else {
			appDispatch({ type: 'finishStretch' });
			props.history.push('/');
		}
	};

	return (
		<div className="stretching-page">
			<>
				<h2>30초만 스트레칭</h2>
				<div className="count-circle">
					<p className="count-number"> {seconds} </p>
				</div>

				<div>
					<p
						className="stretching__button"
						onClick={() => handleStretchButton()}
					>
						{buttonUI()}
					</p>
					<p
						className="stretching__button"
						onClick={() => props.history.push('/')}
					>
						close
					</p>
				</div>
			</>
		</div>
	);
};

export default withRouter(Stretching);
