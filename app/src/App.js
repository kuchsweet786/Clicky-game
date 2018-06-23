

//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import wonder from "./Wonders.json";
import "./App.css";


class App extends Component {
    state = {
        wonder,
        onclickWonder: [],
        score: 0
    };

//when you click on a card ... the wonder is taken out of the array
    imageClick = event => {
        const currentWonder = event.target.alt;
        const onclick =
            this.state.onclickWonder.indexOf(currentWonder) > -1;

//if you click on a wonder that has already been selected, the game is reset and cards reordered
        if (wonder.onclick) {
            this.setState({
                wonder: this.state.wonder.sort(function(a, b) {
                    return 0.5 - Math.random();
                }),
                onclickWonder: [],
                score: 0
            });
            alert("You lose. Play again?");


        } else {
            this.setState(
                {
                    wonder: this.state.wonder.sort(function(a, b) {
                        return 0.5 - Math.random();
                    }),
                    onclickWonder: this.state.onclickWonder.concat(
                        currentWonder
                    ),
                    score: this.state.score + 1
                },
//if you get all 7 wonder corrent you get a congrats message and the game resets
                () => {
                    if (this.state.score === 12) {
                        alert("Yay! You Win!");
                        this.setState({
                            wonder: this.state.wonder.sort(function(a, b) {
                                return 0.5 - Math.random();
                            }),
                            onclickWonder: [],
                            score: 0
                        });
                    }
                }
            );
        }
    };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer
    render() {
        return (
            <div>
                <Navbar
                    score={this.state.score}
                />
                <Jumbotron />
                <div className="wrapper">
                    {this.state.wonder.map(wonder => (
                        <FriendCard
                            imageClick={this.imageClick}
                            id={wonder.id}
                            key={wonder.id}
                            image={wonder.image}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        );
    }
}
export default App;