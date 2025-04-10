import videoHome from '../../assets/video/video-homepage.mp4';
const HomePage = (props) => {
  return (
    <div className="homepage-container">
     <video autoPlay loop muted className="video-homepage">
      <source src={videoHome} type="video/mp4"/>
     </video>
     <div className='homepage-content'>
        <div className='fs-1'>Lorem ipsum dolor sit amet.</div>
        <div className='fs-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ipsa ipsum repudiandae commodi consequuntur aspernatur quae voluptate nam impedit. Dolor iure ut quaerat voluptatum consequatur quas sint aut perspiciatis dolorem?</div>
        <div>
          <button className='btn btn-dark'>Get's started. It's free</button>
        </div>
     </div>
    </div>
  );
}
export default HomePage;