import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { env } from "../../server";
// import moment from 'moment'
import moment from "moment-timezone";

import "./index.scss";
import Friends from "./Friends";
import Posts from "./Posts";

moment.locale("vi");

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        await fetch(`${env.addressServer}/allpost`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result)
                setData(result.posts);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let dropdowns = document.querySelectorAll(".tooltipped");
        let options = {
            inDuration: 300,
            outDuration: 300,
            hover: true, // Activate on hover
            coverTrigger: false, // Displays dropdown below the button
        };

        M.Tooltip.init(dropdowns, options);
    });

    const closeDropDown = () => {
        let dropdowns = document.querySelectorAll(".dropdown-trigger1");
        M.Dropdown.getInstance(dropdowns).close();
    };

    return (
        <div className="home">
            {loading ? (
                <div className="wrapper-group-preloader">
                    <div className="preloader-wrapper small active">
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
                <React.Fragment>
                    <Posts data={data} setData={setData} />
                    <Friends />
                </React.Fragment>
            )}
        </div>
    );
};

export default Home;
