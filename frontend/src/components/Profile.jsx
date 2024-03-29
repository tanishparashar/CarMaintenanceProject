import React, { useContext } from 'react'
import { CarContext } from './CarContext';

function Profile() {
  const {carCount} = useContext(CarContext);

  
  return (
    <div className='flex flex-wrap align-middle'>
    <div className="stats shadow">
  
  <div className="stat">
    
    <div className="stat-title">Total Cars</div>
    <div className="stat-value text-primary">{carCount}</div>
   
  </div>
  
  <div className="stat">
   
    <div className="stat-title">Reports Generated</div>
    <div className="stat-value text-secondary">1</div>
   
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src="/hero-img.jpg
          " />
        </div>
      </div>
    </div>
    
  </div>
  
</div>
</div>
)
}

export default Profile