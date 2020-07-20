import React from 'react'

const Profile = () => {
    return(
        <div style={{maxWidth:"600px", margin: "0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent:"space-around",
                margin: "18px 0px", 
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{width: "160px", height:"160px",borderRadius:"80px"}}
                        src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>Quốc Việt</h4>
                    <div style={{display:"flex", justifyContent: "space-between",width: "110%"}}>
                        <h6>20 post</h6>
                        <h6>20 follower</h6>
                        <h6>20 following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img  className='item' src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img  className='item' src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img className='item'  src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img  className='item' src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img  className='item' src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                <img  className='item' src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
            </div>
        
        </div>
        )
}

export default Profile;