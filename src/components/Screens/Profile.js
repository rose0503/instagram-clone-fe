import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {env} from "../server"

const Profile = () => {
    const [mypics, setPics] = useState([]);
    const {state, dispatch } = useContext(UserContext);
    const [image, setImage] = useState('');
    //const [url, setUrl] = useState('');
    useEffect(()=>{
        fetch(`${env.addressServer}/mypost`,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result.mypost);
            setPics(result.mypost)
        })
    }, [])

    useEffect(()=>{
        if(image){
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "instagram-clone");
            data.append("cloud_name", "no");
            fetch("	https://api.cloudinary.com/v1_1/quocviet0503/image/upload",{
                method:"post",
                body:data
            })
            .then(res => res.json())
            .then(data => {
                //setUrl(data.url)
                
                fetch(`${env.addressServer}/updatepic`,{
                    method:"put",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })

                }).then(res=>res.json())
                .then(result=>{
                    //console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}));
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[image])
    const updateAvt = (file) => {
        setImage(file)
        
    }
    return(
        <div style={{maxWidth:"600px", margin: "0px auto"}}>
            <div style={{padding: "18px 0px", 
                    borderBottom: "1px solid grey"}}>
                <div style={{
                    display: "flex",
                    justifyContent:"space-around"
                }}>
                    <div>
                        <img style={{width: "160px", height:"160px",borderRadius:"80px"}}
                            src={state? state.pic 
                                :
                                <div className="preloader-wrapper small active pre-load">
                                    <div className="spinner-layer spinner-green-only">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                             }
                        />
                    </div>
                    <div>
                        <h4>{state ? state.name: "loading..."}</h4>
                        <h5>{state ? state.email: "loading..."}</h5>
                        <div style={{display:"flex", justifyContent: "space-between",width: "110%"}}>
                            <h6><span style={{fontWeight: "650"}}>{mypics.length}</span> bài viết</h6>
                            <h6><span style={{fontWeight: "650"}}>
                                {state ?state.followers.length: "0"}</span> người theo dõi</h6>
                            <h6>Đang theo dõi <span style={{fontWeight: "650"}}>
                                {state ?state.following.length: "0"}</span> người</h6>
                        </div>
                    </div>
                </div>
                <div className="file-field input-field" 
                    style={{width: "250px",margin: "5px 0 0 30px"}}>
                    <div className="btn #64b5f6 blue darken-1" 
                        style={{fontSize: "12px", height: "40px"}}>
                        <span>Update Avatar</span>
                        <input type="file" onChange={e => updateAvt(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Chọn ảnh"/>
                    </div>
                </div>
            </div>   
            <div >
                <div className="d-posted">                
                    <div className="d-post">
                        <i className="material-icons">view_list</i> 
                        Bài viết
                    </div>
                </div>
                <div className="gallery" >
                {
                    mypics.length?
                    mypics.map(item => {
                        return(
                            <img key={item._id} className='item' src={item.photo} alt= {item.title}/>
                        )                        
                    })
                    :
                    <div className="no-post">Hiện chưa có bài viết nào. </div>
                }
                </div>
            </div>
        
        </div>
        )
}

export default Profile;