import React, {Component} from 'react';

import {RouteTransition} from 'react-router-transition';
var NotificationSystem = require('react-notification-system');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import notificationStyles from 'theme/notificationStyles';
import {updateAppData,dispatchAction} from 'actions';
import Footer from 'common/Footer';

 import GuestLayout from 'guests/GuestLayout';
import NotFoundPageLayout from 'common/NotFoundPageLayout';

/* Admin */
  import { Route, Switch } from 'react-router';


/* Client */
 class AppLayout extends Component {
    componentDidMount() {
        if (!this.props.appDataReducer.notification) {
            this.props.updateAppData({'notification': this.notificationSystem});
        }
    }

    render() {
         return (
            <div className="reactPageContainer" >
                <div className="wrapper">
                    <NotificationSystem style={notificationStyles} ref={(el) => {
                        this.notificationSystem = el;
                    }}/>

                            <Switch>
                                 <Route path="/"  component={GuestLayout} />
                            <Route component={NotFoundPageLayout}/>
                        </Switch>

                    {/*</RouteTransition>*/}
                </div>
                <Footer/>
            </div>
        );
    }
}
function mapStateToProps(state, props) {
    return {
         appDataReducer: state.appDataReducer,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateAppData,dispatchAction}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);