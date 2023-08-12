const Analysis = {
    analyzeTracks(tracks) {
        const coupons = [];
        let count = { 
            therapist: 0,
            hairDye: 0,
            repeat: 0
        };
        const therapistArtistNames = ["Rainbow Kitten Surprise", "Taylor Swift", "Phoebe Bridgers", "Lorde", "Morrissey", "Leonard Cohen", "Radiohead", "The Smiths", "Nine Inch Nails", "Elliott Smith", "Joy Division", "The Cure", "Nick Cave and the Bad Seeds", "Tom Waits", "Lana Del Rey", "Lucy Dacus", "The National", "Bon Iver", "Sufjan Stevens", "Beach House", "Daughter", "Frightened Rabbit", "Mitski", "Sharon Van Etten", "Angel Olsen", "Hozier", "Adele", "The Weeknd", "James Blake", "Arctic Monkeys", "Florence + The Machine", "Marina and the Diamonds", "Tame Impala", "Cage the Elephant", "Lana Del Rey", "Lucy Dacus", "The 1975", "Daughter", "Billie Eilish", "Phoebe Bridgers", "Twenty One Pilots", "Imagine Dragons", "Bastille"];
        const hairDyeArtistNames = ["Panic! At The Disco", "Paramore", "Green Day", "My Chemical Romance", "Fall Out Boy", "blink-182", "Taking Back Sunday", "Dashboard Confessional", "Jimmy Eat World", "The Used", "All Time Low", "The Maine", "Mayday Parade", "Simple Plan", "Good Charlotte", "Yellowcard", "Motion City Soundtrack", "Sum 41", "The All-American Rejects", "New Found Glory", "Brand New", "The Academy Is...", "Saves The Day", "Coheed and Cambria", "Thursday", "The Get Up Kids", "Rise Against", "Cute Is What We Aim For", "Hawthorne Heights", "AFI", "Falling In Reverse", "The Starting Line", "We The Kings", "A Day To Remember", "Neck Deep", "State Champs", "Real Friends", "Knuckle Puck", "Title Fight", "Modern Baseball", "Tigers Jaw", "The Wonder Years", "La Dispute", "Balance and Composure", "Citizen", "Say Anything", "Emarosa", "Pierce The Veil", "Sleeping With Sirens", "Of Mice & Men", "Memphis May Fire", "Silverstein", "Underoath", "Escape The Fate", "The Used", "Alexisonfire", "Chunk! No, Captain Chunk!", "Forever The Sickest Kids", "The Red Jumpsuit Apparatus", "Set It Off", "Eyes Set To Kill", "Tonight Alive", "Emery", "From First To Last", "Senses Fail", "Story Of The Year", "We Came As Romans", "Four Year Strong", "Alesana", "Blessthefall", "Chiodos", "Hopes Die Last", "I See Stars", "Miss May I", "Woe, Is Me", "We Are The In Crowd", "The Almost", "A Skylit Drive", "The Devil Wears Prada", "Every Avenue", "Hit The Lights", "I Prevail", "Ice Nine Kills", "Broadside", "With Confidence", "WSTR", "Trash Boat", "Stand Atlantic", "As It Is", "WSTR", "Movements", "Hot Mulligan", "Can't Swim", "Grayscale", "Eat Your Heart Out", "Seaway", "The Story So Far", "Neck Deep", "Real Friends", "Knuckle Puck", "Tiny Moving Parts", "Basement"];

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
                    description: "Based on your " + track.count + " count order of " + track.artist.name + "'s " + track.name + ", our system has called the police. Please hold this receipt over your head and await your federally mandated intervention. Refrain in your wait from reaching for your phone to play " + track.artist.name + "'s " + track.name + ". It has been played enough.",
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
        });

        return coupons;
    }
}

export default Analysis;
