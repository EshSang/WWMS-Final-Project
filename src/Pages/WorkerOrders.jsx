import React from 'react'
import { Container, Row, Col, Card, Button, Form, InputGroup, Navbar } from 'react-bootstrap';
import { GeoAlt, CalendarDate, PersonCircle, FileEarmarkPlus } from 'react-bootstrap-icons';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopNavbar from '../Components/TopNavbar';
import Footer from '../Components/Footer';

export default function WorkerOrders() {
  return (
    <div>
      {/* Navbar */}
            <TopNavbar/>
            <Footer/>
    </div>
  )
}
