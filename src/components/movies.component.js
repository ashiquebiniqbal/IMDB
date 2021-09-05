import React, { Component } from "react";
import Pagination from "../common/pagination.component";
import "bootstrap-icons/font/bootstrap-icons.css";
import Filtering from "../common/filtering.component";
import { getMovies } from "../services/movies.service";
import "../assets/movies.css";

class Movies extends Component {
    state = {
        movies: getMovies(),
        genres: [
            "Action",
            "Crime",
            "Drama",
            "Biography",
            "History",
            "Adventure",
            "Fantasy",
            "Western",
            "Comedy",
            "Thriller",
            "War",
            "Animation",
            "Horror",
        ],
        itemsPerPage: 8,
        activePage: 1,
    };

    paginateMovies = () => {
        const { movies, itemsPerPage, activePage } = this.state;
        const startPage = (activePage - 1) * itemsPerPage;
        const paginatedMovies = movies.slice(
            startPage,
            startPage + itemsPerPage
        );

        return paginatedMovies;
    };

    handleUserRating = (id) => {
        const moviesList = this.state.movies;

        moviesList.forEach((movie) => {
            if (movie.movieId === id)
                movie.yourRating === false
                    ? (movie.yourRating = true)
                    : (movie.yourRating = false);
        });

        this.setState({ movies: moviesList });
    };

    handleActivePage = (page) => {
        this.setState({ ...this.state.movies, activePage: page });
    };

    render() {
        const movies = this.paginateMovies();

        return (
            <>
                <div class="container-fluid">
                    <div className="row">
                        <Filtering genres={this.state.genres} />
                        <div className="col-lg-10">
                            <div className="heading">
                                <img
                                    className="page-heading"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
                                ></img>
                                {/* <h3 className="page-heading">IMDb</h3> */}
                                <h6 className="page-content-count">
                                    Showing {movies.length} Movies &nbsp; &nbsp;
                                </h6>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Poster</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">IMDB Rating</th>
                                        <th scope="col">Your Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map((movie) => (
                                        <tr>
                                            <td>
                                                <img
                                                    style={{
                                                        width: "32px",
                                                        height: "auto",
                                                    }}
                                                    src={movie.posterurl}
                                                ></img>
                                            </td>
                                            <td>{movie.title}</td>
                                            <td>
                                                <i class="bi bi-star">
                                                    {" " + movie.imdbRating}
                                                </i>
                                            </td>
                                            <td>
                                                <i
                                                    onClick={() =>
                                                        this.handleUserRating(
                                                            movie.movieId
                                                        )
                                                    }
                                                    className={
                                                        movie.yourRating
                                                            ? "bi bi-star-fill"
                                                            : "bi bi-star"
                                                    }
                                                >
                                                    {movie.yourRating
                                                        ? " Rated"
                                                        : " "}
                                                </i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                totalItemsCount={this.state.movies.length}
                                itemsPerPage={this.state.itemsPerPage}
                                activePage={this.state.activePage}
                                onActivePage={this.handleActivePage}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Movies;
