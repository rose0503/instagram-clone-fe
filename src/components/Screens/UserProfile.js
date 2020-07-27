import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from "react-router-dom"

const Profile = () => {
    const [userProfile, setProfile] = useState(null);
    
    const {state, dispatch } = useContext(UserContext);
    const {userid} = useParams();
    const [showfollow, setShowfollow] = useState(state ? !state.following.includes(userid) : true);
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setProfile(result)
        })
    }, [])

    const followUser = () => {
        fetch('/follow',{
            method: "put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following,followers: data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setShowfollow(false)
        })
    }

    const unfollowUser = () => {
        fetch('/unfollow',{
            method: "put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following,followers: data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id)
                return{
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowfollow(true)
        })
    }

    return(
        <>
        {
        userProfile ? 
        
        <div style={{maxWidth:"600px", margin: "0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent:"space-around",
                padding: "18px 0px", 
                borderBottom: "1px solid #dbdbdb"
            }}>
                <div>
                    <img style={{width: "160px", height:"160px",borderRadius:"80px"}}
                        src={userProfile.user.pic}
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex", justifyContent: "space-between",width: "110%"}}>
                        <h6><span style={{fontWeight: "650"}}>{userProfile.posts.length}</span> bài viết</h6>
                        <h6><span style={{fontWeight: "650"}}>{userProfile.user.followers.length}</span> người theo dõi</h6>
                        <h6>Đang theo dõi <span style={{fontWeight: "650"}}>{userProfile.user.following.length}</span> người</h6>
                    </div>
                    {
                        showfollow ? 
                        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                        onClick={()=>{followUser()}}
                        >
                            Theo dõi
                        </button>
                        :
                        <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                            onClick={()=>{unfollowUser()}}
                        >
                            Bỏ theo dõi
                        </button>
                    }
                    
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
                    userProfile.posts.length ?
                    userProfile.posts.map(item => {
                        return(
                            <img key={item._id} className='item' src={item.photo} alt= {item.title}/>
                        )                        
                    })
                    :
                    <div className= "no-post">Hiện chưa có bài viết nào. </div>
                }
                </div>
            </div>
        
        </div>

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
        </>
        )
}

export default Profile;