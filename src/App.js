import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const pizzaSizes = ['Small', 'Medium', 'Large', 'Extra Large', 'Monster'];
  const vegPizzas = ['Paneer', 'Tomato and Onion', 'Barbecue Paneer', 'Extra Cheese', 'Double Cheese', 'Capsicum'];
  const nonVegPizzas = ['Chicken', 'Barbecue Chicken', 'Chicken Sausage', 'Pepperoni'];

  const pizzaPrices = {
    Small: 100,
    Medium: 150,
    Large: 250,
    'Extra Large': 350,
    Monster: 500,
  };

  const getImagePath = (pizza, size, width, height) => {
    // Provide external image URLs for specific pizzas and sizes
    const externalImageUrls = {
      'Barbecue Chicken_Small': 'https://imgs.search.brave.com/qtf-Yl-Du4PlA8cq6l7H9UVPfY9_J8qyfwtZd8ndqFk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YnVkZ2V0Ynl0ZXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzA2L0Jha2Vk/LUJCUS1DaGlja2Vu/LVBpenphLmpwZw',
      'Paneer_Small': 'https://imgs.search.brave.com/Tko0zObfVi6IETq9JdFeskKquWH0tAASujP2kOPFgwA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg0/OTQ2NzAxL3Bob3Rv/L3BpenphLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz05N3Jj/MFZJaS1zM21uNHhl/NHhEeTlTLVhKX09o/Ym45MlhhRU1haUlE/X2VZPQ',
      'Chicken Sausage_Small': 'https://www.cupofzest.com/wp-content/uploads/2022/06/Chicken-Sausage-Pizza-with-Onions-and-Peppers-Thumbnail.jpg',
      'Chicken_Small':'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/28/1/FNM_040112-Copy-That-002_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1382541346030.jpeg',
      'Pepperoni_Small':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEGwrjoiqc3nlrexI4eBRV3l7Z8snbl4Rfw&usqp=CAU', 
      'Tomato and Onion_Small':'https://kwalitybakery.in/wp-content/uploads/2021/11/onion-tomato-pizza.jpeg',
      'Barbecue Paneer_Small':'https://carameltintedlife.com/wp-content/uploads/2021/09/paneer-pizza-recipe-1-2.jpg',
      'Extra Cheese_Small':'https://www.gortsa.com/cache/large/product/128824/BFrf3mJjwz6ruqzp41L57wJvaWyWeUIN38Xlycgt.jpeg',
      'Double Cheese_Small':'https://i.ytimg.com/vi/uDaObMuKMlI/maxresdefault.jpg',
      'Capsicum_Small':'https://i.pinimg.com/736x/0d/cf/1b/0dcf1b12b4e76bfb383aff1683f1cdf6.jpg'
    };

    // Use external image URL if available, otherwise use local image path
    const key = `${pizza}_${size}`;
    const imageUrl = externalImageUrls[key] || `${process.env.PUBLIC_URL}/images/${pizza.toLowerCase().replace(/ /g, '_')}_${size.toLowerCase()}.jpg`;

    // Append width and height parameters if provided
    return width && height ? `${imageUrl}?w=${width}&h=${height}` : imageUrl;
  };

  const addToCart = (item, size) => {
    const price = pizzaPrices[size];
    setCart([...cart, { item, size, price }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container mt-4">
      <header className="text-center mb-4">
        <h1>Metro Pizza</h1>
        <h6> italian feast </h6>
        <div className="cart-header">
          <h5>Cart</h5>
          <ul className="list-group list-group-flush">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={getImagePath(item.item, item.size, 100, 75)} alt={item.item} className="pizza-image" width="100" height="75" />
                {item.size} {item.item} - {item.price} Rs{' '}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <strong>Total:</strong> {calculateTotalPrice()} Rs
            </li>
            <li className="list-group-item">
              <button className="btn btn-success btn-block" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="btn btn-primary btn-block mt-2">
                Buy
              </button>
            </li>
          </ul>
        </div>
      </header>

      <section>
        <h2>Veg Pizzas</h2>
        <div className="row">
          {vegPizzas.map((pizza, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={getImagePath(pizza, 'Small', 1200, 750)} alt={pizza} className="card-img-top" width="200" height="150" />
                <div className="card-body">
                  <h3 className="card-title">{pizza}</h3>
                  {pizzaSizes.map((size, sizeIndex) => (
                    <button
                      key={sizeIndex}
                      className="btn btn-primary mr-2 mb-2"
                      onClick={() => addToCart(pizza, size)}
                    >
                      {size} - {pizzaPrices[size]} Rs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Non-Veg Pizzas</h2>
        <div className="row">
          {nonVegPizzas.map((pizza, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={getImagePath(pizza, 'Small', 1200, 750)} alt={pizza} className="card-img-top" width="200" height="150" />
                <div className="card-body">
                  <h3 className="card-title">{pizza}</h3>
                  {pizzaSizes.map((size, sizeIndex) => (
                    <button
                      key={sizeIndex}
                      className="btn btn-primary mr-2 mb-2"
                      onClick={() => addToCart(pizza, size)}
                    >
                      {size} - {pizzaPrices[size]} Rs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
