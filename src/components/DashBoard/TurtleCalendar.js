/* eslint-disable */

import React, { useEffect, useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

import TurtleModal from '../../common/component/TurtleModal';

import 'react-calendar/dist/Calendar.css';

const TurtleCalendar = (props) => {
	function formatLeftZero(value) {
		if (value >= 10) {
			return value;
		}
		return `0${value}`;
	}
	function toStringByFormatting(source, delimiter = '-') {
		const year = source.getFullYear();
		const month = formatLeftZero(source.getMonth() + 1);
		const day = formatLeftZero(source.getDate());
		return [year, month, day].join(delimiter);
	}

	// const test = () => {
	// 	props.countList
	// };

	return (
		<div>
			<TurtleModal>
				<Calendar
					onChange={(e) => props.onChange(e)}
					value={props.date}
					tileContent={({ activeStartDate, date, view }) =>
						view === 'month' &&
						Object.keys(props.countList).map((e) =>
							e === toStringByFormatting(date) ? (
								<p
									style={{
										fontSize: '12px',
										paddingTop: '3px',
										border: 'solid',
										borderWidth: 0,
										borderRadius: '100%',
										width: '20px',
										height: '20px',
										textAlign: 'center',
										margin: 'auto',
										backgroundColor: '#7cd9c2',
									}}
								>
									{props.countList[toStringByFormatting(date)].count}
								</p>
							) : null,
						)
					}
				/>
			</TurtleModal>
		</div>
	);
};

export default withRouter(TurtleCalendar);
