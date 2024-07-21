import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import GameCarousel from '../games/GameCarousel';
import '../../assets/css/carousel.css';
import Navbar from '../Navbar';

function MainPage() {
  const dispatch = useDispatch();
  const { games } = useSelector((state) => state.games);
  const auth = useAuthUser();
  const header = useAuthHeader();

  return (
    <>
      <Navbar />
      <div className="main-page-container">
        <h1 className="main-title">Esport Gaming Center</h1>
        <GameCarousel games={games} />
      </div>
    </>
  );
}

export default MainPage;
