import React, { Component } from "react";

class Filtering extends Component {
    render() {
        const { genres } = this.props;
        return (
            <div className="col-lg-2">
                <ul class="list-group">
                    {genres.map((genre) => (
                        <li class="list-group-item">{genre}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Filtering;
