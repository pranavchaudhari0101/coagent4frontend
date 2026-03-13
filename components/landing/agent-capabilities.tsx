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
  },
  {
    icon: ListChecks,
    title: "Manage Commitments",
    description: "Create and organize events, meetings, and time blocks through natural language commands.",
  },
  {
    icon: AlertCircle,
    title: "Detect Conflicts",
    description: "Automatic conflict detection across all your commitments. Never double-book or miss overlaps.",
  },
  {
    icon: Users,
    title: "Coordinate With Other Agents",
    description: "Your agent communicates with other users' agents to find common availability automatically.",
  },
  {
    icon: CheckSquare,
    title: "Request Human Approval",
    description: "Every coordination proposal requires your explicit approval before any action is taken.",
  },
  {
    icon: History,
    title: "Maintain History",
    description: "Full coordination history and audit logs. Track every agent interaction and decision.",
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
      {/* Card content */}
      <motion.div
        className="relative h-full p-8 rounded-3xl border-2 border-foreground/10 dark:border-foreground/10 bg-foreground/[0.03] dark:bg-foreground/[0.05] overflow-hidden"
        whileHover={{ 
          y: -6,
          borderColor: "hsl(var(--foreground) / 0.25)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background hover effect */}
        <motion.div
          className="absolute inset-0 bg-foreground/[0.03] dark:bg-foreground/[0.05]"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.05) 45%, hsl(var(--foreground) / 0.08) 50%, hsl(var(--foreground) / 0.05) 55%, transparent 60%)",
          }}
          animate={isHovered ? {
            x: ["-100%", "200%"],
            opacity: [0, 1, 0],
          } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon container */}
          <motion.div 
            className="relative w-14 h-14 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border-2 border-foreground/15 bg-foreground/[0.05] dark:bg-foreground/10"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <capability.icon className="relative w-6 h-6 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
          </motion.div>
          
          {/* Title with underline animation */}
          <div className="relative mb-4">
            <h3 className="text-xl font-semibold text-foreground">
              {capability.title}
            </h3>
            <motion.div
              className="absolute -bottom-1 left-0 h-[2px] bg-foreground"
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
            className="flex items-center gap-2 text-sm font-medium text-foreground/70"
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
        
        {/* Corner accent - subtle */}
        <motion.div
          className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-foreground/5 blur-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
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
