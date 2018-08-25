import React from 'react';


const Videobox = ({ videofile }) => (
    <video 
    loop 
    autoPlay 
    preload='true' 
    style={{
        minWidth: 100,
        width: 'auto',
        height: 'auto',
    }}
    >
        <source src={videofile} />
    </video>
  )
  
export default Videobox