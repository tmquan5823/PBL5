import React from "react";
import "./Card.css";

const Card = props => {
    return <div className="card">
        <h2 className="card__title">{props.title}</h2>
        <img className="card__image" src={`/images/${props.image}`} alt="" />
    </div>
};

export default Card;