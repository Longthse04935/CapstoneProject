import React from 'react';


class Request extends React.Component {
      constructor(props) {
            super(props);

      }
      async componentDidMount() {
            // try {
            //       const response = await fetch("" + this.props.postId);
            //       if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
            //       const request = await response.json();
            // } catch (err) {
            //       console.log(err);
            // }

      }
      render() {
            return (
                  <div className="Request">
                        <h2>This is request</h2>
                  </div>
            );
      }

}


export default Request;
