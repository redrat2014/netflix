import App from '../app';
import Search from '../components/Search';
import Details from '../components/Details';
import Video from '../components/VideoPlayerView';
import EpisodesPicker from '../components/EpisodesPicker';
import Genres from '../components/Genres';

const Routes = {
    Home: {screen: App},
    Details: {screen: Details},
    Search: {screen: Search},
    Video: {screen: Video},
    EpisodesPicker: {screen: EpisodesPicker},
    Genres: {screen: Genres},
}

export default Routes;