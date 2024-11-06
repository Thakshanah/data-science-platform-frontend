// import React, { useState } from 'react';
// import { Container, Table, Form, Col, Row, Button } from 'react-bootstrap';

// const Leaderboard = () => {
//   const [scores, setScores] = useState([
//     { name: 'Player 1', score: 1000 },
//     { name: 'Player 2', score: 800 },
//     { name: 'Player 3', score: 600 },
//   ]);
//   const [newScore, setNewScore] = useState({ name: '', score: 0 });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setScores([...scores, newScore]);
//     setNewScore({ name: '', score: 0 });
//   }
//   const handleChange = (event) => {
//     setNewScore({
//       ...newScore,
//       [event.target.name]: event.target.value
//     });
//   }

//   return (
//       <div >
//           <Container className="mx-auto my-5">
//           <h2 className="text-center mt-4">Leaderboard</h2>

//       <Table striped bordered hover className="p-100">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {scores.map((player, index) => (
//             <tr key={index}>
//               <td>{player.name}</td>
//               <td>{player.score}</td>
//             </tr>
//           ))}
//         </tbody>
//           </Table>
    
//           </Container>
//         <Container  >  

//         <Form>
//             <Row>
//                 <Col md={6}>
//                     <Form.Group controlId="formGridName">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control type="text" placeholder="Enter your name" />
//                     </Form.Group>
//                 </Col>

//                 <Col md={6}>
//                     <Form.Group controlId="formGridScore">
//                         <Form.Label>Score</Form.Label>
//                         <Form.Control type="number" placeholder="Enter your score" />
//                     </Form.Group>
//                 </Col>
//             </Row>

//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//         </Form>
   

//       {/* <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={newScore.name}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Score:
//           <input
//             type="number"
//             name="score"
//             value={newScore.score}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Add Score</button>
//       </form> */}
//       </Container> 
//     </div>
//   );
// };


// export default Leaderboard;

import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/leaderboard');
                const formattedScores = response.data.map(item => ({
                    name: item[0],  // Username
                    total: item[1]  // Total donations
                }));
                setScores(formattedScores);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchScores();
    }, []);

    return (
        <Container className="mx-auto my-5">
            <h2 className="text-center mt-4">Leaderboard</h2>
            <Table striped bordered hover className="p-100">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Donations</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((player, index) => (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Leaderboard;
