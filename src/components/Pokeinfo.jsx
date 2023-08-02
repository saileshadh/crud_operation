import React from "react";

const Pokeinfo = ({ data , onDelete,item, onUpdate }) => {
    if (!data) {
        return null;
    }

    const { id, name } = data;
   
    return (
        <>
        {
            (!data) ? "" : (
                <>
                    <h1>{data.name}</h1>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                    <div> <button onClick={() => onDelete(id)}>Delete</button> </div>
                    <div> <button onClick={() => onUpdate(id)}>update</button> </div>
                </>
            )
        }

        </>
    )
}
export default Pokeinfo