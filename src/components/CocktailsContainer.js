import React, { Component} from 'react'
import CocktailsList from './CocktailsList'
import Form from './Form'
import CocktailsDisplay from './CocktailsDisplay'

const COCKTAILSURL = "http://localhost:3000/api/v1/cocktails"
const INGREDIENTURL = "http://localhost:3000/api/v1/ingredients"
const PROPORTIONSURL = "http://localhost:3000/api/v1/proportions"

class CocktailsContainer extends Component {

  state = {
    cocktails: [],
    all: [],
    selected: [],
    proportions: [{ingredient_name:"", amount:""}],
    name: "",
    description: "",
    instructions: ""
  }

  componentDidMount() {
    fetch(COCKTAILSURL)
    .then(res => res.json())
    .then(cocktail => this.setState({
      cocktails: cocktail,
      all: cocktail
    }))
  }

  clickHandler = (event, cocktail) => {
    fetch(`http://localhost:3000/api/v1/cocktails/${cocktail.id}`)
    .then( res => res.json() )
    .then( extra => {
      this.setState({
        selected: extra
      })
    })
  }

  changeHandler = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  searchHandler = (event) => {
    // console.log(event.target.value);
    let searchValue = event.target.value
    let filterA
    if ( searchValue === "") {

      this.setState({ cocktails: this.state.all })

    } else {

      filterA = this.state.all.filter( cocktail => {
        // debugger
        return cocktail.name.toLowerCase().includes(event.target.value.toLowerCase() )
      })
      this.setState({ cocktails: filterA})
    }
  }


  addIngredientForm = (event) => {
    // event.preventPropagation
    event.preventDefault()


    this.setState({
      proportions: [...this.state.proportions, {ingredient_name:"", amount:""}]
    })

  }

  submitHandler = (event) => {
    let plus = this.state
    // plus.amount = event.target[4].value
    event.preventDefault()
    // debugger
    // console.log(event.target.className);
    console.log("submit ");
    let newInfo = {
      name: plus.name,
      description: plus.description,
      instructions: plus.instructions,
      proportions: this.state.proportions.map( (ingredient, index) => {

      return [
        {
          ingredient_name:  plus.proportions[index].ingredient_name,
          amount: plus.proportions[index].amount

        }
      ]
      })
    }
    this.setState({
      cocktails: [...this.state.cocktails, newInfo],
      selected: newInfo
    })
    // debugger
    fetch(COCKTAILSURL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: plus.name,
        description: plus.description,
        instructions: plus.instructions,
      })
    })
    .then(res => res.json() )
    .then(json => {
      this.postIngredient(json)
    })
  }

  postIngredient = (info) => {
    // console.log(info);
    this.state.proportions.map( (ingredientName, count) => {
      return (

        fetch(INGREDIENTURL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.proportions[count].ingredient_name
          })
        })
        .then(res => res.json() )
        .then(ingredient => {
          this.postProportions(info, ingredient, count)
        })

      )
    })
  }

  postProportions = (info, ingredient, count) => {

    fetch(PROPORTIONSURL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: this.state.proportions[count].amount,
        cocktail_id: info.id,
        ingredient_id: ingredient.id
      })
    })
    .then(res => res.json() )
    .then(console.log)
  }

  ingredientsToAdd = () => {
    // debugger
    // if (this.state.cocktails.proportions) {
      // console.log('past if')
      return this.state.proportions.map((ingredient, idx) => {
        // debugger
        return (
          <div>
          Ingredient Name <br />
          <input placeholder="ingredient"
          name="ingredient_name"
          text="text"
          onChange={(event) => this.handleIngredigent(event, idx)} />

          <input name="amount" type="text" onChange={(event) => this.handleIngredigent(event, idx)}
          placeholder="quality"/> <br />
          </div>
        )
      })
    // }
  }

  handleIngredigent = (event, idx) => {

    let newIngredient = this.state.proportions.map((ingredient, ingredientidx) => {
      // debugger
      if (idx !== ingredientidx) {
        return ingredient
      } else {
        return { ...ingredient, [event.target.name]: event.target.value };
      }
    })
    // console.log(newIngredient)
    this.setState({ proportions: newIngredient})
  }

  render() {
    // console.log(this.state.proportions[0].ingredient_name);
    return (<div>
      <CocktailsList
        searchHandler={this.searchHandler}
        cocktails={this.state.cocktails}
        clickHandler={this.clickHandler} />

      <CocktailsDisplay selected={this.state.selected}/>

      <Form submitHandler={this.submitHandler}
        changeHandler={this.changeHandler}
        addIngredientForm={this.addIngredientForm}
        ingredientsToAdd={this.ingredientsToAdd}
        name={this.state.name}
        description={this.state.description}
        instructions={this.state.instructions}
      />

      </div>)

  }
}

export default CocktailsContainer;
