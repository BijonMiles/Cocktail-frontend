import React from 'react'


const CocktailsName = props => {
  // console.log(props);

  return (<div> <li onClick={(event) => props.clickHandler(event, props.cocktail)}> {props.cocktail.name} </li> </div>)


}

export default CocktailsName
