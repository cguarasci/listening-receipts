import React from 'react';
// import ReactDOMServer from 'react-dom/server';
import ReactToPrint from 'react-to-print';
import './Receipt.css';

class ComponentToPrint extends React.Component {
  render() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    return (
        <div className="receipt-container"  style={{ display: "flex", flexDirection: "column", paddingBottom: "50px" }}>
            <div className="top-info" style={{ padding: '20px' }}>
                <div>
                    <h3 style={{ textAlign: "center" }}>{this.props.username}'s Spotify Receipt</h3>
                    <p style={{ textAlign: "center" }}>Coded by Casey</p>
                    <p style={{ textAlign: "center" }}>@lorrainesdomain</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>{formattedDate}</p>
                    <p>-HERE-</p>
                </div>
            </div>
            <table className="receipt-table">
                <tbody>
                    {this.props.tracks.map((track) => (
                        <tr key={track.id}>
                            <td style={{ paddingLeft: "30px" }}>
                              {track.count}x
                            </td>
                            <td>
                              <a className="unformatted-link" href={track.url} alt="Song Link">
                                {track.name}
                                <br />
                                <em>{track.artist.name}</em>
                              </a>
                            </td>
                            <td style={{ textAlign: "end", paddingRight: "30px" }}>
                              ${track.cost}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {this.props.analysis.map((coupon, index) => (
                <div style={{ padding: '30px 30px 0px 30px', textAlign: 'center' }}>
                    <p>* * * * * * * * * * * * * * * * * * * * * * *</p>
                    <div style={{ textAlign: 'center' }} key={index} dangerouslySetInnerHTML={{ __html: coupon.description }}></div>
                    {coupon.image && <div><br></br><img height="100px" src={process.env.PUBLIC_URL + "/assets/" + coupon.image} alt="Coupon" /></div>}
                </div>
            ))}
        </div>
    );
  }
}

class Receipt extends React.Component {
    render() {
      return (
        <div>
          <ReactToPrint
            trigger={() => <button className="print-button">Print this out!</button>}
            content={() => this.componentRef}
            onAfterPrint={this.props.onPrintComplete}
          />
          <ComponentToPrint 
            ref={el => (this.componentRef = el)} 
            tracks={this.props.tracks} 
            analysis={this.props.analysis} 
            username={this.props.username}
          />
        </div>
      );
    }
  }
  
  export default Receipt;
