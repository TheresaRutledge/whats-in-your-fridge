import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import '../../index.css';
const Footer = () => {
  return (
    <Navbar
      style={{ border: '2px solid' }}
      className="w-100 mt-auto navbar navbar-light bg-light fixed-bottom footer border-bottom-0 border-left-0 border-right-0"
    >
      <div className="mx-5 main-footer" style={{ width: '100%' }}>
        <Row>
          <Col xs="12" md="4" className="py-4 ">
            <h6
              class="text-uppercase font-weight-bold"
              style={{ textAlign: 'center' }}
            >
              Location
            </h6>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              97536 Stewart Estates
            </p>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              Grimesport, IA 80749-6884
            </p>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              United States of America
            </p>
          </Col>
          <Col xs="12" md="4" className="py-4 ">
            <h6
              class="text-uppercase font-weight-bold"
              style={{ textAlign: 'center' }}
            >
              Who We Are
            </h6>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              <a
                href="https://www.linkedin.com/in/theresarutledge/"
                target="_blank"
                className="text-body"
              >
                Alex Walker
              </a>
            </p>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              <a
                href="https://www.linkedin.com/in/theresarutledge/"
                target="_blank"
                className="text-body"
              >
                Hani Ghaderi
              </a>
            </p>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              <a
                href="https://www.linkedin.com/in/theresarutledge/"
                target="_blank"
                className="text-body"
              >
                Theresa Rutledge
              </a>
            </p>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              <a
                href="https://www.linkedin.com/in/ruohan-wang-78990590/"
                target="_blank"
                className="text-body"
              >
                Rouhan Wang
              </a>
            </p>
          </Col>
          <Col xs="12" md="4" className="py-4 ">
            <h6
              class="text-uppercase font-weight-bold"
              style={{ textAlign: 'center' }}
            >
              Contact Us!
            </h6>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              <a
                href="mailto: WhatIsInYourFridge@gmail.com"
                className="text-body"
              >
                WhatIsInYourFridge@gmail.com
              </a>
            </p>
            <p className="pb-0 mb-1" style={{ textAlign: 'center' }}>
              <a href="tel:" className="text-body">
                +1 (800) 567-8901
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <p style={{ textAlign: 'center' }}>
              © 2020 Copyright: What's in Your fridge Inc. All rights (not yet)
              reserved.
            </p>
          </Col>
        </Row>
      </div>
    </Navbar>
  );
};

export default Footer;
