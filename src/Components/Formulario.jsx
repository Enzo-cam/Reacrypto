import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import useMonedas from '../hooks/useMonedas'

const InputSubmit = styled.input`
    background: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.4rem;
    letter-spacing: 1px;
    transition: background-color ease .3s;

    &:hover{
        cursor: pointer;
        background-color: #7276e4;
    }
`

const Error = styled.p`
    background-color: #b7322C;
    color: white;
    padding: 15px;
    font-size: 1.4rem;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

const Formulario = ({setMonedas}) => {
    const monedas = [
        {id: 'USD', nombre:'Dolar estadounidense'},
        {id: 'ARS', nombre:'Peso argentino'},
        {id: 'EUR', nombre:'Euro'},
        {id: 'GBP', nombre:'Libra esterlina'}
    ]

    const [crypto, setCrypto] = useState([])
    const [error, setError] = useState(false)

    const [SelectMonedas, moneda] = useMonedas('Seleccione la moneda:', monedas)
    const [SelectCrypto, cryptomoneda] = useMonedas('Seleccione la crypto a cotizar:', crypto)

    useEffect(() => {
        const consultarAPI = async () =>{
            const url =  'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD'
        
            const resp = await fetch(url)
            const result = await resp.json()

            const arrCrypto = result.Data.map(crypto => {
                const obj = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName
                }

                return obj;
            })
            setCrypto(arrCrypto)
        }
        consultarAPI()
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, cryptomoneda].includes('')){
            setError(true)
            return;
        }
        setError(false)
        setMonedas({
            moneda,
            cryptomoneda
        })

    }
    
    return (
        <>
            {error  && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                
                <SelectCrypto />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                /> 
            </form>
        </>
        
    )
}

export default Formulario