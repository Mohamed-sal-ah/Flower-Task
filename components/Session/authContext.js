import Firebase from '../Firebase'
// Importing firebase class from firebase
const firebaseClass = new Firebase // Set class in firebaseClass

const authContext = (Component) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                status: 'LOADING',
                authUser: '',
                signIn: false
            }
        }
        componentDidMount() {
            // Fetching if user is signed in
            firebaseClass.onAuthUserListener(authUser => {
                if (authUser) {
                    // user signin
                    this.setState({
                        status: 'SIGNED_IN', authUser: authUser, signIn: true
                    });
                } else {
                    // user not signin
                    this.setState({
                        status: 'NOT_SIGNED_IN', signIn: false
                    });
                }
            });
        }
        componentWillUnmount() {
            // turn off database if component is unmounted
            firebaseClass.users().off()
        }
        renderContent() {
            const { status, authUser, signIn } = this.state;
            if (status == 'LOADING') {
                return;
            } else if (status == 'SIGNED_IN' || status == 'NOT_SIGNED_IN') {
                // renders in compontent
                return <Component {...this.props} authUser={authUser} signIn={signIn} />
            }
        }
        render() {
            // renders component
            return (
                <React.Fragment>
                    {this.renderContent()}
                </React.Fragment>
            );
        }
    }
}
export default authContext