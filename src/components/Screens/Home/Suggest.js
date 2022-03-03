import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { env } from "../../server";
import { UserContext } from "../../../App";

function Suggest(props) {
    let { allFollower, setAllFollower = () => {}, setListFriend = () => {} } = props;
    const { state, dispatch } = useContext(UserContext);

    const [loadingFollowIds, setLoadingFollowIds] = useState([]);

    const followUser = (id) => {
        if (loadingFollowIds.includes(id)) {
            return;
        }
        setLoadingFollowIds([...loadingFollowIds, id]);
        fetch(`${env.addressServer}/follow`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                followId: id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
                localStorage.setItem("user", JSON.stringify(data));
                setListFriend(data.following.slice(0, 3));

                fetch(`${env.addressServer}/list-follower/${state?._id}?limit=${4}`, {
                    method: "get",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                })
                    .then((res) => res.json())
                    .then((resultFollower) => {
                        setAllFollower(resultFollower);
                    });

                let arrTmp = [...loadingFollowIds];
                const index = arrTmp.indexOf(id);
                arrTmp.splice(index, 1);
                setLoadingFollowIds(arrTmp);
            })
            .catch((err) => {
                let arrTmp = [...loadingFollowIds];
                const index = arrTmp.indexOf(id);
                arrTmp.splice(index, 1);
                setLoadingFollowIds(arrTmp);
                setAllFollower([...loadingFollowIds].filter((item) => item != id));
            });
    };

    return (
        <div className="wrapper-list-friends" style={{ marginTop: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#8e8e8e", fontWeight: 600, fontSize: 14 }}>Gợi ý cho bạn</span>
                {allFollower.length > 0 && (
                    <Link to="/list-friend" style={{ color: "#262626", fontWeight: 600, fontSize: 12 }}>
                        Xem tất cả
                    </Link>
                )}
            </div>
            {allFollower.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="wrap-collection-item" style={{ padding: 0, marginBottom: 20 }}>
                        <div className="wrap-collection-item--left">
                            <img
                                alt="pic"
                                src={item.pic}
                                width={32}
                                height={32}
                                style={{ borderRadius: "50%" }}
                                onError={(err) => {
                                    let data = [...allFollower];
                                    data[idx].pic =
                                        "https://res.cloudinary.com/quocviet0503/image/upload/v1595881667/default-avatar_haphbj.png";
                                    setAllFollower(data);
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
                            textAlign: "center",
                        }}
                        onClick={() => followUser(item?._id)}
                    >
                        {loadingFollowIds.includes(item._id) ? (
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
                            "Theo dõi"
                        )}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Suggest;
