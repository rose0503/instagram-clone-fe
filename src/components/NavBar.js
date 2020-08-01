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
    const history = useHistory();
    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])
    const renderList = () => {
        if (state) {
            return (
                <>
                    <li><i className="large material-icons modal-trigger" data-target="modal1" style={{color:"black"}}>search</i></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/create">Create Post</Link></li>
                    <li><Link to="/myfollowingpost">My following Posts</Link></li>
                    <li>
                        <button className="btn waves-effect waves-light #ff8a65 deep-orange lighten-2"
                            onClick={() => {
                                localStorage.clear()
                                dispatch({ type: "CLEAR" })
                                history.push('/signin')
                            }}
                        >
                            Đăng xuất
                    </button>
                    </li>
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
                <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModal} >
                <div className="modal-content">
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