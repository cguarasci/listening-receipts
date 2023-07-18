const Analysis = {
    analyzeTracks(tracks) {
        const coupons = [];
        let count = { 
            therapist: 0,
            hairDye: 0,
            repeat: 0
        };
        const therapistArtistNames = ["Rainbow Kitten Surprise", "Taylor Swift", "Phoebe Bridgers", "Lana Del Rey", "Lorde"];
        const hairDyeArtistNames = ["Panic! At The Disco", "Paramore", "Green Day"];

        //Get audio features from the tracks
        

        //Get artist features from the track


        //See if there's an overall trend:

        tracks.forEach((track) => {
            //You have played this song way too many times (by track count)
            if (count.repeat === 0 && track.count > 10) {
                coupons.push({
                    description: "Thanks for your " + track.count + " count order of " + track.artist.name + "'s " + track.name + "! You've earned a free song on us. Not for your loyalty, but because we're begging you to switch it up.",
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
                    description: "Based on your order of "  + track.artist.name + ", we've extended you a special offer for $5 off Manic Panic hair dye.",
                    image: "qr-codes/psychology-today.png"
                });

                count.hairDye = 1;
            }
        });

        return coupons;
    }
}

export default Analysis;
