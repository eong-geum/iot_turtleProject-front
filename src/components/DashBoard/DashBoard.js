/* eslint-disable */

import React, { useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

import turtleImg from '../../assets/turtleGroup.png';
import calendar from '../../assets/calendar.png';

// import TurtleModal from '../../common/component/turtleModal';
import Stretching from '../Stretching/Stretching';

import '../../css/dashBoard.css';

const DashBoard = (props) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	useEffect(() => {
		if (appState.isTurtle) {
			props.history.push('/detect');
		}
	}, [appState.isTurtle]);

	const month = new Date().getMonth();

	const day = new Date().getDay();

	return (
		<div className="DashBoard">
			<div className="pc__table--left">
				<span className="header">
					<p className="header__title">
						{' '}
						{month}월 {day}일{' '}
					</p>
					<p className="header__subtitle">
						{' '}
						터틀과 함께 거북목에서 벗어나볼까요?
					</p>
				</span>
				<img className="turtle-img" src={turtleImg} />
				<div className="bottom">
					<p className="main-content">거북목 감지 NN회</p>
					<p className="sub-content">전 날보다 NN회 많이 감지 되었어요.</p>
				</div>
			</div>
			<div className="pc__table--right">
				<div className="content-circle__container">
					<span className="content-circle__group content-circle__group--left">
						{/* <p className="content-circle__title">거북목 감지</p>
				<p className="content-circle__content">10</p> */}
					</span>

					<span className="content-circle__group content-circle__group--right">
						<p className="content-circle__title">거북목 감지</p>
						<p className="content-circle__content">
							{appState.detectedCount}회
						</p>
					</span>

					<span className="content-circle__group content-circle__group--bottom"></span>
				</div>
			</div>
		</div>
	);
};

export default withRouter(DashBoard);
