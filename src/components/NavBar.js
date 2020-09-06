import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { UserContext } from '../App'
import M from "materialize-css"
import {env} from "./server"


const NavBar = () => {
    const searchModal = useRef(null);
    const [search, setSearch] = useState('');
    const [userDetails, setUserDetails] = useState([])
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory( )
        
    useEffect(()=>{
        M.Modal.init(searchModal.current)
        
    },[])
    useEffect(()=>{
        let dropdowns = document.querySelectorAll('.dropdown-trigger');
    
        let options = {
            inDuration: 300,
            outDuration: 300,
            focus: true, // Activate on hover
            coverTrigger: false, // Displays dropdown below the button
        };
        
        M.Dropdown.init(dropdowns, options);
    })
    const renderList = () => {
        if (state) {
            return (
                <>
                    
                    <li style={{color:"black", width: "700px", display: "flex",justifyContent: "center"}}
                        className="like  modal-trigger" 
                        data-target="modal1" 
                    >
                        <div className="nav-custom">
                            <i className="medium material-icons" >search</i>
                            <p>Tìm kiếm</p>
                        </div>
                    </li>
                    
                    <li><Link to="/"><i className="material-icons icon-item" style={{color:"black"}}>home</i></Link></li>
                    <li><Link to="/create"><i className="material-icons icon-item" style={{color:"black"}}>add_a_photo</i></Link></li>
                    <li className="dropdown-trigger" data-target="dropdown1"><Link to="#!1"><i className="material-icons icon-item" style={{color:"black"}}>account_circle</i></Link></li>
                    
                    
                    <ul id='dropdown1' className='dropdown-content'>
                        <li><Link to="/profile">Trang cá nhân</Link></li>
                        <li><Link to="/myfollowingpost">Bài đăng theo dõi</Link></li>
                        <li className="divider" tabIndex="-1"></li>
                        <li>
                            <p className="btn-logout" role="button"
                                onClick={() => {
                                    localStorage.clear()
                                    dispatch({ type: "CLEAR" })
                                    history.push('/signin')
                                }}
                                >
                                    Đăng xuất
                            </p>
                        </li>
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <li><Link to="/signin">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </>
            )
        }
    }
    
    const fetchUser = (query)=>{
        setSearch(query)
        fetch(`${env.addressServer}/search-user`,{
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                query
            })
        }).then(res=>res.json())
         .then(results =>{
            setUserDetails(results.user)
         })
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <div>
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                </div>
                <div>
                <ul id="nav-mobile" className="right ">
                    {renderList()}
                </ul>
                </div>
            </div>
            <div id="modal1" className="modal" ref={searchModal} style={{width: "44%"}}>
                <div className="modal-content">
                    <h4 style={{fontFamily:"Arial", fontSize: "1.8rem",textAlign: "center"}}>Tìm kiếm tài khoản</h4>
                    <input
                        type="text"
                        placeholder= "Tìm kiếm"
                        value={search}
                        onChange={(e) => fetchUser(e.target.value)}
                    />
                    <ul className="collection">
                        {
                            userDetails.map(item=>{
                                return <Link to={item._id !== state._id ? `/profile/${item._id}` : "/profile"} key={item._id} 
                                            onClick={()=>{
                                                M.Modal.getInstance(searchModal.current).close()
                                                setSearch('')
                                                setUserDetails([])
                                            }}
                                        ><li className="collection-item">{item.email}</li></Link>
                            })
                        }
                    </ul>
                </div>
                <div className="modal-footer">
                <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
                </div>
            </div>
        </nav>
    )
}
export default NavBar;