import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
import { debounce } from "lodash";

import { env } from "../server";
import Logo from "../../assets/images/logo-instagram-2.png";

const NavBar = () => {
    const searchModal = useRef(null);
    const [search, setSearch] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const { state, dispatch } = useContext(UserContext);
    let resultSearch = useRef(null);
    const history = useHistory();

    useEffect(() => {
        M.Modal.init(searchModal.current);
    }, []);
    useEffect(() => {
        let dropdowns = document.querySelectorAll(".dropdown-trigger");

        let options = {
            inDuration: 300,
            outDuration: 300,
            focus: true, // Activate on hover
            coverTrigger: false, // Displays dropdown below the button
        };

        M.Dropdown.init(dropdowns, options);
    });

    const fetchUser = (query) => {
        resultSearch.current = query;
        setSearch(query);
        setLoadingFetch(true);
        if (!query) {
            setUserDetails([]);
            setLoadingFetch(false);
            return;
        }

        fetch(`${env.addressServer}/search-user`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                query,
            }),
        })
            .then((res) => res.json())
            .then((results) => {
                setUserDetails(results.user);
                setLoadingFetch(false);
            })
            .catch((err) => {
                setUserDetails([]);
                setLoadingFetch(false);
            });
    };

    const renderList = () => {
        return (
            <>
                <li>
                    <Link to="/">
                        <i className="material-icons icon-item" style={{ color: "black" }}>
                            home
                        </i>
                    </Link>
                </li>
                <li>
                    <Link to="/create">
                        <i className="material-icons icon-item" style={{ color: "black" }}>
                            add_a_photo
                        </i>
                    </Link>
                </li>
                <li className="dropdown-trigger" data-target="dropdown1">
                    <Link to="#!1">
                        <i className="material-icons icon-item" style={{ color: "black" }}>
                            account_circle
                        </i>
                        {/* <img alt="nav-menu-avt" className="nav-img-avt" src={Logo} /> */}
                    </Link>
                </li>

                <ul id="dropdown1" className="dropdown-content">
                    <li>
                        <Link to="/profile">Trang cá nhân</Link>
                    </li>
                    <li>
                        <Link to="/myfollowingpost">Bài đăng theo dõi</Link>
                    </li>
                    <li className="divider" tabIndex="-1"></li>
                    <li>
                        <p
                            className="btn-logout"
                            role="button"
                            onClick={() => {
                                localStorage.clear();
                                dispatch({ type: "CLEAR" });
                                history.push("/signin");
                            }}
                        >
                            Đăng xuất
                        </p>
                    </li>
                </ul>
            </>
        );
    };

    const renderListFetch = () => {
        return (
            <>
                {userDetails.length > 0 ? (
                    <ul className="collection">
                        {userDetails.map((item, idx) => {
                            return (
                                <div className="wrap-collection-item" key={idx}>
                                    <div className="wrap-collection-item--left">
                                        <img
                                            alt={item.id}
                                            src={item.pic}
                                            width={48}
                                            height={48}
                                            style={{ borderRadius: "50%" }}
                                            onError={(err) => {
                                                let data = [...userDetails];
                                                data[idx].pic =
                                                    "https://res.cloudinary.com/quocviet0503/image/upload/v1595881667/default-avatar_haphbj.png";
                                                setUserDetails(data);
                                            }}
                                        />
                                    </div>
                                    <div className="wrap-collection-item--right">
                                        <Link
                                            to={item._id !== state._id ? `/profile/${item._id}` : "/profile"}
                                            key={item._id}
                                            onClick={() => {
                                                M.Modal.getInstance(searchModal.current).close();
                                                setSearch("");
                                                setUserDetails([]);
                                            }}
                                        >
                                            <li className="collection-item">
                                                <span>{item.name}</span>
                                                <span style={{ color: "#8e8e8e" }}>{item.email}</span>
                                            </li>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    resultSearch.current && <div className="no-data">Không tìm thấy kết quả nào.</div>
                )}
            </>
        );
    };

    return (
        <nav className="nav-bar">
            <div className="nav-wrapper white">
                <div style={{ flex: 1 }}>
                    <Link to="/" className="flex-s-c">
                        <img alt="logo" src={Logo} style={{ width: 105, height: "auto" }} />
                    </Link>
                </div>
                <div
                    style={{ color: "#8e8e8e", flex: 1 }}
                    className="modal-trigger hide-on-small-only"
                    data-target="modal1"
                >
                    <div className="nav-input-search-custom">
                        <i className="small material-icons nav-icon-seacrch">search</i>
                        <p>Tìm kiếm</p>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <ul id="nav-mobile" className="right nav-action-menu">
                        {renderList()}
                    </ul>
                </div>
            </div>
            <div
                id="modal1"
                className="modal modal-search-account"
                ref={searchModal}
                style={{ width: "44%", borderRadius: 3, minWidth: 350 }}
            >
                <div className="modal-content">
                    <h4 style={{ fontFamily: "Arial", fontSize: "1.6rem", textAlign: "center", marginBottom: "-5px" }}>
                        Tìm kiếm tài khoản
                    </h4>
                    <input
                        style={{ fontSize: 15 }}
                        type="text"
                        placeholder="Nhập tên hoặc email cần tìm"
                        value={search}
                        onChange={(e) => fetchUser(e.target.value)}
                    />
                    {loadingFetch ? (
                        <div style={{ textAlign: "center" }}>
                            <div className="preloader-wrapper small active" style={{ width: 25, height: 25 }}>
                                <div className="spinner-layer spinner-green-only">
                                    <div className="circle-clipper left">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="gap-patch">
                                        <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        renderListFetch()
                    )}
                </div>
                <div className="modal-footer nav-modal-footer">
                    <button
                        className="modal-close btn-flat"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            setSearch("");
                            resultSearch.current = null;
                            setUserDetails([]);
                            setLoadingFetch(false);
                        }}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </nav>
    );
};
export default NavBar;
