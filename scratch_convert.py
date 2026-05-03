import re

with open('code.html', 'r') as f:
    content = f.read()

# Extract body
body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
if not body_match:
    print("Could not find body")
    exit(1)

body_content = body_match.group(1)

# Convert class to className
body_content = body_content.replace('class="', 'className="')

# Convert stroke-dasharray to strokeDasharray
body_content = body_content.replace('stroke-dasharray="', 'strokeDasharray="')

# Close tags
for tag in ['br', 'hr', 'input', 'img', 'circle', 'line', 'path']:
    body_content = re.sub(rf'<{tag}([^>]*)>', lambda m: f'<{tag}{m.group(1)}' + ('/' if not m.group(1).endswith('/') else '') + '>', body_content)

# Fix style strings (only simple ones used: style="background-color: #050505;")
body_content = body_content.replace('style="background-color: #050505;"', "style={{ backgroundColor: '#050505' }}")

jsx = f"""import {{ SmoothScroll }} from "@/components/smooth-scroll"

export default function Page() {{
  return (
    <SmoothScroll>
      <div className="bg-background text-on-background font-body-lg text-body-lg antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
        {{/* converted content */}}
        {body_content}
      </div>
    </SmoothScroll>
  )
}}
"""

with open('app/page.tsx', 'w') as f:
    f.write(jsx)

print("Converted successfully")
