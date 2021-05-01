import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPendingMaintenance } from '../../actions/maintenance';

const AddPendingMaintenance = ({ addPendingMaintenance, history, handleChild, renderForm, item }) => {

    const [formData, setFormData] = useState({
        maintenanceType: item,
        date: '',
        notes: ''
    });

    const { maintenanceType, date, notes } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [state, setState] = React.useState("");
    React.useEffect(() => {
        handleChild(state);
    }, [state]);


    return (
        <Fragment>
            <form className="maintenance-item-form" onSubmit={e => {
                e.preventDefault();
                addPendingMaintenance(formData, history);
                renderForm(e);
                }}>
                <label htmlFor="date" className="date-label">Date to be completed</label>
                <input type="date" name="date" className="date-input" value={date} onChange={e => onChange(e)} />
                <label htmlFor="notes" className="notes-label">Notes</label>
                <textarea rows="3" name="notes" className="input-notes" value={notes} onChange={e => onChange(e)} />
                <input type="submit" value="Schedule Task" className="submit-button" />
                <input type="button" value="Cancel" className="cancel-button" onClick={e => renderForm(e)} />
            </form>
        </Fragment>
    )
}


export default connect(null, { addPendingMaintenance })(AddPendingMaintenance);