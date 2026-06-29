import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootScreen  from './screens/BootScreen'
import WorldScreen from './screens/WorldScreen'

const SCREENS = { boot: BootScreen, world: WorldScreen }

const variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1,   transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, scale: 1.02, transition: { duration: 0.2,  ease: [0.4, 0, 0.2, 1] } },
}

export default function App() {
  const [screen, setScreen] = useState('boot')
  const navigate = useCallback((to) => { if (SCREENS[to]) setScreen(to) }, [])
  const Screen = SCREENS[screen]
  return (
    <div className="app">
      <AnimatePresence mode="wait">
        <motion.div key={screen} className="screen-wrapper" variants={variants} initial="initial" animate="animate" exit="exit">
          <Screen navigate={navigate} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
