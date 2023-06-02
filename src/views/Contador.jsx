import React, { useState } from 'react';

const Contador = () => {
    // variables
    const [nombre, setNombre] = React.useState("Cristian")
    const [contador, setContador] = useState(0)

    // funciones o metodos
    const cambiarNombre = () => {
        setNombre("Pedro")
    }
    const aumentar = (val) => {
        setContador(val)
    }


    return (
        <>
            <h1>{nombre}</h1>
            <p>Hola</p>
            <button onClick={() => cambiarNombre()}>Cambiar Nombre</button>
            <hr />
            <button onClick={() => aumentar(contador + 1)}>+</button>
            <h2>{contador}</h2>
            <button onClick={() => {
                setContador(contador - 1)
            }}>-</button>
        </>
    );
}

export default Contador;