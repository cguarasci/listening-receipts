const Analysis = {
    analyzeTracks(tracks) {
        const coupons = [];

        tracks.forEach((track) => {
            if (track.count > 10) {
                //You have played this song way too many times
                coupons.push({
                    description: "Thanks for your " + track.count + " count order of " + track.artist.name + "'s " + track.name + "! Get a free song on us. Please. It's free. Switch it up.",
                });
            }

            if (track.artist.name === "Rainbow Kitten Surprise") {
                //Psychology Today QR Code: Find a therapist based on your artist
                coupons.push({
                    description: "Based on your order of "  + track.artist.name + ", we've extended you a special offer. Fill out this form to be connected with an associate who can help you with your future needs!",
                    image: "qr-codes/psychology-today.png"
                });
            }

            if (track.artist.name === "Paramore" || track.artist.name === "Panic! At The Disco") {
                //Psychology Today QR Code: Find a therapist based on your artist
                coupons.push({
                    description: "Based on your order of "  + track.artist.name + ", we've extended you a special offer for $5 off Manic Panic hair dye.",
                    // image: "qr-codes/psychology-today.png"
                });
            }
        });

        return coupons;
    }
}

export default Analysis;
