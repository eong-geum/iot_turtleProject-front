/* eslint-disable */

import React, { useEffect, useContext , useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Calendar from 'react-calendar';


import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

import TurtleModal from '../../common/component/TurtleModal'

import 'react-calendar/dist/Calendar.css';

const TurtleCalendar = (props) => {
	
	return (
		<div>
		<TurtleModal>
		  <Calendar
        onChange={(e) => props.onChange(e)}
        value={props.date}
      />
		</TurtleModal>
		</div>
	);
};

export default withRouter(TurtleCalendar);
