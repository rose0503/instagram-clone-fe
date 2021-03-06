import React, {useState, useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from "../../App"
import {env} from "../server"

const  Signin = () => {
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const PostData = () => {
        const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!checkEmail.test(email)){
            M.toast({html: "Email không hợp lệ!", classes:"#e53935 red darken-1"});
            return;
        }
        fetch(`${env.addressServer}/signin`,{
            method: "post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=> res.json())
         .then(data=> {
                if(data.error){
                    M.toast({html: data.error, classes:"#e53935 red darken-1"})
                    return
                }
                else {
                    localStorage.setItem("jwt",data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({type: "USER", payload: data.user})
                    M.toast({html: "Đăng nhập thành công", classes:"#43a047 green darken-1"})
                    history.push("/")
                }
         }).catch(err => {
             console.log(err);
         })
    }
    return(
        <div className='mycard '>
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
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
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                        onClick={()=>PostData()}
                >
                    Đăng nhập   
                </button>
                <h6 className='forget-password'>
                    <Link to='/reset' className='sign'>Bạn quên mật khẩu?</Link>
                </h6>
            </div>
            <div className='card yet-card'>
                <h6>
                    Bạn chưa có tài khoản?
                    <Link to='/signup' className='sign'>Đăng ký</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signin;