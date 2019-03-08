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
    return (
      <div>

        {this.props.selected.id ? (

          <div className="column4">
            <div className="adjust">
              <h1 className="title">  Wine Banaza! </h1>
            </div>

            <div className="column5">
              <h1 >{this.props.selected.name}</h1>
              <strong> {this.props.selected.description} </strong>
              <p> {this.props.selected.instructions} </p>


              {extraArr}
            </div>
          </div>)

        :
          (<div className="column4">
            <h1 className="title">   Wine Banaza!  </h1>
          </div>)
        }
      </ div>
    )
  }
}

// <h1>Ingredient</h1>

export default CocktailsDisplay;
