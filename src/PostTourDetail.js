import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "font-awesome/css/font-awesome.min.css";
import Config from './Config';

class PostTourDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPage: 1,
          todosPerPage: 4, 
          dataPostOneCategory: []
        };
      }

      async componentDidMount() {
        try {
          const responsePosts = await fetch(
            Config.api_url + "guiderpost/allPostOfOneCategory?category_id="+this.props.match.params.id,
            {
              method: "GET",
              mode: "cors",
              credentials: "include",
              headers: {
                'Accept': 'application/json'
            },
          });
    
          if (!responsePosts.ok) {
            throw Error(responsePosts.status + ": " + responsePosts.statusText);
          }
    
          const dataPostOneCategory = await responsePosts.json();
    
          this.setState({ dataPostOneCategory});
          console.log(dataPostOneCategory);
        } catch (err) {
          console.log(err);
        }
      }

      handleCurrentPage = (event) => {
        this.setState({
          currentPage: event.target.id
        });
      }

    render() {
        const data = this.state.dataPostOneCategory;
        const {currentPage, todosPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentdata = data.slice(indexOfFirstTodo, indexOfLastTodo);

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <button
                key={number}
                id={number}
                onClick={this.handleCurrentPage}
                className={currentPage === number ? 'currentPage': ''}
              >
                {number}
              </button>
            );
        });
        let category_name = window.sessionStorage.getItem('category_name');
        return (
            <div className='postInTour'>
                <h2>All trips about {category_name} </h2>
                <div className="contentTour">
                    {
                      currentdata.map((post,index) => {
                            return ( 
                                <div className="contentTourDetail" key={index}>
                                    <video controls>
                                        <source src='/video/Food_Tour-1_m8apyj.webm' type="video/mp4" />
                                    </video>
                                    <h2>{post.title}</h2>
                                    <p>{post.description}</p>
                                    <p>Price:{post.price}$</p>
                                    <p>Location:{post.location}</p>
                                    <div className="Rating">
                                        Rated:
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                        <i className="fa fa-star-half-o"></i>
                                    </div>
                                    <Link to={"/post/"+post.post_id}>Watch my post</Link>
                                </div>
                            )
                            })
                    }
                </div>
                <div className="pagination">
                  <div className="paginationContent">
                  {renderPageNumbers}
                  </div>
                </div>
            </div>
        );
    }
}

export default PostTourDetail;