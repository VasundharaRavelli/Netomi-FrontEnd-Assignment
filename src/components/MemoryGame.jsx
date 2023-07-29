import { useEffect, useState } from "react"
import { images } from "../data/data"

function MemoryGame() {
    const BLANK_CARD = "https://i.pinimg.com/474x/42/fb/5d/42fb5d2e8bb319ff087297baa04bf631.jpg"
    const [imagesArray, setImagesArray] = useState([])
    const [cardsChosen, setCardsChosen] = useState([])
    const [cardsChosenIds, setCardsChosenIds] = useState([])
    const [points, setPoints] = useState(0)

    const [openCards, setOpenCards] = useState([])

    function createCardBoard() {
        const imagesGenerated = images?.concat(...images)
        console.log(imagesGenerated)
        const shuffledArray = shuffleArray(imagesGenerated)
        setImagesArray(shuffledArray)
    }

    function flipImage(image, index) {
        // CHECK IF IMAGE IS SELECTED
        console.log(image, index)

        if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
            return
        }

        // Check if 
        if (cardsChosen?.length < 2) {

            setCardsChosen(cardsChosen => cardsChosen?.concat(image))
            setCardsChosenIds(cardsChosenIds => cardsChosenIds?.concat(index))

            if (cardsChosen?.length === 1) {
                // Check if images are the same
                if (cardsChosen[0] === image) {
                    setPoints(points => points + 2)
                    setOpenCards(openCards => openCards?.concat([cardsChosen[0], image]))
                }
                setTimeout(() => {
                    setCardsChosenIds([])
                    setCardsChosen([])
                }, 700)
                
            } 
        }
    }

    function isCardChosen(image, index) {
        return cardsChosenIds?.includes(index) || openCards?.includes(image)
    }


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        console.log(array)
        return array
    }

    function startOver() {
        setCardsChosenIds([])
        setCardsChosen([])
        setPoints(0)
        setOpenCards([])
    }

    useEffect(() => {
        createCardBoard()
    }, [])

    return (
        <div>
            <h2 className="text-center"> Find The Match</h2>
            <h3 className="text-center">Points: {points}</h3>
            <button type="button" 
      className="border border-gray-800 px-4 py-2 rounded uppercase" onClick={startOver}>Start over</button>
            <div className="row no-gutters">
                {imagesArray?.map((image, index) => {
                    return (
                        <div className="col-4 col-lg-2 p-2" key={index} onClick={() => flipImage(image, index)}>
                            <img src={isCardChosen(image, index) ? image : BLANK_CARD} alt="" className={`img-fluid img-fixed`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default MemoryGame
