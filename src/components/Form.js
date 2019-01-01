import React, { Component} from 'react'

class Form extends Component {


  render() {

    // console.log(this.props);
    return (<div className="column">
        <form onSubmit={(event) => this.props.submitHandler(event)}>
        <h2> Create a Cocktail</h2>

        Name: <input placeholder="name" name="name"
          onChange={(event) => this.props.changeHandler(event)}
          value={this.props.name} /> <br />
        <br />

        Description:<br />
          <textarea rows="4" cols="50"  placeholder="description"
            name="description" onChange={this.props.changeHandler}
            value={this.props.description}/>
          <br />

        Instructions:<br />
          <textarea rows="4" cols="50" placeholder="instructions" name="instructions"
          onChange={this.props.changeHandler}
          value={this.props.instructions}/>
        <h3> Proportions </h3>


          {this.props.ingredientsToAdd()}
        <button type="button"className="button" onClick={this.props.addIngredientForm}> Add </button>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  }
}

// Ingredient Name <br />
// <input placeholder="ingredient" name="ingredient_name"
// onChange={this.props.changeHandler} />
//   <input name="amount" type="text" onChange={this.props.changeHandler} placeholder="quality"/>
export default Form
