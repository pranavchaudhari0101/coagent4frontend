"use client"

import { ArrowRight, Bot, CheckCircle2, User, Calendar } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Session storage key to track if animation has played
const ANIMATION_PLAYED_KEY = "coordination-animation-played"

export function CoordinationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Check if animation has already played this session
    const hasPlayed = sessionStorage.getItem(ANIMATION_PLAYED_KEY) === "true"
    
    if (hasPlayed) {
      // If already played, show everything immediately
      setAnimationComplete(true)
      const flowItems = flowRef.current?.querySelectorAll(".flow-item")
      const connectorWrappers = flowRef.current?.querySelectorAll(".connector-wrapper")
      const lightDots = flowRef.current?.querySelectorAll(".light-dot")
      const stepCards = stepsRef.current?.querySelectorAll(".step-card")
      const iconContainers = flowRef.current?.querySelectorAll(".icon-container")
      
      flowItems?.forEach(item => gsap.set(item, { opacity: 1, scale: 1 }))
      iconContainers?.forEach(icon => gsap.set(icon, { boxShadow: "none" }))
      connectorWrappers?.forEach(wrapper => {
        const line = wrapper.querySelector(".connector-line")
        if (line) gsap.set(line, { scaleX: 1 })
      })
      lightDots?.forEach(dot => gsap.set(dot, { opacity: 0 }))
      stepCards?.forEach(card => gsap.set(card, { opacity: 1, y: 0 }))
      gsap.set(headerRef.current, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      )

      // Sequential flow animation
      const flowItems = flowRef.current?.querySelectorAll(".flow-item")
      const connectorWrappers = flowRef.current?.querySelectorAll(".connector-wrapper")
      const stepCards = stepsRef.current?.querySelectorAll(".step-card")
      
      if (flowItems && connectorWrappers) {
        // Create main timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: flowRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            setAnimationComplete(true)
            sessionStorage.setItem(ANIMATION_PLAYED_KEY, "true")
          }
        })

        // Set initial state
        gsap.set(flowItems, { opacity: 0.2, scale: 0.85 })
        connectorWrappers.forEach(wrapper => {
          const line = wrapper.querySelector(".connector-line")
          const dot = wrapper.querySelector(".light-dot")
          if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" })
          if (dot) gsap.set(dot, { left: "0%", opacity: 0 })
        })
        gsap.set(stepCards, { opacity: 0, y: 30 })

        // Animate each flow item sequentially
        flowItems.forEach((item, index) => {
          const iconContainer = item.querySelector(".icon-container")
          
          // Zoom in current item with glow
          tl.to(item, {
            opacity: 1,
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out",
          })
          
          // Add glow to icon
          if (iconContainer) {
            tl.to(iconContainer, {
              boxShadow: "0 0 20px 5px hsl(var(--foreground) / 0.3)",
              duration: 0.3,
              ease: "power2.out",
            }, "<")
          }
          
          // Hold briefly
          tl.to({}, { duration: 0.3 })
          
          // Scale back to normal and remove glow
          tl.to(item, {
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
          })
          
          if (iconContainer) {
            tl.to(iconContainer, {
              boxShadow: "0 0 0px 0px hsl(var(--foreground) / 0)",
              duration: 0.3,
              ease: "power2.inOut",
            }, "<")
          }

          // Animate light traveling to next item (if not last item)
          if (index < flowItems.length - 1 && connectorWrappers[index]) {
            const wrapper = connectorWrappers[index]
            const line = wrapper.querySelector(".connector-line")
            const dot = wrapper.querySelector(".light-dot")
            
            // Show and animate the light dot traveling
            if (dot) {
              tl.set(dot, { opacity: 1, left: "0%" })
              tl.to(dot, {
                left: "100%",
                duration: 0.4,
                ease: "power1.inOut",
              })
            }
            
            // Animate the line filling in behind the dot
            if (line) {
              tl.to(line, {
                scaleX: 1,
                duration: 0.4,
                ease: "power1.inOut",
              }, "<")
            }
            
            // Fade out the dot at the end
            if (dot) {
              tl.to(dot, {
                opacity: 0,
                duration: 0.15,
              }, "-=0.1")
            }
          }
        })

        // After flow completes, reveal step cards with stagger
        tl.to(stepCards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        }, "+=0.2")
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div ref={headerRef} className="max-w-2xl mx-auto text-center mb-16 opacity-0">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Agent Coordination Visualization
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Agents coordinate so you don&apos;t have to
          </h2>
          <p className="text-muted-foreground text-lg">
            Personal agents collaborate through a coordination network, eliminating manual back-and-forth communication.
          </p>
        </div>

        {/* Coordination flow visual */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border/60 bg-card p-6 lg:p-10">
            {/* Mental model text */}
            <p className="text-center text-sm text-muted-foreground mb-8">
              Human → Personal Agent → Agent Coordination Network → Coordinated Outcome
            </p>

            {/* Flow diagram */}
            <div ref={flowRef} className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
              {/* User A */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 border border-border transition-shadow">
                  <User className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">User A</span>
                <span className="text-xs text-muted-foreground">Invokes agent</span>
              </div>

              {/* Connector 1 */}
              <div className="connector-wrapper hidden lg:flex items-center flex-1 max-w-[50px] relative">
                <div className="connector-line h-[2px] w-full bg-foreground/40" />
                <div className="light-dot absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_4px_hsl(var(--foreground)/0.6)]" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <ArrowRight className="w-4 h-4 text-foreground/50 absolute -right-2" />
              </div>

              {/* Agent A */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 border border-border transition-shadow">
                  <Bot className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Agent A</span>
                <span className="text-xs text-muted-foreground">Parses intent</span>
              </div>

              {/* Connector 2 */}
              <div className="connector-wrapper hidden lg:flex items-center flex-1 max-w-[50px] relative">
                <div className="connector-line h-[2px] w-full bg-foreground/40" />
                <div className="light-dot absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_4px_hsl(var(--foreground)/0.6)]" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <ArrowRight className="w-4 h-4 text-foreground/50 absolute -right-2" />
              </div>

              {/* Coordination Engine */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-3 transition-shadow">
                  <span className="text-background font-bold text-base">CE</span>
                </div>
                <span className="text-sm font-medium text-foreground">Coordination</span>
                <span className="text-xs text-muted-foreground">Engine</span>
              </div>

              {/* Connector 3 */}
              <div className="connector-wrapper hidden lg:flex items-center flex-1 max-w-[50px] relative">
                <div className="connector-line h-[2px] w-full bg-foreground/40" />
                <div className="light-dot absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_4px_hsl(var(--foreground)/0.6)]" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <ArrowRight className="w-4 h-4 text-foreground/50 absolute -right-2" />
              </div>

              {/* Agent B */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 border border-border transition-shadow">
                  <Bot className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Agent B</span>
                <span className="text-xs text-muted-foreground">Checks availability</span>
              </div>

              {/* Connector 4 */}
              <div className="connector-wrapper hidden lg:flex items-center flex-1 max-w-[50px] relative">
                <div className="connector-line h-[2px] w-full bg-foreground/40" />
                <div className="light-dot absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_4px_hsl(var(--foreground)/0.6)]" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <ArrowRight className="w-4 h-4 text-foreground/50 absolute -right-2" />
              </div>

              {/* User B Approves */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mb-3 border border-foreground/20 transition-shadow">
                  <CheckCircle2 className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">User B</span>
                <span className="text-xs text-muted-foreground">Approves first</span>
              </div>

              {/* Connector 5 */}
              <div className="connector-wrapper hidden lg:flex items-center flex-1 max-w-[50px] relative">
                <div className="connector-line h-[2px] w-full bg-foreground/40" />
                <div className="light-dot absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_4px_hsl(var(--foreground)/0.6)]" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <ArrowRight className="w-4 h-4 text-foreground/50 absolute -right-2" />
              </div>

              {/* User A Confirms */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mb-3 border border-foreground/20 transition-shadow">
                  <CheckCircle2 className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">User A</span>
                <span className="text-xs text-muted-foreground">Confirms</span>
              </div>

              {/* Connector 6 */}
              <div className="connector-wrapper hidden lg:flex items-center flex-1 max-w-[50px] relative">
                <div className="connector-line h-[2px] w-full bg-foreground/40" />
                <div className="light-dot absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_4px_hsl(var(--foreground)/0.6)]" style={{ top: "50%", transform: "translateY(-50%)" }} />
                <ArrowRight className="w-4 h-4 text-foreground/50 absolute -right-2" />
              </div>

              {/* Success */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="icon-container w-14 h-14 rounded-full bg-foreground flex items-center justify-center mb-3 transition-shadow">
                  <Calendar className="w-6 h-6 text-background" />
                </div>
                <span className="text-sm font-medium text-foreground">Success</span>
                <span className="text-xs text-muted-foreground">Event created</span>
              </div>
            </div>

            {/* Description */}
            <div ref={stepsRef} className="mt-10 pt-8 border-t border-border/60">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="step-card p-4 rounded-xl opacity-0">
                  <p className="text-sm font-medium text-foreground mb-1">Step 1: Intent & Availability</p>
                  <p className="text-sm text-muted-foreground">
                    Agent A parses the request and checks User A&apos;s calendar for available time slots.
                  </p>
                </div>
                <div className="step-card p-4 rounded-xl opacity-0">
                  <p className="text-sm font-medium text-foreground mb-1">Step 2: Deterministic Matching</p>
                  <p className="text-sm text-muted-foreground">
                    Coordination Engine queries Agent B and performs deterministic matching to find common availability.
                  </p>
                </div>
                <div className="step-card p-4 rounded-xl opacity-0">
                  <p className="text-sm font-medium text-foreground mb-1">Step 3: Human Approval</p>
                  <p className="text-sm text-muted-foreground">
                    User B approves slot proposals first, then User A confirms. Events created in both calendars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
