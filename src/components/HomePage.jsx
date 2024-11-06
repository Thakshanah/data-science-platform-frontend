// import React, { useState } from 'react';
// import { Container, Button, Form, Accordion, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { Scatter, Line } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
// import { Graph } from 'react-d3-graph';


// Chart.register(...registerables);

// function HomePage() {
//   const [totalDonations, setTotalDonations] = useState(null);
//   const [agentPositions, setAgentPositions] = useState([]);
//   const [donationHistory, setDonationHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);
//   const [interactions, setInteractions] = useState([]);

//   const handleDownload = () => {
//     window.open('http://127.0.0.1:5000/download_dataset', '_blank');
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setLoading(true);

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/upload_csv', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setTotalDonations(response.data.total_donations);
//       setAgentPositions(response.data.agent_positions);
//       setDonationHistory(response.data.donation_history);
//       setInteractions(response.data.interactions);
//       setLoading(false);
//     } catch (error) {
//       if (error.response && error.response.data) {
//         console.error('Error uploading file:', error.response.data.error);
//       } else {
//         console.error('Error uploading file:', error.message);
//       }
//       setLoading(false);
//     }

    
//   };


//   const handleOpenOrange = async () => {
//     try {
//         const response = await axios.post('http://127.0.0.1:5000/open_orange');
//         if (response.data.status === "success") {
//             alert(response.data.message); // You can show a success message
//         } else {
//             alert("Failed to open Orange: " + response.data.message);
//         }
//     } catch (error) {
//         console.error('Error opening Orange:', error);
//         alert('Error opening Orange: ' + error.message);
//     }
// };

//   const handlePlayClick = async () => {
//     setLoading(true);
//     let history = [];

//     for (let i = 0; i < 10; i++) {
//       await axios.post('http://127.0.0.1:5000/run_model', { steps: 1 })
//         .then(response => {
//           setTotalDonations(response.data.total_donations);
//           setAgentPositions(response.data.agent_positions);
//           history.push(response.data.total_donations);
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//     }

//     setDonationHistory(history);
//     setLoading(false);
//   };

//   const handleOpenColab = () => {
//     window.open('https://colab.research.google.com/', '_blank');
// };

//   const chartData = {
//     datasets: [
//       {
//         label: 'Donors',
//         data: agentPositions.filter(agent => agent.type === 'Donor').map(agent => ({
//           x: agent.x, y: agent.y, r: agent.donation / 10 })),
//         backgroundColor: 'rgba(75, 192, 192, 1)',
//       },
//       {
//         label: 'Charities',
//         data: agentPositions.filter(agent => agent.type === 'Charity').map(agent => ({
//           x: agent.x, y: agent.y, r: 30 })),
//         backgroundColor: 'rgba(255, 99, 132, 1)',
//       }
//     ]
//   };

//   const donationChartData = {
//     labels: [...Array(donationHistory.length).keys()],
//     datasets: [
//       {
//         label: 'Total Donations',
//         data: donationHistory,
//         borderColor: 'rgba(75, 192, 192, 1)',
//         fill: false,
//       },
//     ],
//   };


//   const graphData = {
//     nodes: agentPositions.map(agent => ({
//       id: agent.id.toString(),
//       type: agent.type,
//       donation: agent.donation || 0,
//       color: agent.type === 'Donor' ? 'lightgreen' : 'red',
//     })),
//     links: interactions.map(interaction => ({
//       source: interaction.source.toString(),
//       target: interaction.target.toString(),
//       amount: interaction.amount,
//     })),
//   }; 
  
//   const graphConfig = {
//     nodeHighlightBehavior: true,
//     node: {
//       size: 120,
//       highlightStrokeColor: 'blue',
//       labelProperty: 'type',
//     },
//     link: {
//       highlightColor: 'lightblue',
//       renderLabel: true,
//       labelProperty: 'amount',
//     },
//     directed: true,
//     height: 600,
//     width: 800,
//   };
  


//   const chartOptions = {
//     scales: {
//       x: {
//         min: 0,
//         max: 10,
//         title: {
//           display: true,
//           text: 'X Coordinate'
//         }
//       },
//       y: {
//         min: 0,
//         max: 10,
//         title: {
//           display: true,
//           text: 'Y Coordinate'
//         }
//       }
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//   };

//   const donationChartOptions = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Steps'
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Total Donations'
//         }
//       }
//     }
//   };

//   return (
//     <Container className="mx-auto my-5">
//       <h1 className="text-center">Welcome to My Game!</h1>

