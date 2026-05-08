#!/usr/bin/env python3
"""
Agent Skill: add-learning-hub-page

This script scaffolds a new topic page for the Learning Hub, automatically wiring it up
to the navigation, global search index, and home page topic grid.

Usage:
    python skills/add-learning-hub-page/scripts/add_page.py <Topic Name> <Description>
"""

import argparse
import os
import re
import shutil

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def update_html_template(filepath, topic_name, description, slug):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace placeholders
    content = content.replace("Topic Name – Learning Hub", f"{topic_name} – Learning Hub")
    content = content.replace('content="Description of this topic page for SEO."', f'content="{description}"')
    content = content.replace('class="page--template"', f'class="page--{slug}"')
    content = content.replace('<span class="hero__title-gradient">Topic Name</span>', f'<span class="hero__title-gradient">{topic_name}</span>')
    content = content.replace('Brief description of this topic — what it is and why it matters.', description)

    with open(filepath, 'w') as f:
        f.write(content)

def update_common_js(topic_name, filename):
    js_path = 'js/common.js'
    with open(js_path, 'r') as f:
        content = f.read()

    # Find the nav array
    target_str = "    { name: 'Saved', href: 'saved.html' }"
    new_entry = f"    {{ name: '{topic_name}', href: '{filename}' }},\n{target_str}"
    
    if target_str in content:
        content = content.replace(target_str, new_entry)
        with open(js_path, 'w') as f:
            f.write(content)
        print(f"✅ Added {topic_name} to js/common.js navigation.")
    else:
        print(f"⚠️ Could not find injection point in {js_path}")

def update_search_data(topic_name, filename):
    js_path = 'js/search-data.js'
    with open(js_path, 'r') as f:
        content = f.read()

    # Find the end of the array
    end_bracket_idx = content.rfind('];')
    if end_bracket_idx != -1:
        new_entry = f'\n  // ===== {topic_name.upper()} =====\n'
        new_entry += f'  {{ page: "{filename}", pageTitle: "{topic_name}", section: "Core Concepts", content: "Update this content to improve search visibility", href: "{filename}#sec-core-concepts" }}\n'
        
        content = content[:end_bracket_idx] + new_entry + content[end_bracket_idx:]
        with open(js_path, 'w') as f:
            f.write(content)
        print(f"✅ Added placeholder search entries to js/search-data.js.")
    else:
        print(f"⚠️ Could not find injection point in {js_path}")

def update_index_html(topic_name, description, filename, slug):
    html_path = 'index.html'
    with open(html_path, 'r') as f:
        content = f.read()

    # Find the injection point before the "Add New Topic Card"
    target_str = "          <!-- Add New Topic Card -->"
    
    if target_str in content:
        new_card = f"""          <a href="{filename}" class="card topic-card reveal">
            <h3 class="topic-card__title">{topic_name}</h3>
            <p class="topic-card__desc">
              {description}
            </p>
            <div class="topic-progress" data-page="{slug}" data-total="4">
              <div class="topic-progress-bar"><div class="topic-progress-fill"></div></div>
              <span class="topic-progress-text">0%</span>
            </div>
            <span class="topic-card__arrow">Explore {topic_name} →</span>
          </a>

{target_str}"""
        
        content = content.replace(target_str, new_card)
        with open(html_path, 'w') as f:
            f.write(content)
        print(f"✅ Added topic card to index.html.")
    else:
        print(f"⚠️ Could not find injection point in index.html.")

def main():
    parser = argparse.ArgumentParser(description="Scaffold a new Learning Hub topic page.")
    parser.add_argument("topic", help="The name of the new topic (e.g., 'Docker')")
    parser.add_argument("description", help="A short description for the SEO and topic card")
    args = parser.parse_args()

    topic_name = args.topic
    slug = slugify(topic_name)
    filename = f"{slug}.html"

    # 1. Copy template
    if not os.path.exists("PAGE_TEMPLATE.html"):
        print("❌ PAGE_TEMPLATE.html not found.")
        return

    if os.path.exists(filename):
        print(f"❌ {filename} already exists. Aborting.")
        return

    shutil.copy("PAGE_TEMPLATE.html", filename)
    print(f"✅ Created {filename} from template.")

    # 2. Update the new HTML file
    update_html_template(filename, topic_name, args.description, slug)
    
    # 3. Update common.js navigation
    update_common_js(topic_name, filename)

    # 4. Update search-data.js
    update_search_data(topic_name, filename)

    # 5. Update index.html
    update_index_html(topic_name, args.description, filename, slug)

    print(f"🎉 Successfully scaffolded '{topic_name}'! Open {filename} to start adding content.")

if __name__ == "__main__":
    main()
