import React, { Component } from 'react';
import ArticleCard from 'gatsby-theme-carbon/src/components/ArticleCard'
import { Row, Column } from 'gatsby-theme-carbon/src/components/Grid'


import axios from 'axios'
class Courses extends Component {
  state = {
    loading: true,
    courses: []
  }
  async componentDidMount() {
    let response = await axios.get('https://this-is-code-staging.herokuapp.com/courses')
    this.setState({ courses: response.data.courses, loading: false })
  }


  render() {
    let courseListContent = this.state.courses.map(course => {
      return (
        <Column colMd={6} colLg={6} key={course.id}>
          <ArticleCard
            subTitle='Micro Session'
            title={course.title}
            author={`Host: ${course.owner.firstName} ${course.owner.lastName}`}
            date={course.startDate}
            readTime={`${course.events.length} instructor led session${course.events.length != 1 ? 's' : ''}`}
          >
            <img 
            style={{ width: '100%', maxHeight: '230px', objectFit: 'cover'}}
            src={`https://source.unsplash.com/collection/8807226/${course.id}600X300`} 
            />
          </ArticleCard>
        </Column>

      )
    })
    return (
      <>
        {this.state.loading ?
          <h2>Loading</h2> :
          <Row>
            {courseListContent}
          </Row>
        }
      </>
    );
  }
}

export default Courses;