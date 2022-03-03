import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { env } from "../../server";
// import moment from 'moment'
import moment from "moment-timezone";

import "./index.scss";
import Suggest from "./Suggest";

function Friends() {
    const { state, dispatch } = useContext(UserContext);

    const [listFriend, setListFriend] = useState([]);
    const [allFollower, setAllFollower] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [loadingUnfollowIds, setLoadingUnfollowIds] = useState([]);

    const calledOnce = React.useRef(false);

    useLayoutEffect(() => {
        if (calledOnce.current) {
            return;
        }
        if (state) {
            (async () => {
                setLoading(true);
                await fetch(`${env.addressServer}/list-follow-user/${state?._id}`, {
                    method: "get",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                })
                    .then((res) => res.json())
                    .then((result) => {
                        let data = { ...result };
                        setListFriend(data.following.slice(0, 3));
                        delete data["following"];
                        delete data["followers"];
                        setUser(data);

                        fetch(`${env.addressServer}/list-follower/${state?._id}?limit=${4}`, {
                            method: "get",
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("jwt"),
                            },
                        })
                            .then((res) => res.json())
                            .then((resultFollower) => {
                                setAllFollower(resultFollower);
                                setLoading(false);
                            });

                        calledOnce.current = true;
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            })();
        }
    }, [state]);

    const unFollower = (id) => {
        if (loadingUnfollowIds.includes(id)) {
            return;
        }
        setLoadingUnfollowIds([...loadingUnfollowIds, id]);
        fetch(`${env.addressServer}/unfollow`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                unfollowId: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
                localStorage.setItem("user", JSON.stringify(data));
                setListFriend(data.following.slice(0, 3));

                let arrTmp = [...loadingUnfollowIds];
                const index = arrTmp.indexOf(id);
                arrTmp.splice(index, 1);
                setLoadingUnfollowIds(arrTmp);
            })
            .catch((err) => {
                let arrTmp = [...loadingUnfollowIds];
                const index = arrTmp.indexOf(id);
                arrTmp.splice(index, 1);
                setLoadingUnfollowIds(arrTmp);
            });
    };

    if (loading) {
        return <></>;
    }

    return (
        <div className="wrapper-home-right">
            <div className="wrap-collection-item" style={{ padding: 0, marginBottom: 20 }}>
                <div className="wrap-collection-item--left">
                    <img
                        alt="pic"
                        src={user?.pic}
                        width={54}
                        height={54}
                        style={{ borderRadius: "50%" }}
                        onError={(err) => {
                            let data = [...user];
                            data.pic =
                                "https://res.cloudinary.com/quocviet0503/image/upload/v1595881667/default-avatar_haphbj.png";
                            setUser(data);
                        }}
                    />
                </div>
                <div className="wrap-collection-item--right" style={{ paddingLeft: 10 }}>
                    <Link to={`/profile`} key={user?._id}>
                        <li className="collection-item">
                            <span style={{ fontWeight: 600 }}>{user?.name} (Tôi)</span>
                            <span style={{ color: "#8e8e8e" }}>{user?.email}</span>
                        </li>
                    </Link>
                </div>
            </div>
            <div className="wrapper-list-friends">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#8e8e8e", fontWeight: 600, fontSize: 14 }}>Đang theo dõi</span>
                    {listFriend.length > 0 && (
                        <Link to="/list-friend" style={{ color: "#262626", fontWeight: 600, fontSize: 12 }}>
                            Xem tất cả
                        </Link>
                    )}
                </div>
                {listFriend.length > 0 ? (
                    listFriend.map((item, idx) => (
                        <div
                            key={idx}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <div className="wrap-collection-item" style={{ padding: 0, marginBottom: 20 }}>
                                <div className="wrap-collection-item--left">
                                    <img
                                        alt="pic"
                                        src={item.pic}
                                        width={32}
                                        height={32}
                                        style={{ borderRadius: "50%" }}
                                        onError={(err) => {
                                            let data = [...listFriend];
                                            data[idx].pic =
                                                "https://res.cloudinary.com/quocviet0503/image/upload/v1595881667/default-avatar_haphbj.png";
                                            setListFriend(data);
                                        }}
                                    />
                                </div>
                                <div className="wrap-collection-item--right" style={{ paddingLeft: 10 }}>
                                    <Link to={`/profile/${item?._id}`} key={item?._id}>
                                        <li className="collection-item">
                                            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: "14px" }}>
                                                {item?.name}
                                            </span>
                                            <span style={{ color: "#8e8e8e", fontSize: 12 }}>{item?.email}</span>
                                        </li>
                                    </Link>
                                </div>
                            </div>
                            <span
                                style={{
                                    color: "#0095f6",
                                    fontWeight: 600,
                                    fontSize: 12,
                                    cursor: "pointer",
                                    width: 64,
                                }}
                                onClick={() => unFollower(item?._id)}
                            >
                                {loadingUnfollowIds.includes(item._id) ? (
                                    <div className="wrapper-group-preloader list-friend-custom-preloader">
                                        <div className="preloader-wrapper small active preloader-size">
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
                                    "Bỏ theo dõi"
                                )}
                            </span>
                        </div>
                    ))
                ) : (
                    <div style={{ padding: "10px 0", color: "#262626", fontSize: 13 }}>
                        <span style={{ display: "block" }}>Bạn đang chưa theo dõi ai.</span>
                        <span>Hãy theo dõi thêm mọi người để xem được nhiều bài viết từ các bạn bè.</span>
                    </div>
                )}

                <Suggest allFollower={allFollower} setAllFollower={setAllFollower} setListFriend={setListFriend} />
            </div>
        </div>
    );
}

export default Friends;
