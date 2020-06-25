import Firebase, { FirebaseContext } from '../components/Firebase';
// Import Firebase and FirebaseContext
// Wrap firebase in app component
function App({ Component, pageProps }) {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default App