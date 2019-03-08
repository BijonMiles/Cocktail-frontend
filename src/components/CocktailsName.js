import React from 'react'


const CocktailsName = props => {
  // console.log(props);

  return (<div className="names"> <ul onClick={(event) => props.clickHandler(event, props.cocktail)}> {props.cocktail.name} </ul> </div>)


}

export default CocktailsName
