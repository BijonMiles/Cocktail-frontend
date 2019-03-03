import React, { Component } from 'react'
import Ingredients from './Ingredients'

class CocktailsDisplay extends Component {

  render() {


    // console.log(id);

    let extraArr
    if (this.props.selected.id) {
      extraArr = this.props.selected.proportions.map( ingredient => {
        return <Ingredients key={ingredient.id} ingredient={ingredient}/>
      })
    }
    return ( <div className="column1">
      <h1>{this.props.selected.name}</h1>
      <strong> {this.props.selected.description} </strong>
      <p> {this.props.selected.instructions} </p>
      <h1>Ingredient</h1>
      {extraArr}
       </div>)
  }
}

export default CocktailsDisplay;
