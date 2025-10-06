// N.I.P.P.L.E. Campaign Manager - JavaScript
// Intelligent Document Parser for N.I.P.P.L.E. Campaign Manager
// Enhanced parser with better pattern recognition and context awareness

class IntelligentParser {
    constructor() {
        this.patterns = {
            // NPC patterns
            npc: {
                nameWithRole: /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-–—]\s*(.+?)(?:\n|$)/gm,
                boldName: /\*\*([^*]+)\*\*\s*[-–—:]?\s*(.+?)(?:\n|$)/gm,
                bulletName: /^[-•*]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-–—:]?\s*(.+?)(?:\n|$)/gm,
                secret: /secret:?\s*(.+?)(?:\n|$)/gi,
                catchphrase: /(?:catchphrase|says|quote):?\s*["'](.+?)["']|["'](.+?)["']/gi,
                role: /(?:role|position|title):?\s*(.+?)(?:\n|$)/gi,
                stats: /(?:AC|HP|STR|DEX|CON|INT|WIS|CHA)\s*:?\s*\d+/gi
            },
            
            // Encounter patterns
            encounter: {
                withCR: /^([^-–—\n]+?)\s*[-–—]\s*(?:CR|Challenge Rating)\s*(\d+)(?:\s*[-–—]\s*(.+?))?(?:\n|$)/gim,
                typed: /^([^-–—\n]+?)\s*[-–—]\s*(Combat|Social|Puzzle|Exploration)(?:\s*[-–—]\s*(.+?))?(?:\n|$)/gim,
                basic: /^([^-–—\n]+?)\s*[-–—]\s*(.+?)(?:\n|$)/gm,
                stats: /(?:HP|AC|ATK|DMG|Init):\s*[\d+\-d]+/gi,
                enemies: /(\d+)x?\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g
            },
            
            // Item patterns
            item: {
                withValue: /^[-•*]?\s*([^-()\n]+?)\s*\(([^)]+)\)/gm,
                withDescription: /^[-•*]?\s*([^-–—\n]+?)\s*[-–—]\s*(.+?)(?:\n|$)/gm,
                simple: /^[-•*]?\s*([A-Z][^,\n]+?)(?:,|\n|$)/gm,
                magical: /\+\d+\s+[A-Z][a-z]+/g,
                rarity: /\b(Common|Uncommon|Rare|Very Rare|Legendary|Artifact)\b/gi
            },
            
            // Quest patterns
            quest: {
                titled: /^(?:Quest|Mission|Task):?\s*(.+?)(?:\n|$)/gim,
                objective: /^[-•*]\s*(?:Objective|Goal|Task):?\s*(.+?)(?:\n|$)/gim,
                reward: /(?:Reward|Payment|Prize):?\s*(.+?)(?:\n|$)/gi
            },
            
