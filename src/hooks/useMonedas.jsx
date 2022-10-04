import React from 'react'
import styled from '@emotion/styled'
import { useState } from 'react'

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    margin: 12px 0;
`

const Select = styled.select`
    width: 100%;
    font-size: 1.2rem;
    padding: 8px;
    margin: 8px 0;
    border-radius: 5px;
`

const useMonedas = (text, opciones) => {
    const [moneda, setMoneda] = useState('') //Se puede usar hooks dentro de otros hooks.


    // Con () indicamos que haremos un RETURN de React.-
    const SelectMonedas = () => (
        <>
            <Label>
                {text}
                <Select
                    value={moneda}
                    onChange={e => setMoneda(e.target.value)}
                >
                    <option value="">Seleccione una moneda</option>
                    {opciones.map(opcion => (
                        <option
                            key={opcion.id}
                            value={opcion.id}
                        >
                            {opcion.nombre}
                        </option>
                    ))}
                </Select>
            </Label>
        </>
    )

    return [SelectMonedas, moneda] //Simepre que vayamos a crear un Custom HOOKS, se debe retornar.-
}

export default useMonedas