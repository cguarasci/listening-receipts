import React from 'react';
import './Receipt.css';
// import Spotify from '../../util/Spotify';
// import psychologyTodayQR from './qr-code.png';

class Receipt extends React.Component {
  render() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    return (
      <div style={{ display: "flex", flexDirection: "column", padding: "30px 0" }}>
        <div className="top-info" style={{ padding: '20px' }}>
            <div>
                <h2 style={{ textAlign: "center" }}>{this.props.username}'s Spotify Receipt</h2>
                <p style={{ textAlign: "center" }}>Coded by Casey</p>
                <p style={{ textAlign: "center" }}>@lorrainesdomain</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{formattedDate}</p>
                <p>-HERE-</p>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Order: 235471</p>
                <p>Casey Guarasci</p>
            </div> */}
        </div>
        <table className="receipt-table">
                {this.props.tracks.map(track => (
                    <tr key={track.id}>
                        <td style={{ paddingLeft: "30px" }}>
                            {track.count}x
                        </td>
                        <td>
                            {track.name}
                            <br></br>
                            <em>{track.artist.name}</em>
                        </td>
                        <td style={{ textAlign: "end", paddingRight: "30px" }}>
                            ${track.cost}
                        </td>
                    </tr>
                ))}
        </table>
        {this.props.analysis.map((coupon, index) => (
            <div style={{ padding: '30px 30px 0px 30px', textAlign: 'center' }}>
                <p>* * * * * * * * * * * * * * * * * * * * * * * * * *</p>
                <div style={{ textAlign: 'center' }} key={index} dangerouslySetInnerHTML={{ __html: coupon.description }}></div>
                {coupon.image && <div><br></br><img height="100px" src={process.env.PUBLIC_URL + "/assets/" + coupon.image} alt="Coupon" /></div>}
            </div>
        ))}
      </div>
    );
  }
}

export default Receipt;
