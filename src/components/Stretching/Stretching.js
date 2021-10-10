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

	const [stretchState, setStretchState] = useState('start');

	const buttonUI = () => {
		if (stretchState === 'start') {
			return 'start';
		} else if (stretchState === 'stop') {
			return 'stop';
		} else {
			return 'close';
		}
	};

	const handleStretchButton = () => {
		if (stretchState === 'start') {
			setStretchState('stop');
		} else if (stretchState === 'stop') {
			setStretchState('close');
		} else {
			appDispatch({ type: 'finishStretch' });
		}
	};

	useEffect(() => {
		if (!appState.isTurtle) {
			props.history.push('/home');
		}
	}, [appState.isTurtle]);

	return (
		<div className="stretching-page">
			<>
				<h2>30초만 스트레칭</h2>
				<div className="count-circle">
					<p className="count-number"> 30 : 00 </p>
				</div>

				<div
					className="stretching__button"
					onClick={() => {
						handleStretchButton();
					}}
				>
					{buttonUI()}
				</div>
			</>
		</div>
	);
};

export default withRouter(Stretching);
