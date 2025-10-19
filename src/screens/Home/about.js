import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';

// 🎨 Theme Colors
const MainContainer = styled.div`
    min-height: 100vh;
    background-color: #121212; /* Deep Black background */
    color: #E0E0E0; /* Light text color */
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const ContentWrapper = styled.div`
    max-width: 800px;
    margin-top: 2rem;
    padding: 2rem;
    background-color: #1A1A1A; /* Slightly lighter container for contrast */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(255, 127, 0, 0.5); /* Subtle orange glow */
`;

const Title = styled.h1`
    font-size: 3rem;
    color: #FF7F00; /* Vibrant Orange title */
    margin-bottom: 0.5rem;
    
    span {
        font-weight: 700;
    }
`;

const Subtitle = styled.h3`
    color: #E0E0E0;
    font-weight: 300;
    margin-bottom: 2rem;
    border-bottom: 1px solid #FF7F00;
    padding-bottom: 0.5rem;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: 1px solid #FF7F00;
    color: #FF7F00;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 1.5rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #FF7F00;
        color: #121212;
    }
`;


const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <BackButton onClick={() => navigate('/')}>
                <IoChevronBackOutline /> Back to Home
            </BackButton>
            <ContentWrapper>
                <Title>
                    About <span>DevStream</span>
                </Title>
                <Subtitle>Code. Stream. Create.</Subtitle>
                
                <p>
                    DevStream is a modern, integrated development environment designed for developers who value speed, simplicity, and collaboration. It allows you to create and manage code playgrounds across various languages—from competitive programming to rapid prototyping.
                </p>
                
                <h2>Key Features</h2>
                <ul>
                    <li>**Instant Playgrounds:** Quickly launch coding environments for C++, JavaScript, Python, and Java.</li>
                    <li>**Persistent Storage:** Save your code in organized folders that persist across sessions.</li>
                    <li>**Code Sharing:** Instantly generate shareable links to collaborate or showcase your work.</li>
                    <li>**Themed Interface:** A sleek, dark interface optimized for long coding sessions.</li>
                </ul>
                
                <p style={{ marginTop: '2rem', color: '#FF7F00' }}>
                    **Developer Note:** DevStream was built using React and styled-components, demonstrating modern UI development principles.
                </p>
            </ContentWrapper>
        </MainContainer>
    );
};

export default AboutPage;