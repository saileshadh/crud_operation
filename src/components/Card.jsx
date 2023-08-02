import React from "react";
const Card = ({ pokemons, info}) => {
    return (
        <>
            {pokemons.map((item) => (
                <div className="card"
                    key={item.id}
                    onClick={() => info(item)}>
                    <h2>{item.id}</h2>
                    <img src={item.sprites.front_default} alt="" />
                    <h2>{item.name}</h2>
                </div>

            ))}

           
        </>
    );
};
export default Card;