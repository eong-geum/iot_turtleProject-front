// import titleImg from '../../assets/loadingTitle.png';

import React, { useEffect, useContext , useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';

import '../../css/turtleModal.css';

const TurtleModal = (props) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	 const onCloseModal = (e) => {
        console.log('e.target: ', e.target)
        console.log('e.tarcurrentTargetget: ', e.currentTarget)
        if(e.target === e.currentTarget){
           appDispatch({type:'closeModal'})
        }
    }


	return (
		<div className="turtleModal" >
			<div className="modalBackground" onClick={(e)=>onCloseModal(e)}>
				<div className="modalInner">{props.children}</div>
			</div>
		</div>
	);
};

export default TurtleModal;
