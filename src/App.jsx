import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import './index.css'
import imgCrypto from './img/imagen-criptos.png'
import Formulario from './Components/Formulario'
import Resultado from './Components/Resultado'
import Spinner from './Components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family : 'Lato', sans-serif;
  color : #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 2rem;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {
  const [monedas, setMonedas] = useState({})
  const [result, setResult] = useState({})
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const {moneda, cryptomoneda} = monedas;
      const cotizarCrypto = async() => {
        setLoading(true)
        setResult({})
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`

        const resp = await fetch(url)
        const result = await resp.json()

        setResult(result.DISPLAY[cryptomoneda][moneda])
        setLoading(false)
      }

      cotizarCrypto()
    }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen 
        src={imgCrypto}
        alt='Imagen de cryptos'
      />
      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        {loading && <Spinner/>}
        {result.PRICE && <Resultado
          result={result}
        />} 

      </div>
    </Contenedor>
  )
}

export default App
