import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';
import TopFiveActors from '/src/components/TopFiveActors';
import TopFiveMovies from '/src/components/TopFiveMovies';

export default function Home() {

  return (
    <>
      <Container fluid>
        <TopFiveMovies />
        <TopFiveActors />
      </Container>
    </>
  );
};
