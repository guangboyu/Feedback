import _ from 'lodash';
import React from 'react'
import {reduxForm, Field} from 'redux-form';
import { Link } from 'react-router-dom';
import formFields from './formFields'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends React.Component {
  renderFields() {
      return _.map(formFields, ({ label, name }) => {
        return <Field
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
              />
      })
  }

  render () {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white_text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  _.map(formFields, ({name}) => {
    if (!values[name]) {
      errors[name] = 'required!';
    }
  })
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
