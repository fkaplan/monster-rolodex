import React, { Component } from "react";
import "./App.css";
import { resolve, reject } from "q";
import { CardList } from "./component/card-list/card-list.component";
import { SearchBox } from "./component/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ""
    };

    //Arrow function şekilde yazılmasaydı bu bind yapılmak zorundaydı
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  //Arrow function
  //Bu şekilde yazınca doğrudan state'e bind etmeyi sağlıyor. 
  //Önemli !
  handleChange = (e) => {
    console.log("First");
    this.setState({searchField : e.target.value });
  }

  //Bunun yerine yukarıdaki arrow functionı kullanıyoruz.
  // handleChange(e){
  //   this.setState({searchField : e.target.value });
  // }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
      <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        ></SearchBox>
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
