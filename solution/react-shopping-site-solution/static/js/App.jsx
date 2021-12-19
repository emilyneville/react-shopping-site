function App() {
  const [melons, setMelons] = React.useState({});
  const [shoppingCart, setShoppingCart] = React.useState({});
  // loading is part of the further study
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/melons')
      .then(response => response.json())
      .then(melonData => {
        setMelons(melonData);
        setLoading(false);
      });
  }, []);

  // the following useEffect is part of the further study
  React.useEffect(() => {
    const previousCart = localStorage.getItem('shoppingCart');
    if (previousCart) {
      setShoppingCart(JSON.parse(previousCart));
    }
  }, []);

  // the following useEffect is also part of the further study
  React.useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  function addMelonToCart(melonCode) {
    setShoppingCart(currentShoppingCart => {
      // this makes a copy of the shopping cart since you should
      // never modify the state value directly
      const newShoppingCart = {...currentShoppingCart};

      if (newShoppingCart[melonCode]) {
        newShoppingCart[melonCode] += 1;
      } else {
        newShoppingCart[melonCode] = 1;
      }

      return newShoppingCart;
    });
  }

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/img/watermelon.png" brand="Ubermelon" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/shop">
          {loading ? (
            <Loading />
          ) : (
            <AllMelonsPage melons={melons} addMelonToCart={addMelonToCart} />
          )}
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/cart">
          {loading ? <Loading /> : <ShoppingCartPage cart={shoppingCart} melons={melons} />}
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
w