import React from "react";
import "./Filter.css";

class Filter extends React.Component {
    render() {
        return (
            <div className={"filter"}>
                <h2>Recommended movies: </h2>
                <div className={"filterItems"}>
                    {this.props.weathergenres.map((genre,i)=>(
                        <div key={i} className={this.props.weatherfilter ? "filterItem active" : "filterItem inactive"} onClick={()=>this.props.handleFilterChange("weather", genre)}>
                            <img src={this.props.weatherIcon} height={40} alt={genre}/>
                            <div>{genre}<small>based on weather</small></div>
                        </div>
                    ))}
                    {this.props.timegenres.map((genre, i)=>(
                        <div key={i+99} className={this.props.timefilter ? "filterItem active" : "filterItem inactive"} onClick={()=>this.props.handleFilterChange("time", genre)}>
                            <img src={this.props.timeIcon} height={40} alt={genre}/>
                            <div>{genre}<small>based on time</small></div>
                        </div>
                    ))}

                </div>
            </div>

        )
    }
}

export default Filter;