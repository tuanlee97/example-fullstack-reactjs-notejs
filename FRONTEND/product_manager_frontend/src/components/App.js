import React, { Component } from 'react';
import HeadTitle from './HeadTitle';
import Product from './Product';

import axios from 'axios';

const getProductData = () => axios.get('/getData')
                                  .then((response) =>response.data )
                                
const addProduct = (product_name,product_price,image) => 
    (axios.post('/add',{product_name,product_price,image})
                .then((resp)=>resp.data));


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : null ,
      product_name:'',
            product_price:'',
            image:'',
    }
    
  }
  
  componentWillMount() {
    if(this.state.data === null) {
      getProductData().then((res)=>{
        this.setState({
          data:res
        }); 
      })
       
    }
    
  }
  printData = () => {
    if(this.state.data !== null)
     return this.state.data.map((value,key) =>
        (<Product
        key = {key}
         id = {value.id}
         product_name = {value.product_name}
         product_price = {value.product_price}
         image = {value.image}
         />)
      )
  }

  isChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    
    
    this.setState({
        [name] : value
    });
}
handleClick = ()=>{
    //  console.log(JSON.stringify(this.state));
    var dataTemp = [];
    var item = {};
    item.product_name = this.state.product_name ;
    item.product_price =this.state.product_price ;
    item.image = this.state.image;
        dataTemp= this.state.data;
      if(item.product_name!==''){
        dataTemp.push(item);
        this.setState({
          data:dataTemp
        });
      }
        
    addProduct(this.state.product_name,this.state.product_price,this.state.image)
                .then((respone)=>console.log(respone)
                )
}                             

  
  render() {
   
      
    return (
      <div>
        <HeadTitle/>
       
        <div className="container-fluid">
          <div className="row">
          <div className="col">
          <div className="row">
            {this.printData()}
            </div>
            </div>
            <div className="col-2 border ">
            <div className="row ">
              
                <div className="mx-auto mt-3" >
                  <form action="add" method="post"><h3>THÊM SẢN PHẨM</h3><hr/>
                    <div className="form-group">
                      <label htmlFor="product_name">Tên sản phẩm</label>
                      <input onChange = {(event)=> this.isChange(event)} type="text" className="form-control" name="product_name" id="product_name" aria-describedby="name_text" />
                      <small id="name_text" className="form-text text-muted">Nhập tên sản phẩm</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_price">Giá</label>
                      <input  onChange = {(event)=> this.isChange(event)} type="text" className="form-control" name="product_price" id="product_price" aria-describedby="price_text"  />
                      <small id="price_text" className="form-text text-muted">Nhập giá</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Link ảnh :</label>
                      <input  onChange = {(event)=> this.isChange(event)} type="text" className="form-control" name="image" id="image" aria-describedby="image_text" />
                      <small id="image_text" className="form-text text-muted">Nhập link ảnh</small>
                    </div>
                    <button type="reset" onClick = { ()=> this.handleClick()} className="btn btn-block btn-info"> Lưu </button>
                  </form>
                </div>
             
            </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;