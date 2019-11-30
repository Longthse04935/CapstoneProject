import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Nav/Navbar';
import Footer from '../Footer';
import $ from "jquery";
import ReactDOMServer from 'react-dom/server';

class EditPost extends Component {
    constructor(props) {
        super(props);

        console.log("route work");
        let initPost = {};
        let initLocation = [{}];
        let initCategory = [{}];

        this.state = {
            post: initPost,
            locations: initLocation,
            categories: initCategory,
            activities: [{
                brief: "",
                detail: ""
            }],
            services: [""],
            reasons: [""],
            plan: [],
            "picture_link": "",
            "title": "",
            "video_link": "",
            "total_hour": 1,
            "description": "",
            meeting_point: "",
            "location": "",
            "category": "",
            "reason": "",
            "price": ""
        };
        this.formHandler = this.submitForm.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
        this.addReason = this.addReason.bind(this);
        this.removeReason = this.removeReason.bind(this);

    }



    removeReason(eve) {
        const copy = this.state;
        // console.log(copy.reasons);
        const dom = ReactDOM.findDOMNode(this);
        if (dom instanceof HTMLElement) {
            const acts = dom.querySelectorAll(".reason");
            // console.log(acts);
            let reasons = [];
            for (let i = 0; i < acts.length; i++) {
                if (i == eve.target.id) continue;
                reasons.push(acts[i].value);
            }
            for (let i = 0; i < reasons.length; i++) {
                acts[i].value = reasons[i];
            }
            console.log(reasons);
            copy.reasons = reasons;
            //console.log(eve.target.id);
            this.setState(copy);
        } else {
            console.log("find DOM do not work");
        }
    }

    addReason() {
        const copy = this.state;

        const dom = ReactDOM.findDOMNode(this);
        if (dom instanceof HTMLElement) {
            const acts = dom.querySelectorAll(".reason");
            let reasons = [];
            for (let i = 0; i < acts.length; i++) {
                reasons.push(acts[i].value);
            }
            reasons.push("");
            copy.reasons = reasons;
            // console.log(copy.services);
            this.setState(copy);
        } else {
            console.log("find DOM do not work");
        }
    }

    inputOnChange(eve) {
        let nam = eve.target.name;
        let val = eve.target.value;
        this.setState({ [nam]: val });
    }

