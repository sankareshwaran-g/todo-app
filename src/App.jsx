import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap-icons/font/bootstrap-icons.css"; 
import './App.css'
import NavBar from './components/NavBar'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Container>
      <NavBar/>
      <Row className="justify-content-md-center">
        <Col lg="6">
        <AddTask/>
        <TaskList/>
        <UpdateTask/>
        
      </Col>
      </Row>
    </Container>
  )
}

export default App
