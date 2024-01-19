import "./styles.css"
import { useState, useEffect  } from 'react'
export default function App() {
 
  const [labelText, setLabelText] = useState("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };


    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  //confrim button
  const [confirmButton, setConfirmButton] = useState([
    {id:1, class:'optionButton' ,text:"Confirm", opacity:'0',left:windowSize.width > 1440 ?'45%':'40%',  isDisabled: true},
  ])
  //cancel button
  const [cancelButton, setCancelButton] = useState([
    {id:1, class:'optionButton' ,text:"Cancel", opacity:'0',left:windowSize.width > 1440 ?'55%':'60%',  isDisabled: true},
  ])
  //rps button
  const [buttons,  setButtons] = useState([
    {id: 1, class:"rock", image:"./img/rock.png", leftValue: windowSize.width > 1440 ?'30%':'17%',name:"Rock", isDisabled: false},
    {id: 2, class:"paper", image:"./img/paper.png",leftValue: '50%',name:"Paper", isDisabled: 'false'},
    {id: 3, class:"scissor", image:"./img/scissor.png",leftValue: windowSize.width > 1440 ?'70%':'83%',name:"Scissor", isDisabled: false}
  ])
  //battle imgs
  const [battleImage, setBattleImage] = useState([
    {id:1, img:'./img/blank.png', left:'-100vw'}
  ]);
  const [battleImageOpp, setBattleImageOpp] = useState([
    {id:1, img:'./img/blank.png', left:'200vw'}
  ]);
  //window scaling
  useEffect(() => {
    

    const updateButton = buttons.map(button => {
      if(button.id === 1 && button.leftValue !='50%'){
        return {...button,leftValue:  windowSize.width > 1440 ?'30%':'17%'};
      }else if(button.id === 3&&button.leftValue!='50%'){
        return {...button,leftValue: windowSize.width > 1440 ?'70%':'83%'};
      }else{
        return {...button};
      }
    });
    setButtons(updateButton)
    const updateConfrimButton = confirmButton.map(confirm =>{
      return {...confirm,left:windowSize.width > 1440 ?'45%':'40%'}
    });
    const updateCancelButton = cancelButton.map(cancel =>{
      return {...cancel,left:windowSize.width > 1440 ?'55%':'60%'}
    });
    
    setConfirmButton(updateConfrimButton);
    setCancelButton(updateCancelButton);
  
  }, [windowSize]);
  //rps button handle
  const handleButtonClick = (buttonId) =>{
    const updateButton = buttons.map(button => {
      if(button.id === buttonId){
        setLabelText("Current Selected: "+button.name);
        return {...button,zIndex:2, leftValue: '50%'};
      }else{
        return {...button,zIndex:1,leftValue: '50%'};
      }
    });
    setButtons(updateButton)
    const updateConfrimButton = confirmButton.map(confirm =>{
      return {...confirm, opacity:'100%', left:windowSize.width > 1440 ?'45%':'40%', isDisabled:false}
    });
    const updateCancelButton = cancelButton.map(cancel =>{
      return {...cancel, opacity:'100%',left:windowSize.width > 1440 ?'55%':'60%', isDisabled:false}
    });
    
    setConfirmButton(updateConfrimButton);
    setCancelButton(updateCancelButton);
  }
  //confirm buttom handle
  const handleConfirm = () =>{
  
    const updateConfrimButton = confirmButton.map(confirm =>{
      return {...confirm, opacity:'0%'}
    });
    const updateCancelButton = cancelButton.map(cancel =>{
      return {...cancel, opacity:'0%'}
    });
    setConfirmButton(updateConfrimButton);
    setCancelButton(updateCancelButton);
    const updateButton = buttons.map(button => {
     return{...button, leftValue:"-100vw"}
    });
    setButtons(updateButton)
    
    rpsAnimation();
    setTimeout(() => {
      rpsAnimation2();
    }, 500);
    setTimeout(() => {
      rpsAnimation();
      console.log('hi');
    }, 1000);
    setTimeout(() => {
      rpsAnimation2();
    }, 1500);
    setTimeout(() => {
      rpsAnimation();
      console.log('hi');
    }, 2000);
    setTimeout(() => {
      rpsAnimation2();
    }, 2500);
    
    setTimeout(() => {
      rpsAnimation3();
      console.log('hi');
    }, 3000);
    setTimeout(() => {
      rpsAnimation3();
      const updateCancelButton = cancelButton.map(cancel =>{
        return {...cancel, opacity:'100%',isDisabled: false, text:'Play Again', left:'50%',top: '30%'}
      });
      setCancelButton(updateCancelButton);
    }, 3250);
    
  }

  function rpsAnimation(){
    const updateImage = battleImage.map(image =>{
      return{...image, img: "./img/rock.png", left:windowSize.width > 1440 ?'30%':'10%',  length: '40vmin'}
    })
    const updateImageOpp = battleImageOpp.map(image =>{
      return{...image, img: "./img/Orock.png", left:'50%',  length: '40min'}
    })
    setBattleImageOpp(updateImageOpp);
    setBattleImage(updateImage);
    
   
  }
  function rpsAnimation2(){
    const updateImage = battleImage.map(image =>{
      return{...image, img: "./img/rock.png", left:'-100vw',length: '40vmin'}
    })
    const updateImageOpp = battleImageOpp.map(image =>{
      return{...image, img: "./img/Orock.png", left:'200vw',  length: '40vmin'}
    })
    setBattleImageOpp(updateImageOpp);
    setBattleImage(updateImage);
  }
  function rpsAnimation3(){
    const updateImage = battleImage.map(image =>{
      if(labelText === 'Current Selected: Rock'){
        return {...image, img:"./img/rock.png", left:windowSize.width > 1440 ?'30%':'10%',length: '40vmin'};
      }else if(labelText === 'Current Selected: Paper'){
        return {...image, img:"./img/paper.png",left:windowSize.width > 1440 ?'30%':'10%',length: '40vmin'};
      }else if(labelText === 'Current Selected: Scissor'){
        return {...image, img:"./img/scissor.png",left:windowSize.width > 1440 ?'30%':'10%',length: '40vmin'};
  }})
  let randomHand = (Math.floor(Math.random()*3))+1;
  const updateImageOpp = battleImageOpp.map(image =>{
    if(randomHand == 1){
      return {...image, img:"./img/Orock.png", left:'50%',length: '40vmin'};
    }else if(randomHand == 2){
      return {...image, img:"./img/Opaper.png", left:'50%',length: '40vmin'};
    }else if(randomHand == 3){
      return {...image, img:"./img/Oscissor.png", left:'50%',length: '40vmin'};
}})
  setBattleImageOpp(updateImageOpp);
  setBattleImage(updateImage);
  
  }
  //cancel button handle
  const handleCancel = () =>{
    const updateConfrimButton = confirmButton.map(confirm =>{
      return {...confirm, opacity:'0%', isDisabled:true}
    });
    const updateCancelButton = cancelButton.map(cancel =>{
      return {...cancel, opacity:'0%',isDisabled: true , text:'Cancel',  top:'85%', left:windowSize.width > 1440 ?'55%':'60%',}
    });

    const updateButton = buttons.map(button => {
      if(button.id === 1 ){
        return {...button,leftValue:  windowSize.width > 1440 ?'30%':'17%'};
      }else if(button.id === 3){
        return {...button,leftValue: windowSize.width > 1440 ?'70%':'83%'};
      }else{
        return {...button, leftValue: '50%'};
      }
    });
    setButtons(updateButton)
    rpsAnimation2()
    
    setConfirmButton(updateConfrimButton);
    setCancelButton(updateCancelButton);
    setLabelText("Current Selected: ");
  }
  
  {labelText ==="" &&setLabelText("Current Selected: ")}
  return (
    <>
      <h1>ROCK! PAPER! SCISSORS!</h1>
      <div className="buttonRow">
        {buttons.map(button =>(
          <button key={button.id} style={{zIndex: button.zIndex || 1, left:button.leftValue }}className={button.class}  onClick={()=>handleButtonClick(button.id) }>
            <img src={button.image}></img>
          </button>
        ))}
      </div>
      {confirmButton.map(confirm =>(
        <button disabled={confirm.isDisabled} key={confirm.id} style={{opacity:confirm.opacity, left:confirm.left}} className={confirm.class} onClick={()=>handleConfirm()}>
          {confirm.text}
        </button>
      ))}
      {cancelButton.map(cancel =>(
        <button disabled={cancel.isDisabled}key={cancel.id} style={{opacity:cancel.opacity, left:cancel.left, top:cancel.top || '85%'}} className={cancel.class} onClick={()=>handleCancel()}>
          {cancel.text}
        </button>
      ))}
      {battleImage.map(image =>(
        <img key={image.id}className='selectedHand' src={image.img} style={{left:image.left,width: image.length || '20vmin', height: image.length || '20vmin'}}></img>
      ))}
       {battleImageOpp.map(image =>(
        <img key={image.id}className='selectedHand' src={image.img} style={{left:image.left,width: image.length || '20vmin', height: image.length || '20vmin'}}></img>
      ))}
      <p className="label">{labelText}</p>
      
    </>
  )
}