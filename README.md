# N.I.P.P.L.E. Campaign Manager

A web-based tool for managing your D&D campaign. Track characters, encounters, story progression, and session notes all in one place.

## Getting Started

1. Open `index.html` in your web browser
2. Your data saves automatically to your browser
3. No internet connection needed after the first load

## Main Features

### 📄 Upload Prep Documents

Click the **"Upload Prep Doc"** button to import your session prep notes.

**Supported file types:**
- Word documents (.docx)
- Text files (.txt)
- Markdown files (.md)

**What it can find automatically:**
- **NPCs** - Character names, roles, and descriptions
- **Encounters** - Combat, social, and puzzle challenges
- **Revelations** - Secrets and plot twists
- **Items** - Regular and magic items
- **Plot Hooks** - Quest ideas and story threads
- **Mechanics** - Custom rules and tables
- **Lore** - World history and background info

**How to use it:**
1. Click "Upload Prep Doc" or drag a file onto the upload area
2. Wait for the parser to analyze your document
3. Review what it found in the preview
4. Check the boxes for what you want to import
5. Click "Import Selected"

**Tips for best results:**
- Use headers to organize sections (like "NPCs" or "Encounters")
- Bold important names
- Write naturally - the parser understands context
- Include details like CR ratings for encounters

### 📑 Navigation Tabs

Switch between different sections using the tabs at the top:

- **Overview** - Campaign summary and current act
- **Characters** - Player characters and important NPCs
- **Storyline** - Act progression and key revelations
- **Combat** - Combat tracker (coming soon)
- **Encounters** - Prepared encounters ready to run
- **DM Notes** - Your session notes
- **Data Manager** - Export and import your campaign

### 👥 Managing Characters

**Player Characters:**
- View character stats in the Characters tab
- Shows player name, class, and level

**NPCs:**
- See all important NPCs in one place
- Includes their role and description
- Secret information is marked clearly

### 📖 Story Tracking

**Act Progression:**
- See all 5 acts of your campaign
- Current act is marked with a badge
- Each act shows level range and tone

**Revelations:**
- Track secrets and plot twists
- Note when they should be revealed
- Keep spoilers organized

### ⚔️ Encounters

View all your prepared encounters with:
- Encounter name and type
- Challenge Rating (CR)
- Full description

Perfect for quick reference during sessions.

### 📝 Session Notes

Use the DM Notes tab to:
- Write notes during sessions
- Track what happened
- Record player decisions
- Click "Save Notes" to keep them

### 💾 Data Management

**Export Your Campaign:**
1. Go to the Data Manager tab
2. Click "Export Campaign"
3. Save the JSON file as a backup

**Import a Campaign:**
1. Go to the Data Manager tab
2. Click "Import Campaign"
3. Select your saved JSON file
4. Your data loads instantly

**Important:** Your data saves automatically in your browser, but exporting creates a backup file you can keep safe.

## Tips for Best Use

### Organizing Your Prep

1. **Before the session:**
   - Upload your prep document
   - Review imported content
   - Add any missing details manually

2. **During the session:**
   - Use tabs to quickly switch between sections
   - Take notes in the DM Notes tab
   - Reference encounters and NPCs as needed

3. **After the session:**
   - Export your campaign as a backup
   - Update notes with what happened
   - Prepare for next session

### Writing Prep Documents

For the best auto-import results:

**NPCs:**
```
# Captain Sarah Chen
Captain Sarah Chen is the station commander. She's strict but fair.
Secret: She's actually working for the resistance.
```

**Encounters:**
```
# Ambush in the Cargo Bay
Combat encounter, CR 3
Three space pirates attack the party while they're loading supplies.
```

**Revelations:**
```
# The Truth About N.I.P.P.L.E.
When: Act 3
The corporation is actually harvesting souls for an ancient entity.
```

### Keyboard Shortcuts

- Use your browser's search (Ctrl+F or Cmd+F) to find specific content
- Refresh the page (F5) if something doesn't load correctly

## Troubleshooting

**My data disappeared:**
- Check if you're using the same browser
- Try importing your last export file
- Browser data can be cleared by privacy settings

**Upload isn't working:**
- Make sure your file is .docx, .txt, or .md
- Try a smaller file if it's very large
- Check that the file isn't corrupted

**Something looks wrong:**
- Refresh the page
- Clear your browser cache
- Try a different browser

## Browser Compatibility

Works best in:
- Chrome
- Firefox
- Safari
- Edge

Requires JavaScript to be enabled.

## Privacy

- All data stays in your browser
- Nothing is sent to any server
- Your campaign data is private
- Export files are stored on your computer

## Tips for DMs

1. **Keep backups** - Export your campaign regularly
2. **Use headers** - Organize prep docs with clear sections
3. **Be descriptive** - More detail helps the parser understand
4. **Review imports** - Always check what was imported before using it
5. **Take notes** - Use the DM Notes tab during sessions

### ⚔️ Combat Initiative Tracker

Manage combat encounters with the built-in initiative tracker:

**Features:**
- Add combatants with initiative rolls and HP
- Automatic initiative sorting (highest to lowest)
- Track current turn with visual indicator
- Adjust HP during combat
- Remove defeated combatants
- Clear tracker when combat ends

**How to use:**
1. Go to the Combat tab
2. Click "Add Combatant"
3. Enter name, initiative, and HP
4. Use "Next Turn" to advance through combat
5. Click HP values to adjust them
6. Remove combatants as needed

### 🎲 Dice Roller

Roll dice directly in the app:

**Quick Roll Buttons:**
- d4, d6, d8, d10, d12, d20, d100
- Shows result and roll type

**Custom Rolls:**
- Click "Custom Roll" for advanced options
- Set number of dice and die type
- Add modifiers (+ or -)
- Perfect for ability checks and damage rolls

### ✏️ Character Management

**Edit Characters:**
- Click the edit icon next to any character
- Update name, class, level, and player
- Changes save automatically

**Add New Characters:**
- Click "Add Player Character"
- Fill in character details
- Appears immediately in the list

**Delete Characters:**
- Use the delete button to remove characters
- Confirmation required to prevent accidents

### 📚 Custom Act Management

**Create Custom Acts:**
- Click "Add Custom Act" in the Storyline tab
- Define act name, level range, and tone
- Add your own story structure

**Edit Acts:**
- Click the edit icon next to any act
- Modify details as your campaign evolves
- Update level ranges and descriptions

**Set Current Act:**
- Click "Set as Current" to mark active act
- Helps track campaign progression

**Delete Acts:**
- Remove acts you no longer need
- Cannot delete if it's the current act

### 📜 Session History

**Save Session Notes:**
- After taking notes, click "Save Notes"
- Enter a session title
- Notes are archived with timestamp

**View History:**
- Click "View History" in DM Notes tab
- See all past session notes
- Review what happened in previous sessions
- Delete old sessions if needed

**Benefits:**
- Never lose track of what happened
- Easy reference for continuity
- Build a complete campaign record

---

**Need help?** The app is designed to be simple. If something isn't clear, try clicking around - you can't break anything, and your data auto-saves!
