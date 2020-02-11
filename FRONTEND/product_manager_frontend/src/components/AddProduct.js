import React, { Component } from 'react';
import axios from 'axios';



class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name:'',
            product_price:'',
            image:'',
        }
    }
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        });
    }
    handleClick = ()=>{
      var dataTemp = [];
      var item = {};
          item.product_name = this.state.product_name ,
          item.product_price =this.state.product_price ,
          item.image = this.state.image
          dataTemp= this.state;
        if(item.product_name!=='')
        
        addProduct(this.state.product_name,this.state.product_price,this.state.image)
                    .then((respone)=>console.log(respone)
                    )
    }
    render() {
        return (
            <div className="container mb-5">
      </div>
          
        );
    }
}

export default AddProduct;