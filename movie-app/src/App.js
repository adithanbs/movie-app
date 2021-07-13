import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';


export default class App extends Component {

  constructor(){
    super()
    this.state = {
      books:[],
      newBooksData:{
        title:'',
        rating:'',
      },
      editBooksData:{
        id:'',
        title:'',
        rating:''
      },
      newBooksModel:false,
      editBooksModel:false
    }
  }
  componentDidMount(){
    this._reFreshBooks()
  }
  _reFreshBooks(){
    axios.get('http://localhost:3004/books')
  .then((response) =>  {
    this.setState({
      books:response.data
    })
    // console.log(response);
  })
  }
 editBook(id,title,rating){
   this.setState({
     editBooksData:{id,title,rating},editBooksModel:! this.state.editBooksModel
   })

 }

 deleteBook(id){
axios.delete('http://localhost:3004/books'+id).then((response)=>{
this._reFreshBooks()
})
 }

  render() {
    return (
      <div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Rating</th>
      <th scope="col">Authors</th>
      {/* <th scope="col">Handle</th> */}
    </tr>
    </thead>
        
  <tbody>
  { this.state.books.map((book)=>(
    <tr key={book.id}>
      <th>{book.title}</th>
      <td>{book.rating}</td>
      <td><Button color="success" onClick = {this.editBook.bind(this,book.id,book.title,book.rating)}>edit</Button></td>
      <td> <Button color="danger" onClick = {this.deleteBook.bind(this,book.id)}>delete</Button></td>


    </tr>  

  ))
  }
  </tbody>
        
        </table>

      </div>
    )
  }
}
