"use client"

import { Calendar, ListChecks, AlertCircle, CheckSquare, Users, History, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useScrollAnimation, fadeSlideUpVariants, staggerContainerVariants, itemVariants } from "@/hooks/use-framer-animations"
import { useState } from "react"

const capabilities = [
  {
    icon: Calendar,
    title: "View My Schedule",
    description: "Access your calendar instantly. Your agent retrieves commitments directly from Google Calendar.",
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    iconGradient: "from-blue-400 to-cyan-400",
    glowColor: "blue",
  },
  {
    icon: ListChecks,
    title: "Manage Commitments",
    description: "Create and organize events, meetings, and time blocks through natural language commands.",
    gradient: "from-emerald-500/20 via-green-500/20 to-teal-500/20",
    iconGradient: "from-emerald-400 to-green-400",
    glowColor: "emerald",
  },
  {
    icon: AlertCircle,
    title: "Detect Conflicts",
    description: "Automatic conflict detection across all your commitments. Never double-book or miss overlaps.",
    gradient: "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
    iconGradient: "from-amber-400 to-orange-400",
    glowColor: "amber",
  },
  {
    icon: Users,
    title: "Coordinate With Other Agents",
    description: "Your agent communicates with other users' agents to find common availability automatically.",
    gradient: "from-indigo-500/20 via-blue-500/20 to-violet-500/20",
    iconGradient: "from-indigo-400 to-blue-400",
    glowColor: "indigo",
  },
  {
    icon: CheckSquare,
    title: "Request Human Approval",
    description: "Every coordination proposal requires your explicit approval before any action is taken.",
    gradient: "from-rose-500/20 via-pink-500/20 to-red-500/20",
    iconGradient: "from-rose-400 to-pink-400",
    glowColor: "rose",
  },
  {
    icon: History,
    title: "Maintain History",
    description: "Full coordination history and audit logs. Track every agent interaction and decision.",
    gradient: "from-slate-500/20 via-gray-500/20 to-zinc-500/20",
    iconGradient: "from-slate-400 to-gray-400",
    glowColor: "slate",
  },
]

function CapabilityCard({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="group relative"
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <motion.div
        className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${capability.gradient} opacity-0 blur-sm transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${capability.gradient} opacity-0 blur-2xl transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
      />
      
      {/* Card content */}
      <motion.div
        className="relative h-full p-8 rounded-3xl border border-border/40 bg-card/80 backdrop-blur-sm overflow-hidden"
        whileHover={{ 
          y: -8,
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
          }}
          animate={isHovered ? {
            x: ["-100%", "200%"],
            opacity: [0, 1, 0],
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon container with animated background */}
          <motion.div 
            className="relative w-14 h-14 rounded-2xl mb-6 flex items-center justify-center overflow-hidden"
            animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${capability.iconGradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
            <div className="absolute inset-0 bg-muted/80" />
            
            {/* Rotating ring on hover */}
            <motion.div
              className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
              style={{
                background: `linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, ${capability.glowColor === 'blue' ? '#3b82f6' : capability.glowColor === 'emerald' ? '#10b981' : capability.glowColor === 'amber' ? '#f59e0b' : capability.glowColor === 'indigo' ? '#6366f1' : capability.glowColor === 'rose' ? '#f43f5e' : '#64748b'}, transparent) border-box`,
              }}
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            />
            
            <capability.icon className="relative w-7 h-7 text-foreground/70 group-hover:text-foreground transition-colors duration-300" />
          </motion.div>
          
          {/* Title with underline animation */}
          <div className="relative mb-4">
            <h3 className="text-xl font-semibold text-foreground">
              {capability.title}
            </h3>
            <motion.div
              className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r ${capability.iconGradient}`}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            {capability.description}
          </p>
          
          {/* Learn more link - appears on hover */}
          <motion.div
            className="flex items-center gap-2 text-sm font-medium text-foreground/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <span>Learn more</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Corner accent */}
        <motion.div
          className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${capability.iconGradient} opacity-0 blur-2xl`}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function AgentCapabilities() {
  const { ref: sectionRef, isInView } = useScrollAnimation()

  return (
    <section id="capabilities" className="py-32 lg:py-40" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div 
          className="max-w-3xl mb-20"
          variants={fadeSlideUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p 
            className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Capabilities
          </motion.p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-8 leading-[1.1]">
            Your agent, your rules
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            Each user receives a personal agent that can perform these core actions on your behalf.
          </p>
        </motion.div>

        {/* Capability cards */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
