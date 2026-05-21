'use client'

import { motion } from 'framer-motion'

const shapes = [
  { type: 'circle', size: 80, x: '10%', y: '20%', color: '#3B82F6', delay: 0 },
  { type: 'ring', size: 120, x: '80%', y: '15%', color: '#22D3EE', delay: 1 },
  { type: 'circle', size: 50, x: '70%', y: '70%', color: '#818CF8', delay: 2 },
  { type: 'ring', size: 60, x: '20%', y: '75%', color: '#3B82F6', delay: 0.5 },
  { type: 'circle', size: 35, x: '50%', y: '85%', color: '#22D3EE', delay: 1.5 },
  { type: 'ring', size: 90, x: '5%', y: '60%', color: '#818CF8', delay: 2.5 },
]

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          {shape.type === 'circle' ? (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                background: shape.color,
                opacity: 0.08,
              }}
            />
          ) : (
            <div
              style={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                border: `2px solid ${shape.color}`,
                opacity: 0.10,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
