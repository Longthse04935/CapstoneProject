import React, { Component } from 'react';
import $ from "jquery";

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
      }

    handleChange= (event) => {
    this.setState({value: event.target.value});
    }

    componentDidMount(){
        $("head").append('<link href="/css/editPost.css" rel="stylesheet"/>');
    }

    render() {
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
                <form role="form">
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Location
                    </label>
                    <div className="col-lg-8">
                        <select className="custom-select" id="inputGroupSelect02">
                        <option selected>Choose...</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        </select>
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Category
                    </label>
                    <div className="col-lg-8">
                        <select className="custom-select" id="inputGroupSelect02">
                        <option selected>Choose...</option>
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
                        <input value={this.state.value} onChange={this.handleChange} className="form-control" type="text" defaultValue />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Title
                    </label>
                    <div className="col-lg-8">
                        <input value={this.state.value} onChange={this.handleChange} className="form-control" type="text" defaultValue />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label value={this.state.value} onChange={this.handleChange} className="col-lg-3 col-form-label form-control-label">
                        Video
                    </label>
                    <div className="col-lg-8">
                        <input value={this.state.value} onChange={this.handleChange} className="form-control" type="text" defaultValue />
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
                        defaultValue="nature.jpg"
                        value={this.state.value}        
                        onChange={this.handleChange}
                        />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Total hour
                    </label>
                    <div className="col-lg-8">
                        <input value={this.state.value} onChange={this.handleChange} className="form-control " type="text" defaultValue />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Description
                    </label>
                    <div className="col-lg-8">
                        <input value={this.state.value} onChange={this.handleChange} className="form-control" type="url" defaultValue />
                    </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Including service
                    </label>
                    <div className="col-lg-7" id="includeServiceCover"></div>
                    <button type="button" className="btn btn-info" id="includeService">
                        Add
                    </button>
                    </div>
                    <div className=" include-service" />
                    <div className="dropdownCoverSelect">
                    <input type="text" className="dropdown-select" />
                    <button type="button" className="btn btn-danger btn-add-service">
                        Delete
                    </button>
                    </div>
                    <div className="form-group row activities">
                    <label className="col-lg-3 col-form-label form-control-label">
                        Activities
                    </label>
                    <div className="col-lg-7"></div>
                    <button type="button" className="btn btn-info" id="activitiesAdd">
                        Add
                    </button>
                    </div>
                    {/* <div class="activitiesInput">
                            <div class="coverContent">
                                    <div class="brief">Brief<input type="index"></div>
                                    <div class="detail">Detail</div><textarea rows="4" cols="50" type="textarea"></textarea>
                                    <button type="button" class="btn btn-danger">Delete</button>
                            </div>
                        </div> */}
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label" />
                    <div className="col-lg-8">
                        <input
                        type="reset"
                        className="btn btn-secondary"
                        defaultValue="Cancel"
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