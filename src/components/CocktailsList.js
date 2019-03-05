import React, { Component} from 'react'
import CocktailsName from './CocktailsName'

class CocktailsList extends Component {


  render() {

    let cocktailArr = this.props.cocktails.map( cocktail => {
      return (<CocktailsName key={cocktail.id}
            cocktail={cocktail}
            clickHandler={this.props.clickHandler}/>)
    })
    // console.log(this.props);
    return (

    <div className="column" >

      <input type="search" placeholder="    Find Me" onChange={(e) => this.props.searchHandler(e)} />

      <div id="cocktail-list">
        <br />
        {cocktailArr}
      </div>
    </div>
    )

  }
}

export default CocktailsList
