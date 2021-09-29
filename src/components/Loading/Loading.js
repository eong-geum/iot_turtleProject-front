import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import '../../css/loading.css';
import titleImg from '../../assets/loadingTitle.png';

const Loading = (props) => {
	useEffect(() => {
		setTimeout(() => props.history.push('/home'), 3000);
	}, []);

	return (
		<div className="Loading">
			<img className="Loading__title" src={titleImg} />
			<div className="Loading__subject">
				터틀과 함께 거북목에서 벗어나볼까요?
			</div>
		</div>
	);
};

export default withRouter(Loading);
