import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from "materialize-css";
import { env } from "../server";

const Signin = () => {
    const history = useHistory();
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const PostData = () => {
        fetch(`${env.addressServer}/new-password`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
                token,
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
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="password"
                    placeholder="nhập password mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={() => PostData()}>
                    Update password
                </button>
            </div>
        </div>
    );
};

export default Signin;
