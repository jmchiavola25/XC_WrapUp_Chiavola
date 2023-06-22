import React from 'react';
import AddCountry from '../AddCountry.js';
import AddState from '../AddState.js';
import "./Submit.css";
import {Container, Col, Row} from 'react-bootstrap';

export const Submit = (props) => 
{
    return (
        <div className="submitContents">
            <Container className="container">
                <Row>
                    <Col>
                        <div className="newCountry">
                            <AddCountry className="Enter-country" data={props.data} onChange={props.onChangeC}/>
                        </div>
                    </Col>
                    <Col>
                        <div className = "newState">
                            <AddState data={props.data} onChange={props.onChangeS} 
                            onSubmit={props.onSubmit} className="Enter-state"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}