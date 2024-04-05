import React from 'react'

function Settings() {
  
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col  align-middle ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Welcome</h1>
      <p className="py-6">Update your credentials here</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" required />
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Confirm changes</button>
        </div>
      </form>
    </div>
  </div>
</div>
    
  )
  
}

export default Settings