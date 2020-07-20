import React from 'react'

const  Home = () => {
    return(
        <div className="home">
            <div className='card home-card'>
                <div style={{padding:" 15px", fontSize:"18px", fontWeight: "500"}}>
                    <span>Quốc Việt</span>
                </div>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1562651139-65ae77130306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>                    
                </div>
                <div className="card-content">
                    <div className="icon">
                        <i className="material-icons icon-item" style={{color:"red"}}>favorite</i>
                        <i className="material-icons icon-item">comment</i>
                        <i className="material-icons icon-item">near_me</i>
                    </div>
                    <div className="title-post">
                        <span>Quốc việt</span>
                        <span> Cảnh đẹp tuyệt vời!!</span>    
                    </div>
                    <input type="text" placeholder="Thêm bình luận"/>
                </div>
            </div>
            <div className='card home-card'>
                <div style={{padding:" 15px", fontSize:"18px", fontWeight: "500"}}>
                    <span>Quốc Việt</span>
                </div>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1562651139-65ae77130306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>                    
                </div>
                <div className="card-content">
                    <div className="icon">
                        <i className="material-icons icon-item" style={{color:"red"}}>favorite</i>
                        <i className="material-icons icon-item">comment</i>
                        <i className="material-icons icon-item">near_me</i>
                    </div>
                    <div className="title-post">
                        <span>Quốc việt</span>
                        <span> Cảnh đẹp tuyệt vời!!</span>    
                    </div>
                    <input type="text" placeholder="Thêm bình luận"/>
                </div>
            </div>
            <div className='card home-card'>
                <div style={{padding:" 15px", fontSize:"18px", fontWeight: "500"}}>
                    <span>Quốc Việt</span>
                </div>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1562651139-65ae77130306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>                    
                </div>
                <div className="card-content">
                    <div className="icon">
                        <i className="material-icons icon-item" style={{color:"red"}}>favorite</i>
                        <i className="material-icons icon-item">comment</i>
                        <i className="material-icons icon-item">near_me</i>
                    </div>
                    <div className="title-post">
                        <span>Quốc việt</span>
                        <span> Cảnh đẹp tuyệt vời!!</span>    
                    </div>
                    <input type="text" placeholder="Thêm bình luận"/>
                </div>
            </div>

            
        </div>
    )
}

export default Home;