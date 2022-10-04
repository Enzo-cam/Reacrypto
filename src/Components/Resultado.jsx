import styled from "@emotion/styled"

const Contenedor = styled.div`
    display: flex;
    color: white;
    font-family: 'Lato', sans-serif;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
`

const Imagen = styled.img`
    display: block;
    width: 8.7rem;
`

const Texto = styled.p`
    font-size: 1.2rem;
    span{
        font-weight: 500;
    }
`

const Precio = styled.p`
    font-size: 1.6rem;
    span{
        font-weight: 700;
    }
`

const Resultado = ({result}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result;
    
    return (
        <Contenedor>
            <Imagen 
                src={`https://cryptocompare.com/${IMAGEURL}`} 
                alt="ImagenCrypto"
            />

            <div>
                <Precio>Price: <span>{PRICE}</span></Precio>
                <Texto>Highest price of the day: <span>{HIGHDAY}</span></Texto>
                <Texto>Lowest Price of the day: <span>{LOWDAY}</span></Texto>
                <Texto>Variation last 24hs: <span>{CHANGEPCT24HOUR}%</span></Texto>
                <Texto>Last actualization: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Contenedor>
    )
}

export default Resultado