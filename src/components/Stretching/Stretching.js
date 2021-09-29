import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import turtleImg from '../../assets/detectTutle.png';
import calendar from '../../assets/calendar.png';

import '../../css/stretching.css';

const Stretching = (props) => {
	const [stretchState, setStretchState] = useState('start');

	const buttonUi = () => {
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
			props.history.goBack();
		}
	};

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
					{buttonUi()}
				</div>
			</>
		</div>
	);
};

export default withRouter(Stretching);
