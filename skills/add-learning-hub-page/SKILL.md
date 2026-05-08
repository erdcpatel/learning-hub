# name
add-learning-hub-page

# description
Scaffolds a new learning hub topic page following all zero-dependency, UI, and state management standards.

# instructions
Use this skill whenever you need to add a new topic or reference page to the Learning Hub.
The skill provides an automated script that handles all the boilerplate, ensuring the new page correctly implements:
- Section IDs
- Bookmark integration
- Reading Progress tracking
- Global and Local search indexing
- Navigation linking

**Usage:**
Run the provided script to scaffold the page:
`python skills/add-learning-hub-page/scripts/add_page.py "Topic Name" "Short description of the topic"`

For example:
`python skills/add-learning-hub-page/scripts/add_page.py Docker "Containerization platform for developing, shipping, and running applications."`

After running the script:
1. Open the newly created HTML file (e.g., `docker.html`).
2. Update the `hero` section and fill out the semantic sections with content.
3. Ensure every major `<section>` has a unique ID and retains the bookmark/progress buttons.
