const Pizza = () => {
    return React.createElement("div", {}, [
      React.createElement("h1", {}, "The Pepperoni Pizza"),
      React.createElement("p", {}, "Mozzarella Cheese, Pepperoni"),
    ]);
  };

  const App = () => {
    return React.createElement("div", {}, [
      React.createElement("h1", {}, "Pixel Perfect Pizzas"),
      React.createElement(Pizza),
      React.createElement(Pizza),
      React.createElement(Pizza),
    ]);
  };

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));