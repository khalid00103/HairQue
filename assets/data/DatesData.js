import moment from "moment";
const startDate = moment().format('D');
const startDay = moment().format('ddd');
const DatesData =[
    {
        id:1,
        date : startDate,
        day : startDay,
        month: moment().format('MMMM'),
    },
    {
        id:2,
        date : moment().add(1, 'days').format('D'),
        day : moment().add(1, 'days').format('ddd'),
        month:moment().add(1,'days').format('MMMM'),
    },
    {
        id:3,
        date : moment().add(2, 'days').format('D'),
        day : moment().add(2, 'days').format('ddd'),
        month:moment().add(2,'days').format('MMMM'),
    },
    {
        id:4,
        date : moment().add(3, 'days').format('D'),
        day : moment().add(3, 'days').format('ddd'),
        month:moment().add(3,'days').format('MMMM'),
    },
    {
        id:5,
        date : moment().add(4, 'days').format('D'),
        day : moment().add(4, 'days').format('ddd'),
        month:moment().add(4,'days').format('MMMM'),
    },
    {
        id:6,
        date : moment().add(5, 'days').format('D'),
        day : moment().add(5, 'days').format('ddd'),
        month:moment().add(5,'days').format('MMMM'),
    },
    {
        id:7,
        date : moment().add(6, 'days').format('D'),
        day : moment().add(6, 'days').format('ddd'),
        month:moment().add(6,'days').format('MMMM'),
    },
    
];
export default DatesData;