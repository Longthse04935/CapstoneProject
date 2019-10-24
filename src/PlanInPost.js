import React from 'react';


class PlanInPost extends React.Component {
      constructor(props) {
            super(props);
            let obj = [{
                  "brief": "",
                  "detail": ""
            }];
            this.state = { plans: obj };

      }
      async componentDidMount() {
            try {
                  const response = await fetch("http://localhost:8080/activity/post/"+this.props.postId);
                  if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                  const plan = await response.json();
                  this.setState({ plans: plan });
            } catch (err) {
                  console.log(err);
            }

      }
      render() {
            const planList = this.state.plans.map((plan, index) =>
                  <div className="detail" key={index}>
                        <i key={index} className="fa fa-circle"></i>
                        <div className="detailPlan">
                              <h4>{plan.brief}</h4>
                              <p>{plan.detail}</p>
                        </div>
                  </div>
            );
            return (
                  <div className="plan">
                        <h2>This is plan</h2>
                        <p>Check out the plan below to see what you'll get up to with your local host.</p>
                        <p> Feel free to personalize this offer.</p>
                        {planList}
                        <button>Contact me to personalize this for you</button>

                  </div>
            );
      }
}


export default PlanInPost;