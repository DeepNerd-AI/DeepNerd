import re

with open("components/quote-section.tsx", "r") as f:
    content = f.read()

# Make the quote section have less strict styles preventing normal scrolling if it was causing issues.
# Oh, it's using an infinite layout animation.
old_anim = """{/* Background scanner line effect */}
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20 shadow-[0_0_20px_2px_rgba(255,255,255,0.4)] animate-[scan_3s_ease-in-out_infinite_alternate]" style={{animation: "scan 4s linear infinite alternate", transform: "translateX(0)"}}>
              <style>{`
                @keyframes scan {
                  0% { transform: translateX(-100px); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(500px); opacity: 0; }
                }
              `}</style>
            </div>"""

new_anim = """{/* Background scanner line effect */}
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20 shadow-[0_0_20px_2px_rgba(255,255,255,0.4)]" style={{animation: "scan 4s linear infinite alternate", willChange: "transform"}}>
              <style>{`
                @keyframes scan {
                  0% { transform: translateX(-100px); opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { transform: translateX(500px); opacity: 0; }
                }
              `}</style>
            </div>"""

if old_anim in content:
    content = content.replace(old_anim, new_anim)
    with open("components/quote-section.tsx", "w") as f:
        f.write(content)
    print("Fixed quote section performance!")
else:
    print("Could not find old anim.")

