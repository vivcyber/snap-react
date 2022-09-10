
import './App.scss';
import Webcam from 'react-webcam';
import React,{useRef,useState} from 'react';
import axios from 'axios';

function App() {
  const webRef = useRef();
  const [screenShotImg,setScreenShotImg] = useState('');
  
  const screenShot=()=>{
    // console.log(webRef.current.getScreenshot())
    setScreenShotImg(webRef.current.getScreenshot())
   
  }

  const sentScreenShot=()=>{
    axios
    .get(`http://localhost:3001/save/?screenShotImg=${screenShotImg}`, {
      
      screenShotImg: screenShotImg,
    })
    .then((res) => {
      console.log(res.data);
    });
  

  }

  return (
    <div className='container'>
    <div className='box'>
       <h1>ScreenShot Project</h1>
       <div className="main">
         <div className='left'>
          <div className='preview'>
            <Webcam ref={webRef}/>
            {/* <img src='./screenshot_01.png'/> */}
          </div>
          <input/>
          <button>顯示文字</button>
          <button onClick={()=>{
            screenShot()
          }}>定格</button>
          <button onClick={()=>{
            sentScreenShot()
          }}
          >截圖</button>
         </div>
         <div className='right'>
          <div className="pics">
          {screenShotImg}
            <img src={screenShotImg}/>
            <img src='./screenshot_01.png'/>
            <img src='./screenshot_01.png'/>
            <img src='./screenshot_01.png'/>
          </div>
         </div>
       </div>
    </div>

    </div>
  );
}

export default App;
