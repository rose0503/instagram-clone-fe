import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import { env } from "../server";

const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (url) {
            fetch(`${env.addressServer}/createpost`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1 fit--right" });
                    } else {
                        M.toast({ html: "Bài đăng thành công", classes: "#43a047 green darken-1 fit--right" });
                        history.push("/");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [url]);

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram-clone");
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
    return (
        <div
            className="card input-field"
            style={{
                margin: "30px auto",
                maxWidth: "600px",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <h4 style={{ fontFamily: "Arial", fontSize: "1.8rem" }}>Tạo bài viết của bạn</h4>
            <input
                type="text"
                placeholder="Tiêu đề bài viết"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Cảm nhận của bạn như thế nào?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Chọn ảnh" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={postDetails}>
                Đăng bài
            </button>
        </div>
    );
};

export default CreatePost;
