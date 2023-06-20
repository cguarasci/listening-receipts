const Analysis = {
    analyzeTracks(tracks) {
        const coupons = [];

        tracks.forEach((track) => {
            if (track.count > 10) {
                //You have played this song way too many times
                coupons.push({
                    description: "Based on your experience playing ___ " + track.count + " times",
                });
            }

            if (track.count === 1) {
                //Psychology Today QR Code: Find a therapist
                coupons.push({
                    description: "Based on your experience playing ___ " + track.count + " times",
                    image: "qr-codes/psychology-today.png"
                });
            }
        });

        return coupons;
    }
}

export default Analysis;
