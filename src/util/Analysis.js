const Analysis = {
    analyzeTracks(tracks) {
        const coupons = [];
        let count = { 
            therapist: 0,
            hairDye: 0,
            repeat: 0,
            chiropractor: 0
        };
        const therapistArtistNames = ["Rainbow Kitten Surprise", "Olivia Rodrigo", "Taylor Swift", "Phoebe Bridgers", "Lorde", "Morrissey", "Leonard Cohen", "Radiohead", "The Smiths", "Nine Inch Nails", "Elliott Smith", "Joy Division", "The Cure", "Nick Cave and the Bad Seeds", "Tom Waits", "Lana Del Rey", "Lucy Dacus", "The National", "Bon Iver", "Sufjan Stevens", "Beach House", "Daughter", "Frightened Rabbit", "Mitski", "Sharon Van Etten", "Angel Olsen", "Hozier", "Adele", "The Weeknd", "James Blake", "Arctic Monkeys", "Florence + The Machine", "Marina and the Diamonds", "Tame Impala", "Cage the Elephant", "Lana Del Rey", "Lucy Dacus", "The 1975", "Daughter", "Billie Eilish", "Phoebe Bridgers", "Twenty One Pilots", "Imagine Dragons", "Bastille"];
        const hairDyeArtistNames = ["Panic! At The Disco", "Paramore", "Green Day", "My Chemical Romance", "Fall Out Boy", "blink-182", "Taking Back Sunday", "Dashboard Confessional", "Jimmy Eat World", "The Used", "All Time Low", "The Maine", "Mayday Parade", "Simple Plan", "Good Charlotte", "Yellowcard", "Motion City Soundtrack", "Sum 41", "The All-American Rejects", "New Found Glory", "Brand New", "The Academy Is...", "Saves The Day", "Coheed and Cambria", "Thursday", "The Get Up Kids", "Rise Against", "Cute Is What We Aim For", "Hawthorne Heights", "AFI", "Falling In Reverse", "The Starting Line", "We The Kings", "A Day To Remember", "Neck Deep", "State Champs", "Real Friends", "Knuckle Puck", "Title Fight", "Modern Baseball", "Tigers Jaw", "The Wonder Years", "La Dispute", "Balance and Composure", "Citizen", "Say Anything", "Emarosa", "Pierce The Veil", "Sleeping With Sirens", "Of Mice & Men", "Memphis May Fire", "Silverstein", "Underoath", "Escape The Fate", "The Used", "Alexisonfire", "Chunk! No, Captain Chunk!", "Forever The Sickest Kids", "The Red Jumpsuit Apparatus", "Set It Off", "Eyes Set To Kill", "Tonight Alive", "Emery", "From First To Last", "Senses Fail", "Story Of The Year", "We Came As Romans", "Four Year Strong", "Alesana", "Blessthefall", "Chiodos", "Hopes Die Last", "I See Stars", "Miss May I", "Woe, Is Me", "We Are The In Crowd", "The Almost", "A Skylit Drive", "The Devil Wears Prada", "Every Avenue", "Hit The Lights", "I Prevail", "Ice Nine Kills", "Broadside", "With Confidence", "WSTR", "Trash Boat", "Stand Atlantic", "As It Is", "WSTR", "Movements", "Hot Mulligan", "Can't Swim", "Grayscale", "Eat Your Heart Out", "Seaway", "The Story So Far", "Neck Deep", "Real Friends", "Knuckle Puck", "Tiny Moving Parts", "Basement"];
        const chiropractorArtistNames = ["Skrillex", "Deadmau5", "Tiësto", "Steve Aoki", "Alesso", "Hardwell", "Alan Walker", "Kygo", "Armin van Buuren", "Above & Beyond", "Nero", "Kaskade", "Excision", "Major Lazer", "Bassnectar", "Zeds Dead", "RL Grime", "Slander", "Yellow Claw", "Don Diablo", "R3hab", "Sander van Doorn", "Axwell Λ Ingrosso", "Nicky Romero", "Flosstradamus", "Martin Solveig", "Knife Party", "Cashmere Cat", "Alison Wonderland", "Jauz", "What So Not", "Duke Dumont", "NGHTMRE", "Gryffin", "Morgan Page", "Seven Lions", "Carnage", "Tchami", "Getter", "A-Trak", "Alok", "KSHMR", "Benny Benassi", "Audien", "Adventure Club", "DVBBS", "Borgore", "Gorgon City", "Sick Individuals", "Krewella", "TJR", "Malaa", "Dombresky", "Paul Van Dyk", "Markus Schulz", "Oliver Heldens", "Nervo", "Deorro", "Lost Frequencies", "Feed Me", "Cash Cash", "W&W", "Don Diablo", "Borgeous", "3LAU", "Getter", "Breathe Carolina", "EDX", "Bassjackers", "Mat Zo", "MitiS", "Moon Boots", "Boombox Cartel", "Ghastly", "Tritonal", "Zomboy", "Lane 8", "Cheat Codes", "Bear Grillz", "Gammer", "Dirty South", "Skrillex", "Excision", "Zeds Dead", "NGHTMRE", "Virtual Riot", "Bassnectar", "The Glitch Mob", "Snails", "Slander", "Flosstradamus", "Rezz", "Noisia", "Pegboard Nerds", "Modestep", "Getter", "Svdden Death", "12th Planet", "Bear Grillz", "Eptic", "Subtronics", "Space Laces", "PhaseOne", "Must Die!", "Midnight Tyrannosaurus", "Trampa", "Doctor P", "Dirtyphonics", "Riot Ten", "Herobust", "Spag Heddy", "Kompany", "Soltan", "Zomboy", "Rusko", "Gentlemens Club", "Dubloadz", "Chime", "Badklaat", "Ivory", "Downlink", "Habstrakt", "Ray Volpe", "Mastadon", "Eliminate", "Fox Stevenson", "Samplifire", "Oddprophet", "Aweminus", "Calcium", "Graphyt", "Effin", "Oddprophet", "Phiso", "Jiqui", "Blankface", "Krimer", "Svddendeath", "Yookie", "Zeds Dead", "Slander", "Spag Heddy", "Mastadon", "Chime", "Rusko", "Herobust", "Gentlemens Club", "Badklaat", "Dubloadz", "Trampa", "Zomboy", "Riot Ten", "Ray Volpe", "Bear Grillz", "Kompany", "Must Die!", "Doctor P", "Soltan", "Subtronics", "Downlink", "12th Planet", "Snails", "Getter", "Modestep", "Pegboard Nerds", "Noisia", "Rezz", "Flosstradamus", "Dirtyphonics", "PhaseOne", "Space Laces", "Virtual Riot", "NGHTMRE", "Zeds Dead", "Excision",];

        //Get audio features from the tracks
        

        //Get artist features from the track


        //See if there's an overall trend:

        tracks.forEach((track) => {
            //You have played this song over ten many times - 10 (by track count)
            if (count.repeat === 0 && track.count > 10) {
                coupons.push({
                    description: "Thanks for your " + track.count + " count order of " + track.artist.name + "'s " + track.name + "! You've earned a free song on us. Not for your loyalty, but because we're begging you to switch it up.",
                });

                count.repeat = 1;
            }

            //You have played this song way too many times - 30 (by track count)
            if (count.repeat === 0 && track.count > 25) {
                coupons.push({
                    description: "Based on your " + track.count + " count order of " + track.artist.name + "'s " + track.name + ", our system has flagged that you might be a bot, as no human would be able to withstand that much " + track.name + ". As per our policy, we are required to make you complete this CAPTCHA test. Please circle the parts that look like a receipt.",
                });

                count.repeat = 1;
            }

            //You have played this song way too many times - 30 (by track count)
            if (count.repeat === 0 && track.count > 40) {
                coupons.push({
                    description: "Based on your " + track.count + " count order of " + track.artist.name + "'s " + track.name + ", our system has flagged a concern for your wellbeing. If staff sees you reaching for your phone to play " + track.artist.name + "'s " + track.name + " again, they are mandated to hold an intervention. There are no more lyrics to interpret. It has been played enough.",
                });

                count.repeat = 1;
            }

            //Psychology Today QR Code: Find a therapist (by artist name)
            if (count.therapist === 0 && therapistArtistNames.includes(track.artist.name)) {
                coupons.push({
                    description: "Based on your order of "  + track.artist.name + ", we've extended you a special offer. Fill out this form to be connected with an associate who can help you with your future needs!",
                    image: "qr-codes/psychology-today.png"
                });

                count.therapist = 1;
            }
            //Manic Panic Hair Dye (by artist name)
            if (count.hairDye === 0 && hairDyeArtistNames.includes(track.artist.name)) {
                
                coupons.push({
                    description: "Based on your order of "  + track.artist.name + ", we've extended you a special offer. Use the code WELCOME20 for 20% off Manic Panic hair dye."
                });

                count.hairDye = 1;
            }
            
            //Chiropractor (by artist name)
            if (count.chiropractor === 0 && chiropractorArtistNames.includes(track.artist.name)) {
                
                coupons.push({
                    description: "Based on your order of "  + track.artist.name + ", we've extended you a special offer on chiropractor services to help alleviate some of the damage from your anticipated history of headbanging to EDM."
                });

                count.chiropractor = 1;
            }
        });

        return coupons;
    }
}

export default Analysis;
