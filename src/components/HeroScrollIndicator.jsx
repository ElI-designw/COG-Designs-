'use client'

import { motion } from 'framer-motion'

export default function HeroScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="font-montserrat text-xs text-text-secondary uppercase tracking-widest">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-5 h-8 border border-text-secondary/40 rounded-full flex items-start justify-center p-1"
      >
        <div className="w-1 h-2 bg-accent-purple rounded-full" style={{background:'#3B82F6'}} />
      </motion.div>
    </div>
  )
}