//       {/* Instructions Accordion */}
//       <h2 className="text-center mt-5">On-Screen Instructions for Players</h2>
//       <Accordion defaultActiveKey="0" className="mb-4">
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>Objective</Accordion.Header>
//           <Accordion.Body>
//             <strong>Maximize the total donation amount</strong> using the provided dataset and machine learning model while enhancing your decision-making skills!
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="1">
//           <Accordion.Header>Task</Accordion.Header>
//           <Accordion.Body>
//             Predict which donors are most likely to donate and optimize your outreach strategy to maximize the total amount of donations. Select features and create predictions using the Orange platform.
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="2">
//           <Accordion.Header>Steps to Follow</Accordion.Header>
//           <Accordion.Body>
//             <ol>
//               <li><strong>Step 1: Explore the Dataset</strong> - Analyze donor behavior based on age, gender, income, etc.</li>
//               <li><strong>Step 2: Select Features in Orange</strong> - Use Orange to select features like recent donation activity or income group.</li>
//               <li><strong>Step 3: Train a Machine Learning Model</strong> - Train a model in Orange and evaluate it.</li>
//               <li><strong>Step 4: Send Predictions to Simulation</strong> - Simulate donor interactions using the agent-based model (ABM).</li>
//               <li><strong>Step 5: Maximize Donations</strong> - Watch the simulation and aim for the highest donations.</li>
//             </ol>
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="3">
//           <Accordion.Header>Scoring</Accordion.Header>
//           <Accordion.Body>
//             The total donation amount determines your score. The player with the highest donation amount wins!
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

//        {/* Button to download dataset */}
//        <Button variant="secondary" onClick={handleDownload}>
//         Download Dataset
//       </Button>

//       <Button variant="success" size="lg" block onClick={handleOpenOrange}>
//             Open Orange Desktop
//         </Button>

//          {/* Button to open Google Colab */}
//          <Button variant="primary" size="lg" block onClick={handleOpenColab}>
//             Open Google Colab
//         </Button>

        

//       <p className="mb-4">Press the "Play" button to run the model and see the visualizations.</p>

//       <Button variant="primary" size="lg" block onClick={handlePlayClick} disabled={loading}>
//         {loading ? 'Loading...' : 'Play'}
//       </Button>

//       {/* Upload Donor Data Section */}
//       <h2 className="text-center mt-5">Upload Donor Data</h2>
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Label>Select a CSV File</Form.Label>
//         <Form.Control type="file" onChange={handleFileChange} />
//       </Form.Group>
//       <Button variant="primary" size="lg" block onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Upload CSV and Run Simulation'}
//       </Button>

//       {/* Display Total Donations */}
//       {totalDonations !== null && (
//         <div className="mt-4">
//           <h3>Total Donations: {totalDonations}</h3>
//         </div>
//       )}

//       {/* Display Agent Positions (Scatter Plot) */}
//       {agentPositions.length > 0 && (
//         <div className="mt-4">
//           <h3>Agent Positions:</h3>
//           <Scatter data={chartData} options={chartOptions} />
//         </div>
//       )}

//       {/* Display Donation History (Line Chart) */}
//       {donationHistory.length > 0 && (
//         <div className="mt-4">
//           <h3>Donation History:</h3>
//           <Line data={donationChartData} options={donationChartOptions} />
//         </div>
//       )}

// {interactions.length > 0 && (
//   <div className="mt-4">
//     <h3>Donor-Charity Network:</h3>
//     <Graph
//       id="donor-charity-graph"
//       data={graphData}
//       config={graphConfig}
//     />
//   </div>
// )}

      
//     </Container>
//   );
// }

// export default HomePage;


import React, { useState } from 'react';
import { Container, Button, Form, Accordion, Card } from 'react-bootstrap';
import axios from 'axios';
import { Scatter, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Graph } from 'react-d3-graph';


Chart.register(...registerables);

