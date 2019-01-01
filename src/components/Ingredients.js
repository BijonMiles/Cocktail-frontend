import React from 'react'


const Ingredients = props => {
  // console.log(props.ingredient);
  return (<div>
    <li> <strong>{props.ingredient.amount}</strong>  {props.ingredient.ingredient_name}
     </li>

    </div>)
}

export default Ingredients
