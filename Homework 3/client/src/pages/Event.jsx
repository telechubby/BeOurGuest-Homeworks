import React from 'react'
import { Link, renderMatches } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};
class Event extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    };

    componentDidMount() {
        fetch('http://localhost:9000/events/')
        .then((res) => res.json())
        .then((events) => {
            var imagearray=[]
            events.forEach(function(event) {
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr =arrayBufferToBase64(event.image.data);
                var tmpEvent=event
                tmpEvent.image=base64Flag+imageStr
                imagearray.push(tmpEvent)
            });
            this.setState({
                images:imagearray
            })
        })
    }
    render() {
        return (
            <ul style={{"listStyle":"none","overflowY":"scroll","maxHeight":"90vh","maxWidth":"98vw","margin":"auto"}}>
                {this.state.images.map(d => (<li key={d.image}>
                    <div style={{"margin":"3vw 3vh","borderBottom":"1px solid gray","paddingBottom":"10px"}}>
                        <h2>{d.name}</h2>
                        <h3>{d.description}</h3>
                        <h3>Time: {d.startTime} - {d.endTime}</h3>
                        <h3>Contact: {d.contact}</h3>
                        <img src={d.image} alt="Couldn't load" style={{height:"300px"}}/>
                    </div>
                    </li>))}
            </ul>
        );
    }
    
}

export default Event