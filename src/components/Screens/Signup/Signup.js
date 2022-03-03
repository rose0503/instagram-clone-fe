import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { env } from "../../server";
import "./index.scss";
import Logo from "../../../assets/images/logo-instagram-2.png";

const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);
    const [srcBase64, setSrcBase64] = useState(undefined);

    useEffect(() => {
        const fetchData = () => {
            if (url) {
                uploadField();
            }
        };
        fetchData();
    }, [url]);

    const uploadPic = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram-clone");
        data.append("folder", "instagram-clone");
        data.append("cloud_name", "no");
        fetch("	https://api.cloudinary.com/v1_1/quocviet0503/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setUrl(data.url);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const uploadField = () => {
        const checkEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!checkEmail.test(email)) {
            M.toast({ html: "Email không hợp lệ!", classes: "#e53935 red darken-1 fit--right" });
            return;
        }
        fetch(`${env.addressServer}/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                pic: url,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.err) {
                    M.toast({ html: data.err, classes: "#e53935 red darken-1 fit--right" });
                } else {
                    M.toast({ html: data.messenge, classes: "#43a047 green darken-1 fit--right" });
                    history.push({ pathname: "/signin", state: { email } });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const submitData = () => {
        if (image) {
            uploadPic();
        } else {
            uploadField();
        }
    };

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setSrcBase64(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    return (
        <div className="mycard" style={{ flexDirection: "column", height: "auto" }}>
            <div className="card auth-card input-field">
                <img alt="logo" src={Logo} style={{ width: 180, height: "auto", margin: "10px 0" }} />
                <div className="text-desc-signup">Đăng ký để xem ảnh các bản tin mới nhất của bạn bè.</div>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="file-field input-field">
                    <div className="btn #45bbb0" style={{ height: "2.9rem", textTransform: "none" }}>
                        <span>Tải ảnh đại điện</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Chọn ảnh" />
                    </div>
                    {srcBase64 && (
                        <img
                            alt="preview-avatar"
                            src={srcBase64}
                            style={{ width: "100%", height: "auto", maxHeight: 200 }}
                        />
                    )}
                </div>
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1 btn-signin"
                    disabled={!(email && name && password)}
                    onClick={submitData}
                >
                    Đăng ký
                </button>
            </div>
            <div className="card yet-card" style={{ width: 330 }}>
                <span>
                    Bạn đã có tài khoản?
                    <Link to="/signin" className="link-sign">
                        Đăng nhập
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default Signup;
