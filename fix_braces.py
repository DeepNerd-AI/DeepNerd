import os
import re

files_to_fix = [
    "app/ide/page.tsx",
    "app/agents/page.tsx",
    "app/changelog/page.tsx"
]

def fix_braces(content):
    # We want to replace { and } with {"{"} and {"}"}
    # BUT only if they are not already part of {"{"} or style={{...}}
    # or inside {user ? ...} which is part of the template.
    # Actually, the template has {NAVBAR} and {CONTENT}.
    # We only need to fix the CONTENT part.
    # So let's just find the content between the first <main> and </main> (or similar)
    pass

for file in files_to_fix:
    with open(file, 'r') as f:
        content = f.read()

    # The issue is mainly around code blocks and some text.
    # We can replace { with {"{"} and } with {"}"} inside <pre>...</pre> or <div class="font-mono...">...</div>
    # Actually, let's just use regex to replace all bare { and } that are surrounded by spaces or newlines or letters.
    # A safe regex for bare { that should be text:
    # Not preceded by =, {, }, $, or any JSX syntax.
    
    # Let's just fix the known rust code blocks and JSON blocks.
    # In ide/page.tsx, there's `Result<(), EngineError> {`
    # In agents/page.tsx, there's `payload: {`
    # We can use a simpler approach: 
    # Just look for all '{' and '}' that are not part of known React patterns.
    
    # We will replace all { with {"{"} and } with {"}"} in the main content area, 
    # EXCEPT for style={{...}} which we introduced.
    
    # First, temporarily replace style={{...}} with a placeholder
    styles = []
    def save_style(m):
        styles.append(m.group(0))
        return f"__STYLE_{len(styles)-1}__"
    content = re.sub(r'style=\{\{.*?\}\}', save_style, content)
    
    # Also temporarily replace the Navbar and Footer React insertions
    react_code = []
    def save_react(m):
        react_code.append(m.group(0))
        return f"__REACT_{len(react_code)-1}__"
    
    # save the top part (imports and component start)
    top_match = re.search(r'^(.*?<main[^>]*>)', content, re.DOTALL)
    if top_match:
        content = content.replace(top_match.group(1), save_react(top_match))
        
    bottom_match = re.search(r'(</main>.*)$', content, re.DOTALL)
    if bottom_match:
        content = content.replace(bottom_match.group(1), save_react(bottom_match))

    # Now in the remaining content, we can safely replace all { and }
    content = content.replace('{', '{"{"}')
    content = content.replace('}', '{"}"}')
    
    # Restore styles
    for i, style in enumerate(styles):
        content = content.replace(f"__STYLE_{i}__", style)
        
    # Restore react code
    for i, react in enumerate(react_code):
        content = content.replace(f"__REACT_{i}__", react)
        
    with open(file, 'w') as f:
        f.write(content)
    print(f"Fixed {file}")
