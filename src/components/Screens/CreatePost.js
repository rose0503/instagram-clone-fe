import React from 'react'

const CreatePost = () => {
    return(
        <div className="card input-field" style={{
            margin:"30px auto",
            maxWidth: "600px",
            padding:"20px", 
            textAlign:"center"
        }}>
            <input type="text" placeholder="Tiêu đề" />
            <input type="text" placeholder= "Nội dung" />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Chọn ảnh"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1">
                    Đăng bài 
            </button>
        </div>
    )
}

export default CreatePost;