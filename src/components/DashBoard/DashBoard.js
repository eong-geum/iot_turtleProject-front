/* eslint-disable */

import React, { useEffect, useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import Calendar from 'react-calendar';

import turtleImg from '../../assets/turtleGroup.png';
import calendar from '../../assets/calendar.png';

// import TurtleModal from '../../common/component/turtleModal';
import Stretching from '../Stretching/Stretching';
import TurtleCalendar from './TurtleCalendar';

import '../../css/dashBoard.css';

const DashBoard = (props) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	// TODO : date 로직 분리
	const [date, setDate] = useState(new Date());
	const onChange = (date) => {
		setDate(date);
		appDispatch({ type: 'handleDate', todayDate: date });
		appDispatch({ type: 'getTodayCount' });
		appDispatch({ type: 'getCompareCount' });
	};

	useEffect(() => {
		// if (appState.isTurtle) {
		// 	props.history.push('/detect');
		// }
	}, []);

	const compareUI = () => {
		let abs = 1;
		let more = '';
		let imo = '';

		if (appState.compareCount === 0) {
			return (
				<span className="content-circle__group content-circle__group--left">
					<p className="content-circle__title">비교 데이터가</p>
					<p className="content-circle__title">쌓이지 않았어요 🐢</p>
				</span>
			);
		} else if (appState.compareCount < 0) {
			abs = -1;
			more = '덜';
			imo = '🎉';
		} else {
			more = '더';
			imo = '😢';
		}
		return (
			<span className="content-circle__group content-circle__group--left">
				<p className="content-circle__title">어제보다</p>
				<p className="content-circle__content" style={{ fontSize: '45px' }}>
					{appState.compareCount * abs}회
				</p>
				<p className="content-circle__title">
					{more} 감지되었어요 {imo}
				</p>
			</span>
		);
	};

	const getDateTitle = () => {
		let month = appState.todayDate.getMonth() + 1;
		let day = appState.todayDate.getDate().toString();
		return `${month}월 ${day}일`;
	};

	return (
		<div className="DashBoard">
			<div className="pc__table--left">
				<span className="header">
					<span className="date-group">
						<p className="header__title">{getDateTitle()}</p>
						<img
							className="header__calendar"
							src={calendar}
							onClick={() => appDispatch({ type: 'openModal' })}
						/>
					</span>
					<p className="header__subtitle">
						터틀과 함께 거북목에서 벗어나볼까요?{' '}
					</p>
					<p
						className="header__subtitle"
						style={{ textDecorationLine: 'underline' }}
						onClick={() => props.history.push('/stretching')}
					>
						스트레칭 하러 가기 🧘‍♀️
					</p>

					{!appState.isModalClose && (
						<TurtleCalendar value={date} onChange={onChange} />
					)}
				</span>
				<img className="turtle-img" src={turtleImg} />
				<div className="bottom">
					<p className="main-content">거북목 감지 NN회</p>
					<p className="sub-content">전 날보다 NN회 많이 감지 되었어요.</p>
				</div>
			</div>
			<div className="pc__table--right">
				<div className="content-circle__container">
					{compareUI()}

					<span className="content-circle__group content-circle__group--right">
						<p className="content-circle__title">거북목 감지</p>
						<p className="content-circle__content">{appState.todayCount}회</p>
					</span>

					<span className="content-circle__group content-circle__group--bottom"></span>
				</div>
			</div>
		</div>
	);
};

export default withRouter(DashBoard);
