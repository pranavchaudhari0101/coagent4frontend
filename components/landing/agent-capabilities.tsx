"use client"

import { Calendar, ListChecks, AlertCircle, CheckSquare, Users, History } from "lucide-react"
import { motion } from "framer-motion"
import { useScrollAnimation, fadeSlideUpVariants, staggerContainerVariants, itemVariants } from "@/hooks/use-framer-animations"

const capabilities = [
  {
    icon: Calendar,
    title: "View My Schedule",
    description: "Access your calendar instantly from Google Calendar.",
    number: "01",
  },
  {
    icon: ListChecks,
    title: "Manage Commitments",
    description: "Create events and time blocks via natural language.",
    number: "02",
  },
  {
    icon: AlertCircle,
    title: "Detect Conflicts",
    description: "Automatic conflict detection. Never double-book.",
    number: "03",
  },
  {
    icon: Users,
    title: "Coordinate Agents",
    description: "Find common availability with other users automatically.",
    number: "04",
  },
  {
    icon: CheckSquare,
    title: "Human Approval",
    description: "Every proposal requires your explicit approval.",
    number: "05",
  },
  {
    icon: History,
    title: "Maintain History",
    description: "Full audit logs. Track every interaction.",
    number: "06",
  },
]

function CapabilityCard({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  return (
    <motion.div
      className="group relative"
      variants={itemVariants}
    >
      <motion.div
        className="relative h-full p-6 rounded-xl bg-foreground/[0.02] dark:bg-foreground/[0.04] border border-foreground/[0.08] hover:border-foreground/20 hover:bg-foreground/[0.04] dark:hover:bg-foreground/[0.08] transition-all duration-300"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Number badge */}
        <span className="absolute top-4 right-4 text-xs font-mono text-foreground/30 group-hover:text-foreground/50 transition-colors">
          {capability.number}
        </span>
        
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-foreground/[0.06] dark:bg-foreground/10 flex items-center justify-center mb-4 group-hover:bg-foreground/10 dark:group-hover:bg-foreground/15 transition-colors">
          <capability.icon className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
        </div>
        
        {/* Title */}
        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
          {capability.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {capability.description}
        </p>
        
        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 rounded-b-xl" />
      </motion.div>
    </motion.div>
  )
}

export function AgentCapabilities() {
  const { ref: sectionRef, isInView } = useScrollAnimation()

  return (
    <section id="capabilities" className="min-h-screen flex items-center py-16 lg:py-20" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-6 w-full">
        {/* Section header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
          variants={fadeSlideUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="max-w-2xl">
            <motion.p 
              className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Capabilities
            </motion.p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
              Your agent, your rules
            </h2>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md lg:text-right">
            Each user receives a personal agent that can perform these core actions on your behalf.
          </p>
        </motion.div>

        {/* Divider line */}
        <motion.div 
          className="h-px bg-foreground/10 mb-10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Capability cards */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
