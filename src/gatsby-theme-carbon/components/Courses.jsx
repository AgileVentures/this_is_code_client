import React, { Component } from 'react';
import ArticleCard from 'gatsby-theme-carbon/src/components/ArticleCard'
import { Grid, Row, Column } from 'gatsby-theme-carbon/src/components/Grid'


import axios from 'axios'
class Courses extends Component {
  state = {
    courses: []
  }
  async componentDidMount() {
    let response = await axios.get('https://this-is-code-staging.herokuapp.com/courses')
    this.setState({ courses: response.data.courses })
  }


  render() {
    let courseListContent = this.state.courses.map(course => {
      return (
        <Column colMd={4} colLg={4} >
          <ArticleCard
            key={course.id}
            title={course.title}
            subTitle={`${course.owner.firstName} ${course.owner.lastName}`}
            date={course.startDate}
            readTime={`${course.events.length} instructor led session${course.events.length != 1 ? 's' : ''}`}
          >
            <img src={`https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&&h=600&q=80`} />
          </ArticleCard>
        </Column>

      )
    })
    return (
      <Row>
        {courseListContent}
      </Row>
    );
  }
}

export default Courses;