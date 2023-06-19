import React from 'react';
import './Receipt.css';

class Receipt extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ color: "black", margin: 0, textShadow: "0 0 0 black" }}>Receipt:</h2>
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Song</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tracks.map(track => (
              <tr key={track.id}>
                <td>
                    {track.count}x
                </td>
                <td>
                    {track.name}
                    <br></br>
                    {track.artist.name}
                </td>
                <td>
                    ${track.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        Coupons:
        <p>Coupon</p>
      </div>
    );
  }
}

export default Receipt;
