import React from 'react';

import './styles/BadgeNew.css';
import header from '../images/platziconf-logo.svg';
import PageLoading from '../components/PageLoading';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import api from '../api'

class BadgeNew extends React.Component {
  state={
    loading:false,
    error: null,
    form:{
      firstName:'',
      lastName:'',
      email:'',
      jobTitle:'',
      twitter:'',
  }};

  handleChange = e =>{
    // const nextForm= this.state.form;  //<----Esta es otra manera de hacer form:{...this.state...}
    // nextForm[e.target.name] = e.target.value;
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      } 
    });
  };

  handleSubmit = async e =>{
    e.preventDefault()
    this.setState({loading: true, error:null})

    try {
      await api.badges.create(this.state.form)
      this.setState({loading:false });

      this.props.history.push('./')
    } catch (error) {
      this.setState({loading:false, error: error})
    }
  }


  render(){
    if(this.state.loading){
      return <PageLoading / >
    }

    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="BadgeNew__hero-image img-fluid" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'FIRSTNAME'}
                lastName={this.state.form.lastName || 'LASTNAME'}
                jobTitle={this.state.form.jobTitle || 'JOBTITLE'}
                twitter={this.state.form.twitter || 'TWITTER'}
                email={this.state.form.email || 'EMAIL'}
                avatarUrl = "https://avatars0.githubusercontent.com/u/50759695?s=460&u=bb743cc30a8ff5e90344b55518ce141c963d5c3a&v=4"
              />
            </div>

            <div className="col-6">
              <h1>New Attendant</h1>
              <BadgeForm
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              formValues={this.state.form}
              error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;
