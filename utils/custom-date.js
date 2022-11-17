import moment from 'moment';

const prepareDate = (date) => new Date((date + '.000Z').replace(' ', 'T'));

export const getTimeFromDate = (date) => prepareDate(date).getTime();

const formatDate = (date) => moment(prepareDate(date)).format('DD-MMM-YY HH:mm');

export default formatDate;
