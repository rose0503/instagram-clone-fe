import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import M from "materialize-css";

import { UserContext } from "../../../App";
import { env } from "../../server";
import PhoneLogin from "../../../assets/images/phone-login.png";
import Logo from "../../../assets/images/logo-instagram-2.png";
import SildeLogin1 from "../../../assets/images/p-l-silde-1.jpg";
import SildeLogin2 from "../../../assets/images/p-l-silde-2.jpg";
import SildeLogin3 from "../../../assets/images/p-l-silde-3.jpg";
import SildeLogin4 from "../../../assets/images/p-l-silde-4.jpg";
import SildeLogin5 from "../../../assets/images/p-l-silde-5.jpg";

import "./index.scss";
import Loader from "react-spinners/BarLoader";

const Signin = () => {
    const location = useLocation();
    const { state, dispatch } = useContext(UserContext);
    const dataImg = [SildeLogin1, SildeLogin2, SildeLogin3, SildeLogin4, SildeLogin5];
    const [srcImg, setSrcImg] = useState(SildeLogin1);
    let imgIdx = useRef(0);

    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            if (imgIdx.current > 4) {
                imgIdx.current = 0;
                setSrcImg(dataImg[0]);
                return;
            }
            setSrcImg(dataImg[imgIdx.current]);
            imgIdx.current++;
        }, 10000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (location?.state?.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const postData = () => {
        const checkEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!checkEmail.test(email)) {
            M.toast({
                html: "Email không hợp lệ!",
                classes: "#e53935 red darken-1 fit--right",
            });
            return;
        }
        fetch(`${env.addressServer}/signin`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1 fit--right" });
                    return;
                } else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user });
                    M.toast({ html: "Đăng nhập thành công", classes: "#43a047 green darken-1 fit--right" });
                    history.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="mycard">
            <div className="signin--slide-phone" style={{ position: "relative", top: 0, left: 0 }}>
                <img
                    alt="login"
                    src={PhoneLogin}
                    width={460}
                    height={600}
                    style={{ position: "relative", top: 0, left: 0 }}
                />
                <img
                    alt="slide"
                    src={srcImg}
                    style={{ position: "absolute", top: 95, left: 152, maxWidth: 244, width: 244, height: 418 }}
                    className="img-in-backgroup"
                />
            </div>
            <div className="tab-right-login">
                <div className="card auth-card input-field">
                    <img alt="logo" src={Logo} style={{ width: 180, height: "auto", margin: "10px 0" }} />
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        disabled={!(email && password)}
                        className="btn waves-effect waves-light blue darken-1 mt-5 btn-signin"
                        onClick={() => postData()}
                    >
                        Đăng nhập
                    </button>
                    <div className="forget-password">
                        <Link to="/reset" className="forget-password">
                            Bạn quên mật khẩu?
                        </Link>
                    </div>
                </div>
                <div className="card yet-card">
                    <span>
                        Bạn chưa có tài khoản?
                        <Link to="/signup" className="link-sign">
                            Đăng ký
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Signin;
