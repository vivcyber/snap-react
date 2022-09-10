
import './App.scss';
import React,{useRef,useState,useEffect} from 'react';
import axios from 'axios';

function App() {

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [screenShotImgData,setScreenShotImgData] = useState('');

  const[hasPhoto,setHasPhoto]=useState(false);
  const[text,setText]=useState();

  const getVideo = () =>{
    navigator.mediaDevices.getUserMedia({
      video:{ width:480,height:320}
    })
    .then(stream =>{
       let video = videoRef.current;
       video.srcObject = stream;
       video.play();
    })
  }

  const takePhoto=()=>{
    const width = 480;
    const height = 320;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video,0,0,width,height);
    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';
    ctx.font = 'bold 144px Helvatica';
    ctx.fillText(text, 12, 300);
    setHasPhoto(true);
  }

  useEffect(()=>{
    getVideo();
  },[videoRef,text])

  function handleDataUrl() {
    console.log(photoRef.current.toDataURL('image/png'))
    let link = document.createElement('a');
    
    link.download = 'yoursnap.png';
    link.href = photoRef.current.toDataURL('image/png');
    setScreenShotImgData(photoRef.current.toDataURL('image/png'))
    link.click();
    

    axios.get(`http://localhost:3001/save/?screenShotImg=${screenShotImgData}`, {
     
      imgData: screenShotImgData,
      
    });
    
    // setIsClick(true);
  }


 

  

  return (
    <div className='container'>
    <div className='box'>
       <h1>ScreenShot Project</h1>
       <div className="main">
         <div className='left'>
          <div className='preview'>
          <video ref={videoRef}></video>
           
          </div>
         
          <button onClick={takePhoto}>snap</button>
         
          <div className={'result'+(hasPhoto ? 'hasPhoto':'')}>
            <canvas ref={photoRef}></canvas>
            {screenShotImgData}
            <input onChange={(e) => setText(e.target.value)}/>
             <button>顯示文字</button>
          </div>
          <button onClick={handleDataUrl} >save</button>
         </div>
         <div className='right'>
          <div className="pics">
         
            {/* <img src={screenShotImg}/> */}
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
