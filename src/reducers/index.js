import { combineReducers } from "redux";

import photographers from './photographers';
import packages from './packages';
import calendars from './calendar';
import portfolios from './portfolios';
import bookings from './booking'
import users from './users'
import auth from './auth'

export default combineReducers({
    photographers,
    packages,
    calendars,
    portfolios,
    bookings,
    auth,
    users,
});