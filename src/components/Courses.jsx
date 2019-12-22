import React, { Component } from 'react';
import ArticleCard from 'gatsby-theme-carbon/src/components/ArticleCard'
import { Row, Column } from 'gatsby-theme-carbon/src/components/Grid'
import Moment from 'react-moment'


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
    const calendarStrings = {
      lastDay : '[Yesterday at] LT',
      sameDay : '[Today at] LT',
      nextDay : '[Tomorrow at] LT',
      lastWeek : '[last] dddd [at] LT',
      nextWeek : 'dddd [at] LT',
      sameElse : 'LLLL'
  };
    let courseListContent = this.state.courses.map(course => {
      console.table(course)
      return (
        <Column colMd={6} colLg={6} key={course.id}>
          <ArticleCard
            subTitle='Micro Session'
            title={course.title}
            author={`Host: ${course.owner.firstName} ${course.owner.lastName}`}
            date={<Moment date={course.startDate} calendar={calendarStrings} />}
            readTime={`${course.events.length} instructor led session${course.events.length !== 1 ? 's' : ''}`}
          >
            <img 
            alt='Card cover'
            style={{ width: 'auto', minHeight: '50%', objectFit: 'cover'}}
            src={course.coverImage} 
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