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
      const arrows = flowRef.current?.querySelectorAll(".flow-arrow")
      const connectorLines = flowRef.current?.querySelectorAll(".connector-line")
      const stepCards = stepsRef.current?.querySelectorAll(".step-card")
      
      flowItems?.forEach(item => gsap.set(item, { opacity: 1, scale: 1 }))
      arrows?.forEach(arrow => gsap.set(arrow, { opacity: 1 }))
      connectorLines?.forEach(line => gsap.set(line, { scaleX: 1 }))
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
      const connectorLines = flowRef.current?.querySelectorAll(".connector-line")
      const stepCards = stepsRef.current?.querySelectorAll(".step-card")
      
      if (flowItems && connectorLines) {
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
        gsap.set(flowItems, { opacity: 0.3, scale: 0.85 })
        gsap.set(connectorLines, { scaleX: 0, transformOrigin: "left center" })
        gsap.set(stepCards, { opacity: 0, y: 30 })

        // Animate each flow item sequentially
        flowItems.forEach((item, index) => {
          // Zoom in current item
          tl.to(item, {
            opacity: 1,
            scale: 1.15,
            duration: 0.4,
            ease: "power2.out",
          })
          
          // Add a slight hold
          tl.to({}, { duration: 0.2 })
          
          // Scale back to normal
          tl.to(item, {
            scale: 1,
            duration: 0.2,
            ease: "power2.inOut",
          })

          // Animate connector line to next item (if not last item)
          if (index < flowItems.length - 1 && connectorLines[index]) {
            tl.to(connectorLines[index], {
              scaleX: 1,
              duration: 0.3,
              ease: "power2.inOut",
            }, "-=0.1")
          }
        })

        // After flow completes, reveal step cards
        tl.to(stepCards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power3.out",
        }, "+=0.3")
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
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 border border-border">
                  <User className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">User A</span>
                <span className="text-xs text-muted-foreground">Invokes agent</span>
              </div>

              {/* Connector line 1 */}
              <div className="hidden lg:flex items-center flex-1 max-w-[40px]">
                <div className="connector-line h-[2px] w-full bg-foreground/30" />
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-foreground/50 -ml-1" />

              {/* Agent A */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 border border-border">
                  <Bot className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Agent A</span>
                <span className="text-xs text-muted-foreground">Parses intent</span>
              </div>

              {/* Connector line 2 */}
              <div className="hidden lg:flex items-center flex-1 max-w-[40px]">
                <div className="connector-line h-[2px] w-full bg-foreground/30" />
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-foreground/50 -ml-1" />

              {/* Coordination Engine */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-3">
                  <span className="text-background font-bold text-base">CE</span>
                </div>
                <span className="text-sm font-medium text-foreground">Coordination</span>
                <span className="text-xs text-muted-foreground">Engine</span>
              </div>

              {/* Connector line 3 */}
              <div className="hidden lg:flex items-center flex-1 max-w-[40px]">
                <div className="connector-line h-[2px] w-full bg-foreground/30" />
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-foreground/50 -ml-1" />

              {/* Agent B */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3 border border-border">
                  <Bot className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">Agent B</span>
                <span className="text-xs text-muted-foreground">Checks availability</span>
              </div>

              {/* Connector line 4 */}
              <div className="hidden lg:flex items-center flex-1 max-w-[40px]">
                <div className="connector-line h-[2px] w-full bg-foreground/30" />
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-foreground/50 -ml-1" />

              {/* User B Approves */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mb-3 border border-foreground/20">
                  <CheckCircle2 className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">User B</span>
                <span className="text-xs text-muted-foreground">Approves first</span>
              </div>

              {/* Connector line 5 */}
              <div className="hidden lg:flex items-center flex-1 max-w-[40px]">
                <div className="connector-line h-[2px] w-full bg-foreground/30" />
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-foreground/50 -ml-1" />

              {/* User A Confirms */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-foreground/10 flex items-center justify-center mb-3 border border-foreground/20">
                  <CheckCircle2 className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">User A</span>
                <span className="text-xs text-muted-foreground">Confirms</span>
              </div>

              {/* Connector line 6 */}
              <div className="hidden lg:flex items-center flex-1 max-w-[40px]">
                <div className="connector-line h-[2px] w-full bg-foreground/30" />
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-foreground/50 -ml-1" />

              {/* Success */}
              <div className="flow-item flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center mb-3">
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