function HomePage( { user }) {
  const [totalDonations, setTotalDonations] = useState(null);
  const [agentPositions, setAgentPositions] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [interactions, setInteractions] = useState([]);

  const handleDownload = () => {
    window.open('http://127.0.0.1:5000/download_dataset', '_blank');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload_csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const totalDonations = response.data.total_donations;

      setTotalDonations(response.data.total_donations);
      setAgentPositions(response.data.agent_positions);
      setDonationHistory(response.data.donation_history);
      setInteractions(response.data.interactions);

       // Submit the total donations to the backend
       await axios.post('http://127.0.0.1:5000/submit_donation', {
        username: user.username,  // Ensure you have the user state passed down
        total_donations: totalDonations
    });

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error uploading file:', error.response.data.error);
      } else {
        console.error('Error uploading file:', error.message);
      }
      setLoading(false);
    }

    
  };


  const handleOpenOrange = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/open_orange');
        if (response.data.status === "success") {
            alert(response.data.message); // You can show a success message
        } else {
            alert("Failed to open Orange: " + response.data.message);
        }
    } catch (error) {
        console.error('Error opening Orange:', error);
        alert('Error opening Orange: ' + error.message);
    }
};

  const handlePlayClick = async () => {
    setLoading(true);
    let history = [];

    for (let i = 0; i < 10; i++) {
      await axios.post('http://127.0.0.1:5000/run_model', { steps: 1 })
        .then(response => {
          setTotalDonations(response.data.total_donations);
          setAgentPositions(response.data.agent_positions);
          history.push(response.data.total_donations);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    setDonationHistory(history);
    setLoading(false);
  };

  const handleOpenColab = () => {
    window.open('https://colab.research.google.com/', '_blank');
};

  const chartData = {
    datasets: [
      {
        label: 'Donors',
        data: agentPositions.filter(agent => agent.type === 'Donor').map(agent => ({
          x: agent.x, y: agent.y, r: agent.donation / 10 })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Charities',
        data: agentPositions.filter(agent => agent.type === 'Charity').map(agent => ({
          x: agent.x, y: agent.y, r: 30 })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      }
    ]
  };

  const donationChartData = {
    labels: [...Array(donationHistory.length).keys()],
    datasets: [
      {
        label: 'Total Donations',
        data: donationHistory,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };


  const graphData = {
    nodes: agentPositions.map(agent => ({
      id: agent.id.toString(),
      type: agent.type,
      donation: agent.donation || 0,
      color: agent.type === 'Donor' ? 'lightgreen' : 'red',
    })),
    links: interactions.map(interaction => ({
      source: interaction.source.toString(),
      target: interaction.target.toString(),
      amount: interaction.amount,
    })),
  }; 
  
  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      size: 120,
      highlightStrokeColor: 'blue',
      labelProperty: 'type',
    },
    link: {
      highlightColor: 'lightblue',
      renderLabel: true,
      labelProperty: 'amount',
    },
    directed: true,
    height: 600,
    width: 800,
  };
  


  const chartOptions = {
    scales: {
      x: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'X Coordinate'
        }
      },
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Y Coordinate'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const donationChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Steps'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Donations'
        }
      }
    }
  };

  return (
    <Container className="mx-auto my-5">
      <h1 className="text-center">Welcome to My Game!</h1>

      {/* Instructions Accordion */}
      <h2 className="text-center mt-5">On-Screen Instructions for Players</h2>
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Objective</Accordion.Header>
          <Accordion.Body>
            <strong>Maximize the total donation amount</strong> using the provided dataset and machine learning model while enhancing your decision-making skills!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Task</Accordion.Header>
          <Accordion.Body>
            Predict which donors are most likely to donate and optimize your outreach strategy to maximize the total amount of donations. Select features and create predictions using the Orange platform.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Steps to Follow</Accordion.Header>
          <Accordion.Body>
            <ol>
              <li><strong>Step 1: Explore the Dataset</strong> - Analyze donor behavior based on age, gender, income, etc.</li>
              <li><strong>Step 2: Select Features in Orange</strong> - Use Orange to select features like recent donation activity or income group.</li>
              <li><strong>Step 3: Train a Machine Learning Model</strong> - Train a model in Orange and evaluate it.</li>
              <li><strong>Step 4: Send Predictions to Simulation</strong> - Simulate donor interactions using the agent-based model (ABM).</li>
              <li><strong>Step 5: Maximize Donations</strong> - Watch the simulation and aim for the highest donations.</li>
            </ol>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Scoring</Accordion.Header>
          <Accordion.Body>
            The total donation amount determines your score. The player with the highest donation amount wins!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

       {/* Button to download dataset */}
       <Button variant="secondary" onClick={handleDownload}>
        Download Dataset
      </Button>

      <Button variant="success" size="lg" block onClick={handleOpenOrange}>
            Open Orange Desktop
        </Button>

         {/* Button to open Google Colab */}
         <Button variant="primary" size="lg" block onClick={handleOpenColab}>
            Open Google Colab
        </Button>

        

      <p className="mb-4">Press the "Play" button to run the model and see the visualizations.</p>

      <Button variant="primary" size="lg" block onClick={handlePlayClick} disabled={loading}>
        {loading ? 'Loading...' : 'Play'}
      </Button>

      {/* Upload Donor Data Section */}
      <h2 className="text-center mt-5">Upload Donor Data</h2>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Select a CSV File</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" size="lg" block onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload CSV and Run Simulation'}
      </Button>

      {/* Display Total Donations */}
      {totalDonations !== null && (
        <div className="mt-4">
          <h3>Total Donations: {totalDonations}</h3>
        </div>
      )}

      {/* Display Agent Positions (Scatter Plot) */}
      {agentPositions.length > 0 && (
        <div className="mt-4">
          <h3>Agent Positions:</h3>
          <Scatter data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Display Donation History (Line Chart) */}
      {donationHistory.length > 0 && (
        <div className="mt-4">
          <h3>Donation History:</h3>
          <Line data={donationChartData} options={donationChartOptions} />
        </div>
      )}

{interactions.length > 0 && (
  <div className="mt-4">
    <h3>Donor-Charity Network:</h3>
    <Graph
      id="donor-charity-graph"
      data={graphData}
      config={graphConfig}
    />
  </div>
)}

      
    </Container>
  );
}

export default HomePage;
