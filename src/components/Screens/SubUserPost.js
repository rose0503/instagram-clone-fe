import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import M from 'materialize-css'

const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    
    const fetchData =async () => {
        await fetch('/getsubpost',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
         .then(result=>{
            setData(result.posts)
        })
    }

    useEffect(()=>{       
        fetchData();
    },[])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
          const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
          //   console.log(result)
          const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
          console.log(err)
      })
  }
   
    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
           })
           M.toast({html: 'Đã thêm bình luận', classes: 'rounded custom-comment'});
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

  const deletePost = (postId) => {
      fetch(`/deletepost/${postId}`,{
          method:"delete",
          headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res => res.json())
      .then(result => {
          //console.log(result)
          const newData = data.filter(item=>{
              return item._id !==result._id
          })          
          M.toast({html: "Xóa bài thành công", classes:"#43a047 green darken-1"})       
          setData(newData)
      })
  }
    return(
        <div className="home">
            {
                data.map(item => {
                    return(
                        <div className='card home-card' key={item._id}>
                            <div style={{padding:" 15px", fontSize:"18px", fontWeight: "500"}}>
                            <span>
                                <Link to={item.postedBy._id !== state._id ? 
                                    `/profile/${item.postedBy._id}` : "/profile"
                                }>{item.postedBy.name}</Link></span>
                            {
                            item.postedBy._id === state._id
                            && <i className="material-icons like" 
                                style={{float:"right"}}
                                onClick={()=>deletePost(item._id)}
                                >delete</i>
                            }
                            </div>
                            <div className="card-image">
                                <img src={item.photo}/>                    
                            </div>
                            <div className="card-content">
                                <div className="icon">
                                    {item.likes.includes(state._id)
                                    ? 
                                    <i className="material-icons icon-item like" style={{color:"red"}}
                                            onClick={()=>{unlikePost(item._id)}}
                                    >favorite</i>
                                    : 
                                    <i className="material-icons icon-item like" 
                                    onClick={()=>{likePost(item._id)}}
                                    >favorite_border</i>
                                    }                                 
                                    <i className="material-icons icon-item">comment</i>
                                    <i className="material-icons icon-item">near_me</i>
                                </div>
                                <h6>{item.likes.length} likes</h6>
                                <div className="title-post">
                                    <span>{item.postedBy.name}</span>
                                    <span>{item.title}</span>    
                                </div>
                                <h6>{item.body}</h6>
                                {
                                    item.comments.map(record => {
                                        return(
                                            <h6 key={record._id}>
                                                <span style={{fontWeight:"500", marginRight:"10px"}}>{record.postedBy.name}</span>
                                                <span>{record.text}</span>
                                            </h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    // console.log(e.target[0].value)
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="Thêm bình luận"/>
                                </form>
                            </div>
                        </div> 
            
                    )
                })
            }
            
        </div>
    )
}

export default Home;