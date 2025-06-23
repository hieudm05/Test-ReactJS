import { useNavigate } from 'react-router-dom';
import videoHome from '../../assets/video/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
     <video autoPlay loop muted className="video-homepage">
      <source src={videoHome} type="video/mp4"/>
     </video>
     <div className='homepage-content'>
        <div className='fs-1'>
           {t('homepage.title1')}
        </div>
        <div className='fs-5'>{t('homepage.title2')}</div>
        <div>
          {
            isAuthenticated === false ?
            <button className='btn btn-dark' onClick={ () => navigate('/login')}>Get's started. It's free</button>
             :
             <button className='btn btn-dark' onClick={() => navigate('/users')}>{t('homepage.title3.login')}</button>
          }
        
        </div>
     </div>
    </div>
  );
}
export default HomePage;