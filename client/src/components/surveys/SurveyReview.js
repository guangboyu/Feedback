import React from 'react'
import formFields from './formFields';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class SurveyReview extends React.Component {

  reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {this.props.formValues[field.name]}
        </div>
      </div>
    )
  });

  render () {
    return(
      <div>
        <h5>please confirm your information</h5>
        <div>
          {this.reviewFields}
        </div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={this.props.onCancel}
        >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => this.props.submitSurvey(this.props.formValues, this.props.history)}
      >
        Send Survey
      </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {formValues: state.form.surveyForm.values}
}
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
