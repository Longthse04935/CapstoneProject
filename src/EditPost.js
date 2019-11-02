import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: [],
            categories: [],
            post:{}
        };
        this.formHandler = this.submitForm.bind(this);
        this.inputOnChange = this.inputOnChange.bind(this);
    }

    inputOnChange(eve) {
        let nam = eve.target.name;
        let val = eve.target.value;
        this.setState({ [nam]: val });
    }

    async componentDidMount() {
        var post_id = this.props.match.params.id;
        try {
            const responseLocation = await fetch("http://localhost:8080/location/findAll");
            const responseCategory = await fetch("http://localhost:8080/category/findAll");
            const responsePost = await fetch("http://localhost:8080/guiderpost/?post_id="+post_id);
            const responsePostPlan = await fetch("http://localhost:8080/activity/post/"+post_id);
            if (!responseCategory.ok) { throw Error(responseCategory.status + ": " + responseCategory.statusText); }
            if (!responseLocation.ok) { throw Error(responseLocation.status + ": " + responseLocation.statusText); }
            if (!responsePost.ok) { throw Error(responsePost.status + ": " + responsePost.statusText); }
            if (!responsePostPlan.ok) { throw Error(responsePostPlan.status + ": " + responsePostPlan.statusText); }
            const location = await responseLocation.json();
            const categories = await responseCategory.json();
            var post = await responsePost.json();
            post.postplan = await responsePostPlan.json();
            this.setState({location,categories,post});
            console.log(this.state.location);
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
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    addService= () => {
        var {services} = this.state;
        services.push("");
        this.setState({services});
    }

    addActivity= () => {
        var {activities} = this.state;
            activities.push({
                brief: "",
                detail: ""
            });
        this.setState({activities});
    }

    removeService(index) {
       var services = [...this.state.services];
       services.splice(index, 1);
       this.setState({services});
    }

    removeActivity = (index) => {
        var activities = [...this.state.activities];
        activities.splice(index, 1);
        this.setState({activities});
    }

    render() {
        var {post,locations} = this.state;
        
        let locationOption = locations.map((location, index) =>
            <option value={location.location_id} key={index}>{location.location}</option>
        );

        // var service = post.including_service.map((value)=> {
        //     return <p>{value}</p>
        // });
        
        // let serviceInput = this.state.services.map((service, index) =>
        //     <div className="dropdownCoverSelect" key={index}>
        //         <input className="dropdown-select service" type="text" onChange={() => {}} placeholder={service} />
        //         <button type="button" className="btn btn-danger btn-add-service" onClick={() => this.removeService(index)} id={index}>Delete</button>
        //     </div>
        // );

        // let actInput = this.state.activities.map((act, index) =>
        //     <div className="activitiesInput" key={index}>
        //         <div className="coverContent" key={index}>
        //             <div className="brief">Brief<input type="text" name="brief" onChange={() => { }} placeholder={act.brief} /></div>
        //             <div className="detail">Detail<textarea rows={4} cols={50} type="textarea" name="detail" onChange={() => { }} placeholder={act.detail} /></div>
        //             <button type="button" className="btn btn-danger" onClick={()=>this.removeActivity(index)} id={index}>Delete</button>
        //         </div>
        //     </div>
        // );

        let categories = this.state.categories.map((category, index) =>
                <option value={category.category} key={index}>{category.category} tour</option>
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
                                            {categories}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">
                                        Price
                    </label>
                    <div className="col-lg-8">
                        <input onChange={this.inputOnChange} value={post.price} className="form-control form-controllerEditPost" type="text" name="price"  />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Title
                    </label>
                    <div className="col-lg-8">
                        <input  onChange={this.inputOnChange} value={post.title} className="form-control form-controllerEditPost" type="text" name="title"  />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label  onChange={this.inputOnChange} className="col-lg-3 col-form-label form-control-label">
                        Video
                    </label>
                    <div className="col-lg-8">
                        <input onChange={this.inputOnChange} value={post.video_link} className="form-control form-controllerEditPost" type="text"   name="video_link" />
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
                                            value={post.picture}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-3 col-form-label form-control-label">
                                        Total hour
                    </label>

                    <div className="col-lg-8">
                        <input  onChange={this.inputOnChange} value={post.total_hour} name="total_hour" className="form-control form-controllerEditPost" type="text" />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Description
                    </label>
                    <div className="col-lg-8">
                        <input onChange={this.inputOnChange} value={post.description} name="description" className="form-control form-controllerEditPost" type="url" />
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
                                    {/* {serviceInput} */}
                                </div>

                                <div className="form-group row activities actEditPost">
                                    <label className="col-lg-3 col-form-label form-control-label">
                                        Activities
                    </label>
                                    <div className="col-lg-7"></div>
                                    <button type="button" className="btn btn-info" id="activitiesAdd" onClick={this.addActivity}>
                                        Add
                    </button>
                                </div>

                                <div className="">
                                    {/* {actInput} */}
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