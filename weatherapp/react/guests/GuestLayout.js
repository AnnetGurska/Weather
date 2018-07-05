import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import {bindActionCreators} from 'redux';
import {makeRequest, dispatchAction, displayMessage}  from 'actions';
import Header from 'common/Header';
 import MainPage from 'guests/MainPage';
 import NotFoundPage from 'common/NotFoundPage';
import 'react-datetime/css/react-datetime.css';
class GuestLayout  extends Component {

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {
        if ( this.props.match.url == '/'){
            this.props.history.push('/weather_data');

        }
    }

    render() {
             return (
                <div className="guest-layout">
                         <div className="container">
                            <Switch>
                                <Route path="/weather_data" component={MainPage} />
                                 <Route component={NotFoundPage}/>
                            </Switch>
                        </div>
                 </div>
            );
     }
}

function mapStateToProps(state, ownProps) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({makeRequest, dispatchAction, displayMessage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLayout);