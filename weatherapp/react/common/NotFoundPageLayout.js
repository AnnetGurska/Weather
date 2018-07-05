
import React, { Component  } from 'react';
import Header from 'common/Header';
import NotFoundPage from 'common/NotFoundPage';




export default class NotFoundPageLayout extends Component {


    render() {
        return (
        <div className="not-found-page">
            <Header {...this.props } ></Header>
            <div className="container">
                <NotFoundPage/>
            </div>
        </div>
        );
    }
}


