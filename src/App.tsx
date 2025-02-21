import DriversListContent from "./components/DriversListContent.tsx";
import styled from "styled-components";


// Styled component for the main container of the app
const ParentDiv=styled.div `
    width: 80%;
    margin: auto;
    border: 5px black solid;   
    background-color: #E22420;
`;

// Main App component
export default function App() {

  return (
      // Wrap the entire app content in the styled ParentDiV
      <ParentDiv>
          {/* Render the DriverListContent component*/}
          <DriversListContent />
      </ParentDiv>
  );
}

