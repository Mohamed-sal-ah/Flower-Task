import Head from 'next/head'
// Import Head

const Layout = (props) => {
    return (
        <div>
            <Head>
                {/* // Make changes to head and imported css file*/}
                <title>Flowers App</title>
                <link alt='Spring icon icon by Icons8' rel='icon' href='icons8-spring-48.png' />
                <link rel='stylesheet' href='css/style.css' />
            </Head>
            {/** Page components under Layout renders in child of div*/}
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout