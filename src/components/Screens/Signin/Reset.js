import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import M from "materialize-css";
import { env } from "../../server";
import Logo from "../../../assets/images/logo-instagram-2.png";

const Reset = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const postData = () => {
        const checkEmail =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!checkEmail.test(email)) {
            M.toast({ html: "Email không hợp lệ!", classes: "#e53935 red darken-1 fit--right" });
            return;
        }
        fetch(`${env.addressServer}/reset-password`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#e53935 red darken-1 fit--right" });
                    return;
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1 fit--right" });
                    history.push("/signin");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="mycard ">
            <div className="card auth-card input-field" style={{ padding: "20px 20px 0 20px" }}>
                <img alt="logo" src={Logo} style={{ width: 180, height: "auto", margin: "10px 0" }} />
                <div className="title-reset">Bạn gặp sự cố khi đăng nhập?</div>
                <span>Nhập email của bạn và chúng tôi sẽ gửi cho bạn mất khẩu mới vào gmail.</span>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button
                    disabled={!email}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1  btn-signin"
                    onClick={() => postData()}
                >
                    Gửi đi
                </button>
                <div className="divide">Hoặc</div>
                <div className="forget-password">
                    <Link to="/signup" className="text-link-reset-password">
                        Tạo tài khoản mới
                    </Link>
                </div>
                <div className="back-signup">
                    <Link to="/signin" className="text-link-reset-password">
                        Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Reset;
