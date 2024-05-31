import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./Profile";
import {getUser} from "../user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function EventPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        get();
    }, []);

    const user = getUser();

    const get = () => {
        const events = JSON.parse(localStorage.getItem("events"));
        setEvents(events?.filter(o => o.userId === user?.id) || []);
    }

    const deleteEvent = (id) => {
        const data = [];
        const events = JSON.parse(localStorage.getItem("events"));
        data.push(...events.filter(e => e.id !== id));
        localStorage.setItem("events", JSON.stringify(data));
        get();
    }

    return (
        <div>
            <div className="mainContainerCode">
                <div className="headerContainerCode">
                    <h2>CodeLeap Network</h2>
                </div>
            </div>
            <div className="bodyContainerCode">
                <div className="form">
                    <div className="formInner">
                        <h2>What’s on your mind?</h2>
                        <button className="buttonAddCode" onClick={() => navigate("/events/new")}>Create Post</button>
                    </div>
                </div>
                    <div>
                    {
                        events?.map((item, i) => (
                        <table>
                            <tr key={i} className="headerevent">
                                <h2>
                                    {item.name}
                                </h2>
                                <td> 
                                <i class="fa-regular fa-trash"></i>
                                    <button onClick={() => navigate(`/events/${item.id}`)}>Edit</button>
                                    <button onClick={() => deleteEvent(item.id)}>Delete</button>
                                </td>
                            </tr>
                            <tr key={i} className="bodyeventas">
                                <p>
                                {item.description}
                                </p>
                            </tr>
                        </table>
                        ))
                    }
                    </div>
                </div>
            </div>
    )
}