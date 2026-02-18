'use client'

import { motion } from 'framer-motion'

export function FilmDoodleSection() {
    return (
        <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-gradient-to-b from-amber-50/30 to-background">

            {/* Animated floating film reels */}
            <motion.div
                className="absolute top-10 left-10 w-32 h-32 opacity-15"
                animate={{
                    rotate: 360,
                    y: [0, -20, 0]
                }}
                transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-amber-700">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                        const x = 100 + 65 * Math.cos((angle * Math.PI) / 180);
                        const y = 100 + 65 * Math.sin((angle * Math.PI) / 180);
                        return <circle key={i} cx={x} cy={y} r="12" fill="currentColor" />;
                    })}
                </svg>
            </motion.div>

            {/* Animated camera with lens zoom effect */}
            <motion.div
                className="absolute top-20 right-16 w-36 h-36 opacity-15"
                animate={{
                    scale: [1, 1.1, 1],
                    y: [0, -15, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-blue-700">
                    <rect x="20" y="60" width="120" height="90" rx="8" fill="none" stroke="currentColor" strokeWidth="5" />
                    <motion.circle
                        cx="80" cy="105" r="35"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        animate={{ r: [35, 40, 35] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="80" cy="105" r="20"
                        fill="currentColor"
                        opacity="0.3"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <path d="M140 90 L180 70 L180 140 L140 120 Z" fill="currentColor" />
                    <rect x="40" y="40" width="40" height="16" rx="4" fill="currentColor" />
                </svg>
            </motion.div>

            {/* Animated clapperboard with clapping motion */}
            <motion.div
                className="absolute bottom-24 left-20 w-28 h-28 opacity-15"
                animate={{
                    rotate: [-5, 5, -5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-purple-700">
                    <motion.path
                        d="M30 70 L170 70 L150 30 L50 30 Z"
                        fill="currentColor"
                        animate={{ d: ["M30 70 L170 70 L150 30 L50 30 Z", "M30 70 L170 70 L155 40 L45 40 Z", "M30 70 L170 70 L150 30 L50 30 Z"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <line x1="70" y1="30" x2="60" y2="70" stroke="white" strokeWidth="6" />
                    <line x1="100" y1="30" x2="90" y2="70" stroke="white" strokeWidth="6" />
                    <line x1="130" y1="30" x2="120" y2="70" stroke="white" strokeWidth="6" />
                    <rect x="30" y="70" width="140" height="100" rx="6" fill="none" stroke="currentColor" strokeWidth="5" />
                </svg>
            </motion.div>

            {/* Animated film strip moving */}
            <motion.div
                className="absolute bottom-16 right-12 w-24 h-40 opacity-15"
                animate={{
                    y: [0, -30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 100 200" className="w-full h-full text-red-700">
                    <rect x="10" y="0" width="80" height="200" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    {[20, 50, 80, 110, 140, 170].map((y, i) => (
                        <motion.rect
                            key={i}
                            x="15"
                            y={y}
                            width="70"
                            height="20"
                            fill="currentColor"
                            opacity="0.3"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />
                    ))}
                    {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190].map((y, i) => (
                        <g key={i}>
                            <circle cx="15" cy={y} r="3" fill="currentColor" />
                            <circle cx="85" cy={y} r="3" fill="currentColor" />
                        </g>
                    ))}
                </svg>
            </motion.div>

            {/* Floating stars with twinkling effect */}
            {[
                { top: '15%', left: '30%', delay: 0, size: 16 },
                { top: '25%', right: '25%', delay: 0.5, size: 20 },
                { top: '70%', left: '15%', delay: 1, size: 18 },
                { top: '60%', right: '30%', delay: 1.5, size: 16 },
                { top: '40%', left: '50%', delay: 2, size: 14 },
            ].map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-20"
                    style={{ top: star.top, left: star.left, right: star.right }}
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: star.delay
                    }}
                >
                    <svg width={star.size} height={star.size} viewBox="0 0 24 24" className="text-yellow-600">
                        <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 L12 2 Z" fill="currentColor" />
                    </svg>
                </motion.div>
            ))}

            {/* Orbiting sparkles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-3 h-3"
                        style={{ originX: 0.5, originY: 0.5 }}
                        animate={{
                            rotate: [angle, angle + 360],
                            x: [
                                Math.cos((angle * Math.PI) / 180) * 120,
                                Math.cos(((angle + 360) * Math.PI) / 180) * 120
                            ],
                            y: [
                                Math.sin((angle * Math.PI) / 180) * 120,
                                Math.sin(((angle + 360) * Math.PI) / 180) * 120
                            ]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5
                        }}
                    >
                        <motion.div
                            className="w-3 h-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-30"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Pulsing light rays */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5"
                animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full text-amber-600">
                    {[0, 45, 90, 135].map((angle, i) => (
                        <motion.line
                            key={i}
                            x1="100"
                            y1="100"
                            x2={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                            y2={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                            stroke="currentColor"
                            strokeWidth="2"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                        />
                    ))}
                </svg>
            </motion.div>

        </section>
    )
}