    async componentDidMount() {

        $("head").append('<link href="/css/editPost.css" rel="stylesheet"/>');
        const copy = Object.assign({}, this.state);
        try {
            const responseLocation = await fetch("http://localhost:8080/location/findAll");
            const responseCategory = await fetch("http://localhost:8080/category/findAll");
            const post = await fetch("http://localhost:8080/guiderpost?post_id=" + this.props.id,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        'Accept': 'application/json'
                    },
                });
            const plans = await fetch("http://localhost:8080/plan/" + this.props.id,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        'Accept': 'application/json'
                    },
                });
            if (!responseCategory.ok) { throw Error(responseCategory.status + ": " + responseCategory.statusText); }
            if (!responseLocation.ok) { throw Error(responseLocation.status + ": " + responseLocation.statusText); }
            if (!post.ok) { throw Error(post.status + ": " + post.statusText); }
            const edit = await post.json();
            const location = await responseLocation.json();
            const category = await responseCategory.json();
            copy.locations = location;
            copy.categories = category;
            copy.title = edit.title;
            copy.video_link = edit.video_link;
            copy.picture_link = edit.picture_link;
            copy.total_hour = edit.total_hour;
            copy.description = edit.description;
            copy.services = edit.including_service;
            copy.location = edit.location;
            copy.category = edit.category;
            copy.price = edit.price;
            copy.reason = this.parseReason(edit.reasons);
            const plan = await plans.json();
            console.log(await plan);
            copy.meeting_point = await plan.meeting_point;
            copy.activities = this.parsePlan(plan.detail);
            this.setState(copy);

        } catch (err) {
            console.log(err);
        }

    }

    parseReason(html) {
        let detailRegex = /(<p>).+?(<\/p>)/g;
        let m;
        let reasons = [];
        do {
            
            m = detailRegex.exec(html);
            if (m) {
                reasons.push(m[0].replace("<p>", "").replace("</p>", ""));
            }
        } while (m);
        return reasons;
    }

    parsePlan(html) {
        let briefRegex = /(<h4>).+?(<\/h4>)/g;
        let detailRegex = /(<p>).+?(<\/p>)/g;
        let m;
        let briefs = [];
        let details = [];

        do {
            m = briefRegex.exec(html);
            if (m) {
                briefs.push(m[0].replace("<h4>", "").replace("</h4>", ""));
            }
            m = detailRegex.exec(html);
            if (m) {
                details.push(m[0].replace("<p>", "").replace("</p>", ""));
            }
        } while (m);
        let acts = [];
        for(let i = 0; i < briefs.length; i ++) {
            acts.push({brief: briefs[i], detail:details[i]});
        }
        return acts;
    }

    async submitForm(eve) {
        eve.preventDefault();
        const copy = this.state;
        const dom = ReactDOM.findDOMNode(this);

        let image = [];
        let location = 1;
        let cate = 1;
        if (dom instanceof HTMLElement) {
            //query location
            let lo = dom.querySelector("#inputGroupSelect01");
            location = lo.options[lo.selectedIndex].value;
            //query cate
            lo = dom.querySelector("#inputGroupSelect02");
            cate = lo.options[lo.selectedIndex].value;
            //query file
            const files = dom.querySelector(".filePicture").files;
            console.log(files);

            for (let i = 0; i < files.length; i++) {
                image.push(await this.toBase64(files[i]));
            }

        } else {
            console.log("find DOM do not work");
        }
        let initPost = await {
            "guider_id": this.props.guiderId,
            "title": copy.title,
            "video_link": copy.video_link,
            "picture_link": image,
            "total_hour": copy.total_hour,
            "description": copy.description,
            "including_service": copy.services,
            "active": true,
            "location": location,
            "category": cate,
            "price": copy.price,
            "rated": 3,
            "reason": ReactDOMServer.renderToString(this.reasonToHTML(copy.reasons))
        };

        let plan = ReactDOMServer.renderToString(this.planToHTML(copy.activities));
        console.log(initPost);
        console.log(plan);
        try {
            let response = await fetch("http://localhost:8080/guiderpost//update/post=",
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(initPost)
                }
            );
            if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
            const id = await response.text();
            let plans = {
                meeting_point: copy.meeting_point,
                detail: plan,
                post_id: id,
            };
            response = await fetch("http://localhost:8080/plan/create",
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(plans)
                }
            );
            if (!response.ok) { throw Error(response.status + ": " + response.statusText); }
        } catch (err) {
            console.log(err);
        }
    }

    planToHTML = acts => {
        return (
            acts.map((act, index) =>
                <div className="detail">
                    <i key={index} className="fas fa-circle"></i>
                    <div className="detailPlan">
                        <h4>{act.brief}</h4>
                        <p>{act.detail}</p>
                    </div>
                </div>)

        );
    }

    reasonToHTML = reasons => {
        return (<div className="activities reason">
            <h2>{reasons.length} reasons to book this tour</h2>
            <ul>
                {reasons.map((reason, index) =>
                    <li key={index}><i className="fas fa-check"></i>
                        <p>{reason}</p>
                    </li>
                )}


            </ul>
        </div>);
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    removeService(eve) {
        const copy = this.state;

        const dom = ReactDOM.findDOMNode(this);
        if (dom instanceof HTMLElement) {
            const acts = dom.querySelectorAll(".service");
            // console.log(acts);
            let services = [];
            for (let i = 0; i < acts.length; i++) {
                if (i == eve.target.id) continue;
                services.push(acts[i].value);
            }
            for (let i = 0; i < services.length; i++) {
                acts[i].value = services[i];
            }
            copy.services = services;
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
                if (i == eve.target.id) continue;
                let brief = acts[i].querySelector("input[name='brief']").value;
                let detail = acts[i].querySelector("textarea[name='detail']").value;
                activities.push({
                    brief: brief,
                    detail: detail
                });
            }
            for (let i = 0; i < activities.length; i++) {
                acts[i].querySelector("input[name='brief']").value = activities[i].brief;
                acts[i].querySelector("textarea[name='detail']").value = activities[i].detail;
            }
            copy.activities = activities;
            this.setState(copy);
        } else {
            console.log("find DOM do not work");
        }
    }

    render() {
        console.log(this.props.guiderId);
        let locationOption = this.state.locations.map((location, index) =>
            <option value={location.location_id} key={index} >{location.location}</option>
        );
        let categoryOption = this.state.categories.map((cate, index) =>
            <option value={cate.category_id} key={index} >{cate.category}</option>
        );

        let serviceInput = this.state.services.map((service, index) =>
            <div className="dropdownCoverSelect" key={index}>
                <input className="dropdown-select service" type="text" onChange={(eve) => { service = eve.target.value; }}  defaultValue={service}/>
                <button type="button" className="btn btn-danger btn-add-service" onClick={this.removeService} id={index}>Delete</button>
            </div>
        );

        let actInput = this.state.activities.map((act, index) =>
            <div className="activitiesInput" key={index}>
                <div className="coverContent" key={index}>
                    <div className="brief">Brief<input type="text" name="brief" onChange={(eve) => { act.brief = eve.target.value; }} defaultValue={act.brief}/></div>
                    <div className="detail">Detail<textarea rows={4} cols={50} type="textarea" name="detail" onChange={(eve) => { act.detail = eve.target.value; }}  defaultValue={act.detail}/></div>
                    <button type="button" className="btn btn-danger" onClick={this.removeActivity} id={index}>Delete</button>
                </div>
            </div>
        );

        let reasonInput = this.state.reasons.map((reason, index) =>
            <div className="dropdownCoverSelect" key={index}>
                <input className="dropdown-select reason" type="text" onChange={(eve) => { reason = eve.target.value; }} defaultValue={reason}/>
                <button type="button" className="btn btn-danger btn-add-service" onClick={this.removeReason} id={index}>Delete</button>
            </div>
        );

        return (
            <div>
                <div className="container">
                    <div className="row m-y-2">
                        {/* edit form column */}
                        <div className="col-lg-4 text-lg-center">
                            <h2>Edit Post</h2>
                            {/* {service} */}
                        </div>
                        <div className="col-lg-8"></div>
                        <div className="col-lg-7 push-lg-4 personal-info">
                            <form role="form" onSubmit={this.formHandler}>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Location</label>
                                    <div className="col-lg-8">
                                        <select className="custom-select" id="inputGroupSelect01" defaultValue ={this.state.location} >
                                            {locationOption}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">

                                    <label className="col-lg-3 col-form-label form-control-label">Category</label>
                                    <div className="col-lg-8">
                                        <select className="custom-select" id="inputGroupSelect02" defaultValue ={this.state.category} >
                                            {categoryOption}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">

                                    <label className="col-lg-3 col-form-label form-control-label">Price</label>
                                    <div className="col-lg-8">
                                        <input onChange={this.inputOnChange} className="form-control" type="text" name="price" defaultValue={this.state.price} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Title</label>
                                    <div className="col-lg-8">
                                        <input onChange={this.inputOnChange} className="form-control" type="text" name="title" defaultValue={this.state.title} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label onChange={this.inputOnChange} className="col-lg-3 col-form-label form-control-label">Video</label>
                                    <div className="col-lg-8">
                                        <input onChange={this.inputOnChange} className="form-control" type="url" name="video_link" defaultValue={this.state.video_link} />
                                    </div>
                                </div>
                                <div className="form-group row pictures">
                                    <label className="col-lg-3 col-form-label form-control-label">Picture</label>
                                    <div className="col-lg-7" id="picInput">
                                        <input

                                            className="filePicture"
                                            type="file"

                                            accept="image/png, image/jpeg. image/jpg"

                                            multiple
                                        />

                                    </div>

                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Total hour</label>
                                    <div className="col-lg-8">
                                        <input onChange={this.inputOnChange} name="total_hour" className="form-control " type="text" defaultValue={this.state.total_hour} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Description</label>
                                    <div className="col-lg-8">
                                        <input onChange={this.inputOnChange} name="description" className="form-control" type="text" defaultValue={this.state.description} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Including service</label>
                                    <div className="col-lg-7" id="includeServiceCover"></div>
                                    <button type="button" className="btn btn-info" id="includeService" onClick={this.addService}>Add</button>
                                </div>


                                <div className="include-service" >
                                    {serviceInput}
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Meeting point</label>
                                    <div className="col-lg-8">
                                        <input onChange={this.inputOnChange} name="meeting_point" className="form-control " type="text" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Activities</label>
                                    <div className="col-lg-7"></div>

                                    <button type="button" className="btn btn-info" id="activitiesAdd" onClick={this.addActivity}>Add</button>
                                </div>

                                <div className="">
                                    {/* {actInput} */}
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">Why to pick you   </label>
                                    <div className="col-lg-7"></div>
                                    <button type="button" className="btn btn-info" id="reasonAdd" onClick={this.addReason}>Add</button>
                                </div>

                                <div className="">
                                    {reasonInput}
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
                                            type="submit"
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