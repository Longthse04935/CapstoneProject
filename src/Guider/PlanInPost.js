import React from 'react';
import Config from '../Config';

class PlanInPost extends React.Component {
      constructor(props) {
            super(props);

            this.state = {
                  plans: {
                        plan_id: 0,
                        meeting_point: "",
                        detail: "",
                        post_id: props.post_id
                  }
            };

      }
      async componentDidMount() {
            try {
                  const response = await fetch(Config.api_url + "plan/" + this.props.postId,
                        {
                              method: "GET",
                              mode: "cors",
                              credentials: "include",
                              headers: {
                                    'Accept': 'application/json'
                              },
                        });
                  if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
                  const plan = await response.json();
                  this.setState({ plans: plan });
            } catch (err) {
                  console.log(err);
            }

      }
      render() {
            // const planList = this.state.plans.map((plan, index) =>
            //       <div className="detail" key={index}>
            //             <i key={index} className="fa fa-circle"></i>
            //             <div className="detailPlan">
            //                   <h4>{plan.brief}</h4>
            //                   <p>{plan.detail}</p>
            //             </div>
            //       </div>
            // );
            return (
                  <div className="plan">
                        <h2>This is plan 2</h2>
                        <p>Check out the plan below to see what you'll get up to with your local host.</p>
                        <p> Feel free to personalize this offer.</p>
                        <div className="meetPoint">
                              <i className="fas fa-map-marker-alt"></i>
                              <div className="detailPlan">
                                    <h4>Meeting point</h4>
                                    <p>{this.state.plans.meeting_point}</p>
                              </div>

                        </div>
                        {this.state.plans.detail}

                  </div>
            );
      }
}


export default PlanInPost;