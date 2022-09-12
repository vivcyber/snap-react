
import './App.scss';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [screenShotImgData, setScreenShotImgData] = useState('');

  const [hasPhoto, setHasPhoto] = useState(false);
  const [text, setText] = useState();
  const [showtext,setShowText]=useState();

  const [imgsData,setImgsData]=useState([]);
  const [snapDep,setSnapDep]=useState(0);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 200, height: 144 }
    })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
  }

  const takePhoto = () => {
    const width = 200;
    const height = 144;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';
    ctx.font = 'bold 48px Helvatica';
    ctx.fillText(text, 12, 120);
    setHasPhoto(true);
  }

  useEffect(() => {
    getVideo();
  }, [videoRef, text])

  function handleDataUrl() {
    console.log(photoRef.current.toDataURL('image/png'))
    let link = document.createElement('a');

    link.download = 'yoursnap.png';
    link.href = photoRef.current.toDataURL('image/png');
    setScreenShotImgData(photoRef.current.toDataURL('image/png'))
    link.click();
    axios.post('http://localhost:3001/upload', {

      imgData: photoRef.current.toDataURL('image/png'),
    });
    setSnapDep(snapDep+1)
  }

  useEffect(()=>{
    axios.get('http://localhost:3001/view').then((response)=>{
      console.log(response)
      setImgsData(response.data)

    })
  },[snapDep])

  return (
    <div className='container'>
      <div className='box'>
        <h1>ScreenShot Project</h1>
        <div className="main">
          <div className='left'>
            <div className='preview'>
              <h3 className='snaptxt'>{showtext}</h3>
              <video ref={videoRef}></video>

            </div>

            
            <input onChange={(e) => setText(e.target.value)} />
              <button onClick={(e) => setShowText(text)}>顯示文字</button>
              <button onClick={takePhoto}>snap</button>

            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
              <canvas ref={photoRef}></canvas>
             
              
            </div>
            <button onClick={handleDataUrl} >save</button>
          </div>
          <div className='right'>
            <div className="pics">
            {imgsData.map((val,key)=>{
              return <div>
                {key.id}
                <img
                  src={`http://localhost:3001/${val.screenShotImg}`}
                 
                />
              </div>
            })}
            
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
