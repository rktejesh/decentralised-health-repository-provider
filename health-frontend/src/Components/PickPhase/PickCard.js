import React from 'react'
import { useNavigate } from 'react-router-dom'

function PickCard({cardData}) {
  const navigate = useNavigate();

  const myStyle={
    backgroundImage:`url(${cardData.img})`,
    backgroundSize : "cover"
  };
  const redirecttologin = () => {
    const re = cardData.url ;
    navigate(re) ;
  }
  return (
    <>
    <div className='pick-align'>
      <div className='PickCard-main' style={myStyle} onClick={redirecttologin}>
      </div>
      <div><p >{cardData.name}</p></div>
    </div>
    </>
  )
}

export default PickCard
