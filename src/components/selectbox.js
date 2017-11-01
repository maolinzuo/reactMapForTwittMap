import React, { Component } from 'react';

class SelectBox extends Component {


    handleKeyword = (event) => {
        this.props.onSelectKeyword(event.target.value);
    }

    render(){
        return(
            <div className="container">
            <span className="text"> Search for </span>
            <select onChange={event => this.handleKeyword(event)}>
              <option value=""></option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Trump">Trump</option>
              <option value="food">food</option>
              <option value="Apple">Apple</option>
              <option value="Facebook">Facebook</option>
              <option value="movie">movie</option>
              <option value="music">music</option>
              <option value="Uber">Uber</option>
              <option value="Job">job</option>
            </select>
          </div>
        )
    }

}

export default SelectBox