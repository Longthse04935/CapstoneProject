import React from 'react';


class Rated extends React.Component {
      constructor(props) {
            super(props);

      }

      render() {
            let star = [];
            let i = this.props.number;
            while(i > 0) {
                  if(i < 1 && i > 0) {
                        star.push(<i key={i} className="fa fa-star"></i>);
                  } else {
                        star.push(<i key={i} className="fa fa-star-half-o"></i>);
                  }
                  i--;  
            }
            return (
                  <div className="rating">
                        {star}
                  </div>
            );
      }

}

export default Rated;