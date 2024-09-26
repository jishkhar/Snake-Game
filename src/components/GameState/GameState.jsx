import React, { useEffect, useState } from 'react'
import GamePieces from '../GamePieces/GamePieces'

const GameState = () => {
    const [score, setScore] = useState(0) 
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore')) || 0)
    const [gameOver, setGameOver] = useState(false)
    const [collision, setCollisionType] = useState("")


    const handleGameover = (type) => {
        setGameOver(true)

        if(score > highScore){
            setHighScore(score)
            localStorage.setItem("highScore", score.toString())
        }

        setCollisionType(type)
    }

    const handleResetGame = () => {
        setScore(0)
        setGameOver(false)
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            if(gameOver && e.key == "Enter"){
                handleResetGame()
            }
        }

        window.addEventListener("keydown", handleKeyPress)
    }, [gameOver])

  return (
    <>
        <p className='text-4xl my-4'>Score : {score}</p>
        <p className='text-4xl mb-20'>High Score : {highScore}</p>
        {
            gameOver && (
                <div>
                    <p className='text-3xl my-4'>Game Over!! {collision === "wall" ? "You Hit the Wall" : "You Ate Youself" }</p>
                    <p className='text-3xl my-4'>Please press ENTER to reset the game</p>
                </div>
            )
        }
        {
            !gameOver && (
                <GamePieces score={score} setScore={setScore} onGameOver={(type)=>handleGameover(type)} />
            )
        }
    </>
  )
}

export default GameState