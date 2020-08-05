import React,{useState,useEffect,useContext, useRef} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
import M from 'materialize-css'
import {env} from "../server"
// import moment from 'moment'
import moment from 'moment-timezone'
moment.locale('vi')
const Home  = ()=>{
    const [data,setData] = useState([])
    const [loading, setLoading] =useState(false)
    const {state,dispatch} = useContext(UserContext)
    const [showComment, setShowComment] = useState(false)
    const [indexComment, setIndexComment] = useState('')
    const fetchData =async () => {
        setLoading(true)
        await fetch(`${env.addressServer}/allpost`,{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
         .then(result=>{
            // console.log(result)
            setData(result.posts)
            setLoading(false)
        })
    }

    useEffect(()=>{       
        fetchData();
    },[])

    useEffect(()=>{
        let dropdowns = document.querySelectorAll('.tooltipped');
        let options = {
            inDuration: 300,
            outDuration: 300,
            hover: true, // Activate on hover
            coverTrigger: false, // Displays dropdown below the button
        };
        
        M.Tooltip.init(dropdowns, options);
    })

    const closeDropDown = () => {
        let dropdowns = document.querySelectorAll('.dropdown-trigger1');
        M.Dropdown.getInstance(dropdowns).close()
    }
    const likePost = (id)=>{
        fetch(`${env.addressServer}/like`,{
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
        fetch(`${env.addressServer}/unlike`,{
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
        fetch(`${env.addressServer}/comment`,{
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
            // console.log(result)
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
      fetch(`${env.addressServer}/deletepost/${postId}`,{
          method:"delete",
          headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res => res.json())
      .then(result => {
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
            loading ? 
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
            : ""
            }
            {
                data.map((item, i) => { 
                    return(
                        <div className='card home-card' key={item._id}>
                            <div style={{padding:"15px 0 15px 15px", fontSize:"18px", borderBottom:"1px solid #efefef",display: "flex",justifyContent: 'space-between'}}>
                                <div style={{display:"flex"}}>
                                    <img className="img-avt" src={item.postedBy.pic}/>
                                    <span style={{ fontWeight: "500", fontSize: "15px"}}>
                                        <Link to={item.postedBy._id !== state._id ? 
                                            `/profile/${item.postedBy._id}` : "/profile"
                                        }>{item.postedBy.name}</Link></span>
                                </div>
                                <div>
                                {
                                    item.postedBy._id === state._id
                                    ? <i  onClick={()=>deletePost(item._id)} className="material-icons like tooltipped" 
                                        data-position="top" data-tooltip="Xóa bài viết"
                                        style={{color:"black", float:"right", margin:"0 5px 0 10px"}}
                                        >delete</i>
                                    :  
                                    <i className="material-icons icon-item " 
                                    style={{color:"black", float:"right", marginLeft:"10px"}}>more_horiz</i>
                                
                                }
                                <p className = "time-post" style={{float:"right", margin: "0"}}>   
                                    {item.createdAt ? moment(item.createdAt).startOf('minute').fromNow() :  ""} 
                                </p> 
                                </div>
                            </div>
                            <div className="card-image">
                                <img  src={item.photo} alt={item.title}/>                    
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
                                    <h6 style={{paddingBottom: "10px"}}>{item.likes.length} lượt thích</h6>
                                </div>
                                
                                <div className="title-post">
                                    <span>{item.postedBy.name}</span>
                                    <span>{item.title}</span>    
                                </div>
                                <h6>#{item.body}</h6>
                                {
                                    item.comments.length ?
                                    <span className="like" style={{color: "#00376b", fontWeight: "500"}}
                                        onClick={()=>setShowComment(!showComment)}
                                    >{item.comments.length} bình luận</span>
                                    : ""
                                }
                                {
                                    showComment ? 
                                    item.comments.map(record => {
                                        return(
                                            <>                                            
                                                <h6 key={record._id} style={{display:"flex"}}>
                                                    <img className="img-avt-cmt" src={record.postedBy.pic}/>
                                                    <span style={{fontWeight:"500", marginRight:"6px"}}>{record.postedBy.name}</span>
                                                    <span>{record.text}</span>
                                                </h6>
                                                <div className="reaction">
                                                    <span>{record.date!==undefined  ? moment(record.date).startOf('minute').fromNow() :  ""}</span>
                                                    <span style={{marginLeft:"10px"}}  className="like" >Trả lời</span>        
                                                </div>
                                            </>
                                            )
                                        })
                                    : ""    
                                }
                                
                            </div>
                            <div style={{borderTop: '1px solid #efefef'}}>
                            <form className="form-cmt"  onSubmit={(e)=>{
                                    e.preventDefault()
                                    // console.log(e.target[0].value)
                                    makeComment(e.target[0].value, item._id)
                                    e.target[0].value=''
                                }}>
                                    <input type="text" placeholder="Thêm bình luận" />
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