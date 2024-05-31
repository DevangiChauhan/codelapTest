import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Profile from "./Profile";

export default function EventForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [event, setEvent] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (params.id) {
            const events = JSON.parse(localStorage.getItem("events"));
            if (events && events.length) {
                const ev = events.find(e => e.id === Number(params.id));
                if (ev) {
                    setEvent(ev);
                } else {
                    navigate("/events");
                }
            }
        }
    }, []);

    const handleChange = (e) => {
        let {name, value} = e.target;
        if (name === "price") {
            value = value.replace(/\D/g, "");
        }
        setEvent(prev => {
            return {
                ...prev,
                [name]: value
            }
        });

        setError(name, "");
    }

    const setError = (name, value) => {
        setErrors(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const cancel = () => {
        setEvent({});
        setErrors({});
        navigate("/events");
    }

    const create = () => {

        const validate = ["name", "description"];
        let errs = {};
        for (let i = 0; i < validate.length; i++) {
            if (!event[validate[i]]) {
                errs = {...errs, [validate[i]]: `${validate[i]} is required`};
            }
        }

        setErrors(prev => {
            return {
                ...prev,
                ...errs
            }
        });

        if (!Object.keys(errs).length) {
            save();
        }
    }

    const save = () => {
        const data = [];
        const user = {id: 1};
        const old = JSON.parse(localStorage.getItem("events"));
        let id = 1;
        if (old) {
            data.push(...old);
            id = old.length ? old[old.length - 1].id + 1 : 1;
        }

        if (event?.id) {
            const oldEvent = data.find(o => o.id === event.id);
            for (const a in oldEvent) {
                oldEvent[a] = event[a];
            }
        } else {
            data.push({id, userId: user.id, ...event});
        }

        localStorage.setItem("events", JSON.stringify(data));
        cancel();
    }

    return (
        <div>
            <div className="card">
                <div className="form">
                    <div className="title">
                        <p>{event.id ? "Update" : "Create"} Item</p>
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Title<span className="mandatory">*</span></label>
                        <input type="text" name="name" placeholder="Hello World" value={event.name || ""} onChange={handleChange}/>
                        {
                            !!errors.name && <span className="mandatory">{errors.name}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div>
                        <label>Content<span className="mandatory">*</span></label>
                        <textarea style={{width: "100%"}} rows="4" name="description" placeholder="Content Here" value={event.description || ""}
                                  onChange={handleChange}></textarea>
                        {
                            !!errors.description && <span className="mandatory">{errors.description}</span>
                        }
                    </div>
                    <div className="space"></div>
                    <div>
                        <button onClick={() => cancel()}>Cancel</button>
                        <button style={{marginLeft: "5px"}}
                                onClick={() => create()}>{event.id ? "Update" : "Create"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}