import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import $ from "jquery";

class EditPost extends Component {
    constructor(props) {
        super(props);

            let initLocation = [{
                  location_id: 1,
                  location: "Phu Quoc"
            }];
            let initCategory = [{}];
            let initPlan = {
                  meetingPoint: "",
                  plan: []
            }

            this.state = {
                  locations: initLocation,
                  categories: initCategory,
                  activities: [{
                        brief: "",
                        detail: ""
                  }],
                  services: [""],
                  plan: initPlan,
                  "title": "",
                  "video_link": "",
                  "total_hour": 1,
                  "description": "",

                  "location": "",
                  "category": "",
                  "reason": "",
                  "price": ""
            };
            this.addService = this.addService.bind(this);
            this.removeService = this.removeService.bind(this);
            this.addActivity = this.addActivity.bind(this);
            this.removeActivity = this.removeActivity.bind(this);
            this.formHandler = this.submitForm.bind(this);
            this.inputOnChange = this.inputOnChange.bind(this);
      }

      inputOnChange(eve) {
        let nam = eve.target.name;
        let val = eve.target.value;
        this.setState({ [nam]: val });
    }

    async componentDidMount() {
        $("head").append('<link href="/css/editPost.css" rel="stylesheet"/>');
        const copy = this.state;
        try {
              const responseLocation = await fetch("http://localhost:8080/location/findAll");
              //const responseCategory = await fetch("http://localhost:8080/find/");
              //if (!responseCategory.ok) { throw Error(responseCategory.status + ": " + responseCategory.statusText); }
              if (!responseLocation.ok) { throw Error(responseLocation.status + ": " + responseLocation.statusText); }
              const location = await responseLocation.json();
              //const category = await responseCategory.json();
              copy.locations = location;
              this.setState(copy);
        } catch (err) {
              console.log(err);
        }
  }

    async submitForm(eve) {
            eve.preventDefault();
            const copy = this.state;
            const dom = ReactDOM.findDOMNode(this);

            let image = [];
            if (dom instanceof HTMLElement) {

                //query file
                const files = dom.querySelector(".upload").files;
                console.log(files);

                for (let i = 0; i < files.length; i++) {
                        image.push(await this.toBase64(files[i]));
                }

            } else {
                console.log("find DOM do not work");
            }
            let initPost = await {
                "title": copy.title,
                "video_link": copy.video_link,
                "picture": image,
                "total_hour": copy.total_hour,
                "description": copy.description,
                "including_service": copy.services,
                "active": true,
                "location": copy.locations[0],
                "category": "",
                "reason": "",
                "price": copy.price
            };
            let plan = copy.activities;
            console.log(initPost);
        }

        toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
    });

    addService() {
        const copy = this.state;

        const dom = ReactDOM.findDOMNode(this);
        if (dom instanceof HTMLElement) {
            const acts = dom.querySelectorAll(".service");
            let services = [];
            for (let i = 0; i < acts.length; i++) {
                    services.push(acts[i].value);
            }
            services.push("");
            copy.services = services;
            // console.log(copy.services);
            this.setState(copy);
        } else {
            console.log("find DOM do not work");
        }
    }

    addActivity() {
        const copy = this.state;

        const dom = ReactDOM.findDOMNode(this);
        //document.querySelectorAll(".coverContent")[0].querySelector("input[name='detail']").value
        if (dom instanceof HTMLElement) {
              const acts = dom.querySelectorAll(".coverContent");

              let activities = [];
              for (let i = 0; i < acts.length; i++) {
                    let brief = acts[i].querySelector("input[name='brief']").value;
                    let detail = acts[i].querySelector("textarea[name='detail']").value;
                    activities.push({
                          brief: brief,
                          detail: detail
                    });
              }
              activities.push({
                    brief: "",
                    detail: ""
              });
              copy.activities = activities;
              // console.log(copy.activities);
              this.setState(copy);
        } else {
              console.log("find DOM do not work");
        }
  }
  removeService(eve) {
    const copy = this.state;

    const dom = ReactDOM.findDOMNode(this);
    if (dom instanceof HTMLElement) {
          const acts = dom.querySelectorAll(".service");
          let services = [];
          for (let i = 0; i < acts.length; i++) {
                if (i === eve.target.id) continue;
                services.push(acts[i].value);
          }

          copy.services = services;
          // console.log(eve.target.id);
          this.setState(copy);
    } else {
          console.log("find DOM do not work");
    }

}

    removeActivity(eve) {
        const copy = this.state;

        const dom = ReactDOM.findDOMNode(this);

        if (dom instanceof HTMLElement) {
            const acts = dom.querySelectorAll(".coverContent");

            let activities = [];
            for (let i = 0; i < acts.length; i++) {
                    if (i === eve.target.id) continue;
                    let brief = acts[i].querySelector("input[name='brief']").value;
                    let detail = acts[i].querySelector("textarea[name='detail']").value;
                    activities.push({
                        brief: brief,
                        detail: detail
                    });
            }

            copy.activities = activities;
            // console.log(eve.target.id);
            this.setState(copy);
        } else {
            console.log("find DOM do not work");
        }
    }

    render() {
        let locationOption = this.state.locations.map((location, index) =>
        <option value={location.location_id} key={index}>{location.location}</option>
         );

         let serviceInput = this.state.services.map((service, index) =>
         <div className="dropdownCoverSelect" key={index}>
               <input  className="dropdown-select service" type="text" onChange={() => { }} placeholder={service} />
               <button type="button" className="btn btn-danger btn-add-service" onClick={this.removeService} id={index}>Delete</button>
         </div>
   );

   let actInput = this.state.activities.map((act, index) =>
   <div className="activitiesInput" key={index}>
        <div className="coverContent" key={index}>
                <div className="brief">Brief<input type="text" name="brief" onChange={() => { console.log("it works"); }} placeholder={act.brief} /></div>
                <div className="detail">Detail<textarea rows={4} cols={50} type="textarea" name="detail" onChange={() => { }} placeholder={act.detail} /></div>
                <button type="button" className="btn btn-danger" onClick={this.removeActivity} id={index}>Delete</button>
        </div>
    </div>
);

        return (
            <div>
                <div className="container">
            <div className="row m-y-2">
                {/* edit form column */}
                <div className="col-lg-4 text-lg-center">
                <h2>Edit Post</h2>
                </div>
                <div className="col-lg-8"></div>
                <div className="col-lg-7 push-lg-4 personal-info">
                <form role="form" onSubmit={this.formHandler}>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Location
                    </label>
                    <div className="col-lg-8">
                        <select className="custom-select" id="inputGroupSelect02">
                        {locationOption}
                        </select>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Category
                    </label>
                    <div className="col-lg-8">
                        <select className="custom-select" id="inputGroupSelect02">
                            <option>Choose...</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Price
                    </label>
                    <div className="col-lg-8">
                        <input onChange={this.inputOnChange} className="form-control" type="text" name="price"  />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Title
                    </label>
                    <div className="col-lg-8">
                        <input  onChange={this.inputOnChange} className="form-control" type="text" name="title"  />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label  onChange={this.inputOnChange} className="col-lg-3 col-form-label form-control-label">
                        Video
                    </label>
                    <div className="col-lg-8">
                        <input onChange={this.inputOnChange} className="form-control" type="text"   name="video_link" />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Picture
                    </label>
                    <div className="col-lg-8">
                        <input
                        className="filePicture"
                        type="file"  
                        onChange={this.inputOnChange}
                      
                        />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Total hour
                    </label>
                    <div className="col-lg-8">
                        <input  onChange={this.inputOnChange} name="total_hour" className="form-control " type="text" />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Description
                    </label>
                    <div className="col-lg-8">
                        <input onChange={this.inputOnChange} name="description" className="form-control" type="url" />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Including service
                    </label>

                    <div className="col-lg-7" id="includeServiceCover"></div>
                    <button type="button" className="btn btn-info" id="includeService" onClick={this.addService}>
                        Add
                    </button>
                    </div>

                    <div className=" include-service" >
                    {serviceInput}
                    </div>

                    <div className="form-group row activities">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Activities
                    </label>
                    <div className="col-lg-7"></div>
                    <button type="button" className="btn btn-info" id="activitiesAdd" onClick={this.addActivity}>
                        Add
                    </button>
                    </div>

                    <div className="">
                    {actInput}
                    </div>

                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label" />
                    <div className="col-lg-8">
                        <input
                        type="reset"
                        className="btn btn-primary"
                        defaultValue="Reset Form"
                        />
                        <input
                        type="button"
                        className="btn btn-primary"
                        defaultValue="Save Changes"
                        />
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

export default EditPost;