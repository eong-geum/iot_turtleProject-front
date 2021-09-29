import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import turtleImg from '../../assets/detectTutle.png';
import calendar from '../../assets/calendar.png';

import '../../css/detect.css';

const Detect = (props) => {
	const handleStart = () => {
		props.history.push('/stretching');
	};

	return (
		<div className="detect">
			<span className="group">
				<p className="title"> 거북목이 감지되었어요 </p>
				<p className="sub"> 함께 스트레칭을 해볼까요? </p>
			</span>
			<img className="detect-turtle-img" src={turtleImg} />
			<button className="start-active" onClick={handleStart}>
				start
			</button>
		</div>
	);
};

export default withRouter(Detect);
