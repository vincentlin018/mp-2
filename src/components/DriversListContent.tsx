// Imports for necessary for this file
import { useState } from 'react';
import { useEffect } from 'react';

import { Driver } from "../interfaces/Driver.ts";
import { styled } from "styled-components";

// Styled component for individual driver previews
const DriverPreviewDiv = styled.div`
    text-align: center;
    margin: 3rem;
    padding: 1rem;
    width: 20rem;
    background-color: white;
    max-width: 40%;
    border: 3px black groove;
    color: #E22420
`;

// Styled component for the container of all driver previews
const AllDriversDiv = styled.div `
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
`;

// Styled component for the input container
const InputDiv = styled.div `
    font-size: calc(2px + 1vw);
    text-align: center;
    margin: 1rem;
    label {
        color: white;
        margin: 1rem;
    }
`;

// Styled component for the main Header
const StyledHeader = styled.h1 `
    text-align: center;
    color: white;
`;

// Styled component for the introductory paragraph element
const StyledP = styled.p`
    color: white;
    text-align: center;
    margin: auto;
    
    // Styling for the unordered list within the paragraph
    ul {
        display: inline-block;
        text-align: left;
        padding-left: 0;
    }
    
    // Styling for the list items. Places the bullets of the list next to the text rather than on the edge of the parent area.
    li {
        list-style-position: inside;
    }
`;


// Styled component for the embedded Wikipedia Pages
// Removes the underline of the hyperlink but upon hover, it displays to indicate that it leads to an external page.
const StyledLink = styled.a `
    text-decoration: none;
    color: inherit;
    &:hover {text-decoration: underline}
`;

// Component to render individual driver preview
const DriverPreview = ({driver}: {driver: Driver}) => {
    return (
        <DriverPreviewDiv>
            <h2>{driver.givenName + " " + driver.familyName}</h2>
            <h3>{driver.code}</h3>
            <h3>{driver.permanentNumber}</h3>
            <p>
                <StyledLink
                    href={driver.url} target="_blank">
                        Driver Wikipedia Page
                </StyledLink>
            </p>
        </DriverPreviewDiv>
    )
}

// Main component for the Drivers List
export default function DriversListContent() {

    // State hooks for the selected year and list of drivers that can change.
    const [year, setYear] = useState(2024);
    const [drivers, setDrivers] = useState<Driver[]>([]);

    // useEffect hook to fetch drivers data when the year changes
    useEffect(() => {
        async function getDrivers(): Promise<void> {
            // Fetching Data from the API
            const rawData = await fetch (`https://api.jolpi.ca/ergast/f1/${year}/drivers/?format=json`);
            // Parsing the JSON response
            const {MRData: {DriverTable: {Drivers}}} : {MRData: {DriverTable: {Drivers: Driver[]}}} = await rawData.json();
            // Updating the drivers state
            setDrivers(Drivers);
        }
        // Calls the getDrivers function
        getDrivers()
            .then(()=>console.log("Content fetched successfully"))
            .catch((e)=>console.log("There was an error that happened: " + e));
    }, [year]); // Dependency array with year, so useEffect runs when the year changes

    return (
        <>
            {/*h1 header for the Title of the Website*/}
            <StyledHeader>
                Formula 1 Drivers By Season
            </StyledHeader>
            <StyledP>
                {/* Introductory text and list of driver information to be displayed*/}
                Welcome to my Formula 1 Drivers By Season webpage.
                Here you find information about a Drivers:
                <br></br>
                <ul>
                    <li>Name</li>
                    <li>Driver Code (if applicable, older drivers do not have a code)</li>
                    <li>Driver Number (if applicable, older drivers do not have a number on file)</li>
                    <li>External Link to Wikipedia Page</li>
                </ul>
                <br></br>
                You can toggle the box below to go up one year or go down a year.
                But if you go before 1950 or 2025 the page will give you an error as F1 did not or has not existed during those years.
            </StyledP>
            <InputDiv>
                <label>
                    F1 Season / Year :
                    <input
                        id="seasonYear"
                        type="number"
                        placeholder="Season Year"
                        value={year}
                        onChange={(e) => {
                            const inputYear = Number(e.target.value);
                            setYear(
                                inputYear >= 1950 && inputYear <= 2025
                                    ? inputYear
                                    : year
                            );
                            if (inputYear < 1950 || inputYear > 2025) {
                                alert("Invalid year! Please enter a year between 1950 and 2025.");
                            }
                        }}
                    />
                </label>
            </InputDiv>
            <AllDriversDiv>
                {
                    // Map through drivers array and render a DriverPreview for each driver from the JSON file
                    drivers.map(driver => (
                        <DriverPreview key={driver.driverId} driver={driver} />
                    ))
                }
            </AllDriversDiv>
        </>
    )
}