import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import '../../index.css';
const Footer = () => {
  return (
    <Navbar
      style={{ border: '2px solid' }}
      className="w-100 mt-auto navbar navbar-light bg-light footer border-bottom-0 border-left-0 border-right-0"
    >
      <div className="mx-5 main-footer" style={{ width: '100%' }}>
        <Row>
          <Col xs="12">
            <h6
              className="text-uppercase font-weight-bold"
              style={{ textAlign: 'center' }}
            >
              Who We Are
            </h6>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" className="py-2 ">
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
          </Col>
          <Col xs="12" md="6" className="py-2 ">
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
