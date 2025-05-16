import Footer from '../components/Footer/Footer';
import Intro from '../components/Home';
import Events from '../components/Signup';
import ClientTraining from '../components/Resources';
import LearningActivities from '../components/Services';


const Home = () => {
    return (
        <>
            <Intro />
            <Events />
            <LearningActivities />
            <ClientTraining />
            <Footer />
        </>

    )
}

export default Home;

