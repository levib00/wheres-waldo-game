import React, { useEffect, useState } from "react";
import check from '../assets/images/checkmark.png'
import redx from '../assets/images/redx.png'
import { motion, AnimatePresence } from "framer-motion"

export const Message = (props) => {
  // 
  const { isCorrect, isMounted, testMessage = false } = props
  const [message, setMessage] = useState()
  const [isCorrectSymbol, setIsCorrectSymbol] = useState()

  useEffect(() => {
    console.log(testMessage)
    if(testMessage) {
      if (isCorrect){ 
        setMessage('right')
      } else { 
        setMessage('wrong')
      }
    } else {
    const correctMessages = ['Nice!', 'You got one!', 'Right on!', 'That\'s right!', 'You found one!', 'Good Work!', 'Perfect!']
    const incorrectMessages = ['Nope!', 'Try again!', 'Not there!', 'Not this time!', 'Not quite!', 'Keep Trying!']
    const generateMessage = (isCorrect) => {
      if (isCorrect) {
        return correctMessages[Math.floor(Math.random() * correctMessages.length)]
      } else {
        return incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]
      }
    }
    setMessage(generateMessage(isCorrect))
    }
    setIsCorrectSymbol(isCorrect ? check : redx)
    
  }, [isCorrect])
  
  return (
    <div>
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
        <motion.div
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