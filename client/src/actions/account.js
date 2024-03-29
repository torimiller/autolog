import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_ACCOUNT,
    UPDATE_ACCOUNT,
    ACCOUNT_ERROR
} from './types';


// Get Pending Maintenance
export const getPendingMaintenance = () => async dispatch => {
    try {
        const res = await axios.get('/api/account/pendingmaintenance')

        dispatch({
            type: GET_ACCOUNT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


export const addPendingMaintenance = (formData, id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/account/pendingmaintenance', formData, config);

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: res.data
        });

        dispatch(setAlert('Pending Maintenance Added', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Delete Pending Maintenance
export const deletePendingMaintenance = id => async dispatch => {
    if(window.confirm('Are you sure you want to delete this maintenance item?')) {
        try {
            const res = await axios.delete(`/api/account/pendingmaintenance/${id}`);
    
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data
            })
    
        } catch (err) {
            dispatch({
                type: ACCOUNT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            }); 
        }
    }
};

// Delete Pending Maintenance when adding to Completed Maintenance
export const deletePendingMaintenanceForCompleted = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/account/pendingmaintenance/${id}`);

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
};


// Get Completed Maintenance
export const getCompletedMaintenance = () => async dispatch => {
    try {
        const res = await axios.get('/api/account/completedmaintenance')

        dispatch({
            type: GET_ACCOUNT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Add Completed Maintenance  THIS SHOULDN'T TAKE IN FORM DATA
export const addCompletedMaintenance = (formData, history) => async dispatch => {
    try {      
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/account/completedmaintenance', formData, config);

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: res.data
        });

        dispatch(setAlert('Completed Maintenance Added', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Delete Completed Maintenance
export const deleteCompletedMaintenance = id => async dispatch => {
    if(window.confirm('Are you sure you want to delete this maintenance item?')) {
        try {
            const res = await axios.delete(`/api/account/completedmaintenance/${id}`);
    
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data
            })
    
        } catch (err) {
            dispatch({
                type: ACCOUNT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            }); 
        }
    }
};