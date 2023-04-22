import React, { useEffect, useState } from "react";
import check from '../assets/images/checkmark.png'
import redx from '../assets/images/redx.png'
import { motion, AnimatePresence } from "framer-motion"

export const Message = (props) => {
  // Creates a small message at the top of the screen to tell the user if they were correct.
  const { isCorrect, isMounted, testMessage = false } = props
  const [message, setMessage] = useState()
  const [isCorrectSymbol, setIsCorrectSymbol] = useState()

  useEffect(() => {
    if(testMessage) { // this is just for testing purposes
      if (isCorrect){ 
        setMessage('right')
      } else { 
        setMessage('wrong')
      }
    } else {
    const correctMessages = ['Nice!', 'You got one!', 'Right on!', 'That\'s right!', 'You found one!', 'Good Work!', 'Perfect!']
    const incorrectMessages = ['Nope!', 'Try again!', 'Not there!', 'Not this time!', 'Not quite!', 'Keep Trying!']
    const generateMessage = (isCorrect) => {
      if (isCorrect) { // If guess is correct, pull a message saying they got it right and set image to green check
        setIsCorrectSymbol(check)
        return correctMessages[Math.floor(Math.random() * correctMessages.length)] 
      } else { // Else tell them they got it wrong and set image to red x
        setIsCorrectSymbol(redx)
        return incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]
      }
    }
    setMessage(generateMessage(isCorrect))
    }
  }, [isCorrect, testMessage])
  
  return (
    <div className="message-container">
      {/* 
      Framer motion causes issues with testing so this will have to be kept in 
      sync with the other JSX below in order to maintain test accuracy.
      */}
      {
      testMessage ? 
      <div>
      { isMounted && 
        <div className={`message`}>
          <div className="message-content">
            <img src={isCorrectSymbol} alt={isCorrect ? 'check mark' : 'red X'} className="message-image"/>
            <p>{message}</p>
          </div>
        </div>
      }
    </div>
    :
    <AnimatePresence>
      { isMounted && 
        <motion.div // Framer motion is use to animate the message translating down from the top of the screen then back up.
        className={`message`}
        initial={{ y: -39 }}
        whileInView={{ y: 30 }}
        exit={{ y: -39 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
          <div className="message-content">
            <img src={isCorrectSymbol} alt={isCorrect ? 'check mark' : 'red X'} className="message-image"/>
            <p>{message}</p>
          </div>
        </motion.div>
      }
    </AnimatePresence>
      }
    </div>
  )
}