            // Location patterns
            location: {
                named: /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-–—]\s*(.+?)(?:\n|$)/gm,
                room: /^(?:Room|Area|Chamber)\s*(\d+|[A-Z]):?\s*(.+?)(?:\n|$)/gim
            },
            
            // General patterns
            header: /^#{1,6}\s+(.+?)$/gm,
            bullet: /^[-•*]\s+(.+?)$/gm,
            numbered: /^\d+\.\s+(.+?)$/gm,
            bold: /\*\*(.+?)\*\*/g,
            italic: /\*(.+?)\*|_(.+?)_/g
        };
        
        this.sectionKeywords = {
            npcs: ['npc', 'character', 'cast', 'dramatis personae', 'people', 'who', 'player character'],
            encounters: ['encounter', 'combat', 'battle', 'fight', 'conflict', 'challenge', 'prepared encounter', 'random table'],
            revelations: ['revelation', 'secret', 'twist', 'mystery', 'plot', 'spoiler', 'secrets &'],
            items: ['item', 'loot', 'treasure', 'equipment', 'gear', 'magic item', 'reward', 'party resources', 'cargo'],
            quests: ['quest', 'mission', 'task', 'objective', 'goal', 'adventure hook', 'plot hook', 'timeline', 'event'],
            locations: ['location', 'place', 'area', 'room', 'map', 'dungeon', 'setting', 'ship'],
            factions: ['faction', 'organization', 'group', 'guild', 'order', 'reputation'],
            mechanics: ['mechanic', 'rule', 'table', 'system', 'homebrew', 'quick reference', 'dm reference', 'reminder'],
            lore: ['lore', 'history', 'background', 'legend', 'story', 'world', 'campaign overview', 'setting', 'act']
        };
    }
    
    parse(text) {
        const result = {
            npcs: [],
            encounters: [],
            revelations: [],
            items: [],
            quests: [],
            locations: [],
            factions: [],
            plotHooks: [],
            mechanics: [],
            lore: [],
            notes: [],
            confidence: 0,
            warnings: []
        };
        
        // Normalize text
        text = this.normalizeText(text);
        
        // Split into sections
        const sections = this.splitIntoSections(text);
        
        // Parse each section
        sections.forEach(section => {
            this.parseSection(section, result);
        });
        
        // Calculate confidence
        result.confidence = this.calculateConfidence(result);
        
        // Add warnings if needed
        if (result.confidence < 0.5) {
            result.warnings.push('Consider using clear headers like "NPCs:", "Encounters:", etc. for better results');
        }
        
        return result;
    }
    
    normalizeText(text) {
        text = text.replace(/\r\n/g, '\n');
        text = text.replace(/[–—]/g, '-');
        text = text.replace(/\n{3,}/g, '\n\n');
        return text;
    }
    
    splitIntoSections(text) {
        const sections = [];
        const lines = text.split('\n');
        let currentSection = { header: '', content: [], type: 'unknown' };
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const headerMatch = line.match(/^#{1,6}\s+(.+)$/);
            if (headerMatch) {
                if (currentSection.content.length > 0) {
                    sections.push(currentSection);
                }
                currentSection = {
                    header: headerMatch[1].toLowerCase(),
                    content: [],
                    type: this.identifySectionType(headerMatch[1])
                };
            } else if (line) {
                currentSection.content.push(line);
            }
        }
        
        if (currentSection.content.length > 0) {
            sections.push(currentSection);
        }
        
        return sections;
    }
    
    identifySectionType(header) {
        header = header.toLowerCase();
        for (const [type, keywords] of Object.entries(this.sectionKeywords)) {
            if (keywords.some(keyword => header.includes(keyword))) {
                return type;
            }
        }
        return 'unknown';
    }
    
    parseSection(section, result) {
        const content = section.content.join('\n');
        
        switch (section.type) {
            case 'npcs':
                this.parseNPCs(content, result.npcs);
                break;
            case 'encounters':
                this.parseEncounters(content, result.encounters);
                break;
            case 'revelations':
                this.parseRevelations(content, result.revelations);
                break;
            case 'items':
                this.parseItems(content, result.items);
                break;
            case 'quests':
                this.parseQuests(content, result.quests);
                break;
            case 'locations':
                this.parseLocations(content, result.locations);
                break;
            case 'factions':
                this.parseFactions(content, result.factions);
                break;
            case 'mechanics':
                result.mechanics.push({ title: section.header, content: content });
                break;
            case 'lore':
                result.lore.push({ title: section.header, content: content });
                break;
            default:
                this.parseUnknownSection(content, result);
                break;
        }
    }
    
    parseNPCs(text, npcs) {
        const lines = text.split('\n');
        let currentNPC = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            let match = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-–—]\s*(.+)/);
            if (!match) {
                match = line.match(/^\*\*([^*]+)\*\*\s*[-–—:]?\s*(.+)/);
            }
            
            if (match) {
                if (currentNPC) {
                    npcs.push(currentNPC);
                }
                
                currentNPC = {
                    name: match[1].trim(),
                    description: match[2].trim(),
                    role: null,
                    secret: null,
                    catchphrase: null
                };
                
                const roleMatch = currentNPC.description.match(/^([^.,]+?)(?:\.|,|$)/);
                if (roleMatch && roleMatch[1].length < 50) {
                    currentNPC.role = roleMatch[1].trim();
                }
            } else if (currentNPC) {
                const secretMatch = line.match(/secret:?\s*(.+)/i);
                if (secretMatch) {
                    currentNPC.secret = secretMatch[1].trim();
                } else {
                    const catchphraseMatch = line.match(/(?:catchphrase|says|quote):?\s*["'](.+?)["']|["'](.+?)["']/i);
                    if (catchphraseMatch) {
                        currentNPC.catchphrase = (catchphraseMatch[1] || catchphraseMatch[2]).trim();
                    } else {
                        currentNPC.description += ' ' + line;
                    }
                }
            }
        }
        
        if (currentNPC) {
            npcs.push(currentNPC);
        }
    }
    
    parseEncounters(text, encounters) {
        const lines = text.split('\n');
        let currentEncounter = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            let match = line.match(/^([^-–—\n]+?)\s*[-–—]\s*(?:CR|Challenge Rating)\s*(\d+)/i);
            if (match) {
                if (currentEncounter) encounters.push(currentEncounter);
                currentEncounter = {
                    name: match[1].trim(),
                    cr: match[2],
                    type: 'Combat',
                    description: ''
                };
                continue;
            }
            
            match = line.match(/^([^-–—\n]+?)\s*[-–—]\s*(Combat|Social|Puzzle|Exploration)/i);
            if (match) {
                if (currentEncounter) encounters.push(currentEncounter);
                currentEncounter = {
                    name: match[1].trim(),
                    type: match[2],
                    cr: null,
                    description: ''
                };
                continue;
            }
            
            match = line.match(/^([^-–—\n]+?)\s*[-–—]\s*(.+)/);
            if (match && !currentEncounter) {
                currentEncounter = {
                    name: match[1].trim(),
                    description: match[2].trim(),
                    type: 'Unknown',
                    cr: null
                };
                
                const crMatch = currentEncounter.description.match(/CR\s*(\d+)/i);
                if (crMatch) {
                    currentEncounter.cr = crMatch[1];
                    currentEncounter.type = 'Combat';
                }
            } else if (currentEncounter) {
                currentEncounter.description += ' ' + line;
            }
        }
        
        if (currentEncounter) encounters.push(currentEncounter);
    }
    
    parseRevelations(text, revelations) {
        const lines = text.split('\n');
        let currentRevelation = null;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const match = line.match(/^([^-–—\n]+?)\s*[-–—]\s*(.+)/);
            if (match) {
                if (currentRevelation) revelations.push(currentRevelation);
                currentRevelation = {
                    title: match[1].trim(),
                    description: match[2].trim(),
                    when: null
                };
                
                const whenMatch = currentRevelation.description.match(/(?:when|timing|act):?\s*(.+?)(?:\.|$)/i);
                if (whenMatch) {
                    currentRevelation.when = whenMatch[1].trim();
                }
            } else if (currentRevelation) {
                currentRevelation.description += ' ' + line;
            }
        }
        
        if (currentRevelation) revelations.push(currentRevelation);
    }
    
    parseItems(text, items) {
        const lines = text.split('\n');
        
        for (const line of lines) {
            if (!line.trim()) continue;
            
            let cleanLine = line.trim().replace(/^[-•*]\s*/, '');
            
            let match = cleanLine.match(/^([^(]+)\s*\(([^)]+)\)/);
            if (match) {
                items.push({
                    name: match[1].trim(),
                    description: match[2].trim(),
                    rarity: this.extractRarity(match[2])
                });
                continue;
            }
            
            match = cleanLine.match(/^([^-–—]+)\s*[-–—]\s*(.+)/);
            if (match) {
                items.push({
                    name: match[1].trim(),
                    description: match[2].trim(),
                    rarity: this.extractRarity(match[2])
                });
                continue;
            }
            
            if (cleanLine.length > 2 && cleanLine.length < 100) {
                items.push({
                    name: cleanLine,
                    description: '',
                    rarity: null
                });
            }
        }
    }
    
    parseQuests(text, quests) {
        const lines = text.split('\n');
        let currentQuest = null;
        
        for (const line of lines) {
            if (!line.trim()) continue;
            
            const match = line.match(/^([^-–—\n]+?)\s*[-–—]\s*(.+)/);
            if (match) {
                if (currentQuest) quests.push(currentQuest);
                currentQuest = {
                    title: match[1].trim(),
                    description: match[2].trim(),
                    giver: null,
                    reward: null
                };
            } else if (currentQuest) {
                currentQuest.description += ' ' + line.trim();
            }
        }
        
        if (currentQuest) quests.push(currentQuest);
    }
    
    parseLocations(text, locations) {
        const lines = text.split('\n');
        let currentLocation = null;
        
        for (const line of lines) {
            if (!line.trim()) continue;
            
            const match = line.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*[-–—]\s*(.+)/);
            if (match) {
                if (currentLocation) locations.push(currentLocation);
                currentLocation = {
                    name: match[1].trim(),
                    description: match[2].trim()
                };
            } else if (currentLocation) {
                currentLocation.description += ' ' + line.trim();
            }
        }
        
        if (currentLocation) locations.push(currentLocation);
    }
    
    parseFactions(text, factions) {
        const lines = text.split('\n');
        let currentFaction = null;
        
        for (const line of lines) {
            if (!line.trim()) continue;
            
            const match = line.match(/^([^-–—\n]+?)\s*[-–—]\s*(.+)/);
            if (match) {
                if (currentFaction) factions.push(currentFaction);
                currentFaction = {
                    name: match[1].trim(),
                    description: match[2].trim(),
                    reputation: 0
                };
            } else if (currentFaction) {
                currentFaction.description += ' ' + line.trim();
            }
        }
        
        if (currentFaction) factions.push(currentFaction);
    }
    
    parseUnknownSection(text, result) {
        const lines = text.split('\n').filter(l => l.trim());
        
        if (lines.length === 0) return;
        
        if (this.looksLikeNPCs(text)) {
            this.parseNPCs(text, result.npcs);
        } else if (this.looksLikeEncounters(text)) {
            this.parseEncounters(text, result.encounters);
        } else if (this.looksLikeItems(text)) {
            this.parseItems(text, result.items);
        } else if (text.length > 20) {
            result.notes.push(text);
        }
    }
    
    looksLikeNPCs(text) {
        const namePattern = /[A-Z][a-z]+\s+[A-Z][a-z]+/;
        const roleWords = /\b(captain|commander|merchant|guard|wizard|priest|noble|king|queen)\b/i;
        return namePattern.test(text) && roleWords.test(text);
    }
    
    looksLikeEncounters(text) {
        const encounterWords = /\b(CR|combat|battle|fight|attack|HP|AC|initiative)\b/i;
        return encounterWords.test(text);
    }
    
    looksLikeItems(text) {
        const itemWords = /\b(sword|armor|potion|ring|wand|staff|gold|gp|treasure)\b/i;
        const valuePattern = /\d+\s*gp|\d+\s*gold/i;
        return itemWords.test(text) || valuePattern.test(text);
    }
    
    extractRarity(text) {
        const match = text.match(/\b(Common|Uncommon|Rare|Very Rare|Legendary|Artifact)\b/i);
        return match ? match[1] : null;
    }
    
    calculateConfidence(result) {
        let score = 0;
        let maxScore = 0;
        
        if (result.npcs.length > 0) {
            score += Math.min(result.npcs.length * 10, 30);
            maxScore += 30;
        }
        if (result.encounters.length > 0) {
            score += Math.min(result.encounters.length * 10, 30);
            maxScore += 30;
        }
        if (result.items.length > 0) {
            score += Math.min(result.items.length * 5, 20);
            maxScore += 20;
        }
        if (result.revelations.length > 0) {
            score += Math.min(result.revelations.length * 10, 20);
            maxScore += 20;
        }
        
        const structuredNPCs = result.npcs.filter(npc => npc.role || npc.secret).length;
        if (structuredNPCs > 0) score += 10;
        
        const structuredEncounters = result.encounters.filter(enc => enc.cr).length;
        if (structuredEncounters > 0) score += 10;
        
        maxScore = Math.max(maxScore, 100);
        
        return Math.min(score / maxScore, 1);
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntelligentParser;
}
