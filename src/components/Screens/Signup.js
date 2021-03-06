import React, {useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {env} from "../server"

const  Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined);
    useEffect(()=>{
        const fetchData = ()=> {
            if(url){
                uploadField()
            }
        }
        fetchData();
    },[url])

    const uploadPic = ()=> {
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
            setUrl(data.url)
         })
         .catch(err => {
             console.log(err)
         })
    }

    const uploadField = () => {
        const checkEmail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!checkEmail.test(email)){
            M.toast({html: "Email không hợp lệ!", classes:"#e53935 red darken-1"});
            return;
        }
        fetch(`${env.addressServer}/signup`,{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                pic:url
            })
        }).then(res=> res.json())
         .then(data=> {
                if(data.err){
                    M.toast({html: data.err, classes:"#e53935 red darken-1"})
                }
                else {
                    M.toast({html: data.messenge, classes:"#43a047 green darken-1"})
                    history.push("/signin")
                }
         }).catch(err => {
             console.log(err);
         })
    }

    const PostData = () => {
        if(image){
            uploadPic();
        }
        else{
            uploadField()
        }
        
    }
    
    return(
        <div className='mycard '>
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder= "name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder= "email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type= "password"
                    placeholder = "password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1" style={{height: "2.9rem"}}>
                        <span>Upload Avatar</span>
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Chọn ảnh"/>
                    </div>
                </div>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                        onClick={PostData}        
                >
                    Đăng ký 
                </button>
            </div>
            <div className='card yet-card'>
                <h6>
                    Bạn đã có tài khoản?
                    <Link to='/signin' className='sign'>Đăng nhập</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup;