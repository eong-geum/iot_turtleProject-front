// import titleImg from '../../assets/loadingTitle.png';
import React, { Children, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../scss/turtleModal.scss';

const TurtleModal = (props) => {
	return (
		<div className="turtleModal">
			<div className="modalBackground">
				<div className="modalInner">{props.children}</div>
			</div>
		</div>
	);
};

export default TurtleModal;
