import moment from 'moment';

const formatDate = (date) => {
	date = date.split(' ');
	date[0] = moment(new Date(date[0])).format('DD-MMM-YY');
	date[1] = date[1].split(':');
	date[1].pop();
	date[1] = date[1].join(':');
	return date.join(' ');
};

export default formatDate;
